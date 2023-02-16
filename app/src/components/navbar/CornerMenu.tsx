import { useState } from "react";
import { usePopupDispatch } from "../../contexts/PopupContext";
import { sortRows } from "../../utils/interactivity/sortRows";
import { exportBookmarks } from "../../utils/io/exportBookmarks";
import { BookmarkImportWindow } from "../../utils/io/importBookmarks";
import { printCsv } from "../../utils/io/printCsv";
import { deleteAllEmpty } from "../../utils/traversalFunctions/deleteEmpty";
import { recognizeDuplicates } from "../../utils/traversalFunctions/getCopies";

const linkClass =
  "block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white";

type OpenMenuStates = "IMPORT" | "EXPORT" | "NEW_FOLDER" | "NEW_BOOKMARK";

// todo the advanced should have a separate alert window
export function CornerMenu(
  props: {
    importCallback: Function;
    rows: chrome.bookmarks.BookmarkTreeNode[];
  },
): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  const [openVariant, setOpenVariant] = useState<OpenMenuStates>(
    "NEW_BOOKMARK",
  );
  const dispatch = usePopupDispatch()

  return (
    <div className={"conrner-menu-button z-40 relative"}
      onBlur={() => {
        dispatch({
          direction: 'close',
          type: 'none'
        })
      }}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        id="dropdownDefaultButton"
        className="text-white hover:bg-slate-400 focus:outline-none rounded-lg text-3xl p-4 text-center border-red-600"
        type="button"
        onBlur={() => setShowMenu(false)}
      >
        &#8942;
      </button>
      <div
        id="dropdown"
        onBlur={() => setShowMenu(false)}
        className={`absolute right-1/3 top-1/10 z-10 ${!showMenu && "hidden"
          } bg-white divide-y divide-gray-100 rounded-md shadow w-44 dark:bg-gray-700`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 justify-start">
          <li>
            <button
              className={linkClass}
              onClick={(v) =>
                sortRows(
                  props.rows,
                  {
                    key: "title",
                    reverse: false,
                  },
                )}
            >
              <span className="italic text-l ">A-Z</span> Sort by name
            </button>
          </li>
          <li>
            <button
              className={linkClass}
              onClick={(v) =>
                sortRows(props.rows, {
                  key: "title",
                  reverse: false,
                })}
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
                  type: 'add-new-bookmark',
                  direction: 'open'
                })
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
                  type: 'add-new-folder',
                  direction: 'open'
                })
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
            <button className={linkClass} onClick={(v) => exportBookmarks}>
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
              onClick={(v) => deleteAllEmpty()}
            >
              &#128465; Delete empty folders
            </button>
          </li>
          <li>
            <button
              className={linkClass}
              onClick={(v) => {
                const copiesNumber = recognizeDuplicates();
                console.log(copiesNumber);
              }}
            >
              &#129694; Delete duplicates
            </button>
          </li>
          <hr />
          <li>
            <a className={linkClass} href="https://github.com/stan-dot/bkmrk">
              <span id="help-question-mark" className="text-l">?</span>{" "}
              Help center
            </a>
          </li>
        </ul>
      </div>
      {openVariant === "IMPORT" && (
        <BookmarkImportWindow callback={props.importCallback} />
      )}
      {openVariant === "NEW_BOOKMARK" && <NewBookmarkWindow />}
      {openVariant === "NEW_FOLDER" && <NewFolderWindow />}
    </div>
  );
}

function NewBookmarkWindow(props: {}): JSX.Element {
  return (
    <dialog>
      <p>hi, what's the new bookmark that you need?</p>
    </dialog>
  );
}

function NewFolderWindow(props: {}): JSX.Element {
  return (
    <dialog>
      <p>hi, what's the new folder that you need?</p>
    </dialog>
  );
}
