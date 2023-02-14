import React, { useState } from "react";
import { makeBookmark, makeFolder } from "../../utils/dataProcessing/interact";
import { exportBookmarks } from "../../utils/io/exportBookmarks";
import { BookmarkImportWindow } from "../../utils/io/importBookmarks";
import { printCsv } from "../../utils/ioOperations";
import { SortOptions, sortRows } from "../../utils/sortRows";
import { deleteAllEmpty } from "../../utils/traversalFunctions/deleteEmpty";
import { getCopies } from "../../utils/traversalFunctions/getCopies";

const linkClass =
  "block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white";

type OpenMenuStates = "IMPORT" | "EXPORT" | "NEW_FOLDER" | "NEW_BOOKMARK";

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

  // todo there should be dialog popups for the new bookmark and new folder
  return (
    <div className={"conrner-menu-button z-40 relative"}>
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
              onClick={(v) => makeBookmark("someId")}
            >
              &#9734; Add new bookmark
            </button>
          </li>
          <li>
            <button
              className={linkClass}
              onClick={(v) => makeFolder("test", "someid")}
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
                const copiesNumber = getCopies();
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
