import React, { useState } from "react";
import { makeBookmark, makeFolder } from "../../dataProcessing/interact";
import { exportBookmarks } from "../../io/exportBookmarks";
import { BookmarkImportWindow } from "../../io/importBookmarks";
import { printCsv } from "../../utils/printCsv";

const linkClass = "block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white";

enum OpenMenuStates {
  IMPORT,
  EXPORT,
  NEW_FOLDER,
  NEW_BOOKMARK,
}

export function CornerMenu(
  props: {
    sortCallback: Function;
    importCallback: Function;
    rows: chrome.bookmarks.BookmarkTreeNode[];
  },
): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  const [openVariant, setOpenVariant] = useState(OpenMenuStates.NEW_BOOKMARK);

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
      <div id="dropdown" onBlur={() => setShowMenu(false)} className={`absolute right-1/3 top-1/10 z-10 ${!showMenu && "hidden"} bg-white divide-y divide-gray-100 rounded-md shadow w-44 dark:bg-gray-700`} >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 justify-start" >
          <li>
            <button className={linkClass} onClick={(v) => props.sortCallback}>
              <span className="italic text-l ">A-Z</span> Sort by name
            </button>
          </li>
          <li>
            <button className={linkClass} onClick={(v) => props.sortCallback}>
              &#128197; Sort by date made
            </button>
          </li>
          <hr />
          <li>
            <button className={linkClass} onClick={(v) => makeBookmark("someId")}>
              &#9734; Add new bookmark
            </button>
          </li>
          <li>
            <button className={linkClass} onClick={(v) => makeFolder("test", "someid")}>
              &#128448; Add new folder
            </button>
          </li>
          <hr />
          <li>
            <button className={linkClass}
              onClick={(v) => setOpenVariant(OpenMenuStates.IMPORT)}
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
              onClick={(v) => console.log("should open some setting page?")}
            >
              &#9881; Settings
            </button>
          </li>
          <li>
            <a className={linkClass} href="https://github.com/stan-dot/bkmrk">
              <span id="help-question-mark" className="text-l"> ?  </span> Help center
            </a>
          </li>
        </ul>
      </div>
      {
        openVariant === OpenMenuStates.IMPORT && (
          <BookmarkImportWindow callback={props.importCallback} />
        )
      }
      {openVariant === OpenMenuStates.NEW_BOOKMARK && <NewBookmarkWindow />}
      {openVariant === OpenMenuStates.NEW_FOLDER && <NewFolderWindow />}
    </div >
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
