import { useState } from "react";
import { toast } from "react-toastify";
import { usePopupDispatch } from "../../contexts/PopupContext";
import { sortRows } from "../../utils/interactivity/sortRows";
import { exportBookmarks } from "../../utils/io/exportBookmarks";
import { BookmarkImportAlert } from "../../utils/io/importBookmarks";
import { printCsv } from "../../utils/io/printCsv";
import { recognizeDuplicates } from "../../utils/traversalFunctions/getCopies";
import { removeTracingLinksFromChildren } from "../../utils/traversalFunctions/removeTracingLinks";

type TwoArrs = [
  chrome.bookmarks.BookmarkTreeNode[],
  chrome.bookmarks.BookmarkTreeNode[],
];

function partition(
  array: chrome.bookmarks.BookmarkTreeNode[],
  isValid: (b: chrome.bookmarks.BookmarkTreeNode) => boolean | Promise<boolean>,
): TwoArrs {
  const starter: TwoArrs = [[], []];
  array.forEach((e) => {
    isValid(e) ? starter[0].push(e) : starter[1].push(e);
  });
  return starter;
  // return array.reduce(
  //   ([pass, fail]: TwoArrs, elem: chrome.bookmarks.BookmarkTreeNode) => {
  //     return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
  //   },
  //   starter,
  // );
  // https://stackoverflow.com/questions/11731072/dividing-an-array-by-filter-function
  // that didn't work
}

const linkClass =
  "block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white";

type OpenMenuStates = "IMPORT" | "EXPORT" | "NEW_FOLDER" | "NEW_BOOKMARK";

export function CornerMenu(
  props: {
    importCallback: Function;
    rows: chrome.bookmarks.BookmarkTreeNode[];
    dataCallback: (bookmarks: chrome.bookmarks.BookmarkTreeNode[]) => void;
    searchResultsMode?: boolean;
  },
): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  const [openVariant, setOpenVariant] = useState<OpenMenuStates>(
    "NEW_BOOKMARK",
  );
  const dispatch = usePopupDispatch();

  const removeHandler = async (_v: any) => {
    const rows = props.rows;
    const [folders, bkmrks] = partition(rows, (b) => b.url === undefined);
    const [empty, nonEmptyFolders] = partition(
      folders,
      async (b) => {
        const children = await chrome.bookmarks.getChildren(b.id);
        return children.length === 0;
      },
    );
    empty.forEach((b) => {
      chrome.bookmarks.remove(b.id);
    });
    props.dataCallback([...nonEmptyFolders, ...bkmrks]);
    window.alert(`filtered out ${empty.length} empty folders`);
    console.debug("diff: ", empty);
  };

  return (
    <div
      className={"conrner-menu-button z-40 relative"}
      onBlur={() => {
        // setTimeout(() => {
        //   dispatch({
        //     direction: "close",
        //     type: "none",
        //   });
        // }, 2500);
      }}
    >
      <button
        onClick={() => setShowMenu(!showMenu)}
        id="dropdownDefaultButton"
        className="text-white hover:bg-slate-400 focus:outline-none rounded-lg text-3xl p-4 text-center border-red-600"
        type="button"
        onBlur={() => {
          // todo that is problematic
          // setTimeout(
          //   () => {
          //     setShowMenu(false);
          //   },
          //   1000,
          // );
        }}
      >
        &#8942;
      </button>
      <div
        id="dropdown"
        onBlur={() => setShowMenu(false)}
        className={`absolute right-1/3 top-1/10 z-10 ${
          !showMenu && "hidden"
        } bg-white divide-y divide-gray-100 rounded-md shadow w-44 dark:bg-gray-700`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 justify-start">
          <li>
            <button
              className={linkClass}
              onClick={(v) => {
                console.log("clicked to sort by name");
                sortRows(
                  props.rows,
                  {
                    key: "title",
                    reverse: false,
                  },
                );
              }}
            >
              <span className="italic text-l ">A-Z</span> Sort by name
            </button>
          </li>
          <li>
            <button
              className={linkClass}
              onClick={(v) => {
                console.log("clicked to sort by date");
                sortRows(props.rows, {
                  key: "date",
                  reverse: false,
                });
              }}
            >
              &#128197; Sort by date
            </button>
          </li>
          <hr />
          <li>
            <button
              className={linkClass}
              onClick={(v) => {
                dispatch({
                  type: "add-new-bookmark",
                  direction: "open",
                });
              }}
            >
              &#9734; Add new bookmark
            </button>
          </li>
          <li>
            <button
              className={linkClass}
              onClick={(v) => {
                dispatch({
                  type: "add-new-folder",
                  direction: "open",
                });
              }}
            >
              &#128448; Add new folder
            </button>
          </li>
          <hr />
          <li>
            <button
              className={linkClass}
              onClick={(v) => setOpenVariant("IMPORT")}
            >
              Import bookmarks
            </button>
          </li>
          <li>
            <button
              className={linkClass}
              onClick={(v) => exportBookmarks(props.rows)}
            >
              Export bookmarks{" "}
            </button>
          </li>
          <li>
            <button className={linkClass} onClick={(v) => printCsv(props.rows)}>
              Download CSV
            </button>
          </li>
          <hr />
          <li>
            <button
              className={linkClass}
              onClick={removeHandler}
            >
              &#128465; Delete empty folders in this folder
            </button>
          </li>
          <li>
            <button
              className={linkClass}
              onClick={(v) => {
                const copiesNumber = recognizeDuplicates();
                window.alert(`copies number:  ${copiesNumber}`);
                console.log(copiesNumber);
              }}
            >
              &#129694; Delete duplicates in this folder
            </button>
          </li>
          <li>
            <button
              className={linkClass}
              disabled={props.searchResultsMode}
              onClick={async (v) => {
                const parentId = props.rows[0].parentId;
                if (parentId) {
                  const parent = (await chrome.bookmarks.get(parentId))[0];
                  removeTracingLinksFromChildren(parent).then(
                    (tracedChanged) => {
                      toast(<RemovedPopup number={tracedChanged} />);
                      console.debug(tracedChanged);
                    },
                  );
                }
              }}
              // https://symbl.cc/en/1F9BA/ safety vest emoji
            >
              &#129466; Remove tracing links in this folder
            </button>
          </li>
          <hr />
          <li>
            <button
              className={linkClass}
              onClick={() => {
                dispatch({
                  type: "settings",
                  direction: "open",
                });
              }}
            >
              &#9881; settings
            </button>
          </li>
          <li>
            <a className={linkClass} href="https://github.com/stan-dot/bkmrk">
              <span id="help-question-mark" className="text-l">?</span>{" "}
              Help center
            </a>
          </li>
        </ul>
      </div>
      {openVariant === "IMPORT" && (
        <BookmarkImportAlert callback={props.importCallback} />
      )}
    </div>
  );
}

function RemovedPopup(props: { number: number }) {
  return (
    <div>
      Removed {props.number} tracing links &#128373;
    </div>
  );
}
