import React, { useState } from "react";
import { makeBookmark, makeFolder } from "../../dataProcessing/interact";
import { exportBookmarks } from "../../io/exportBookmarks";
import { BookmarkImportWindow } from "../../io/importBookmarks";
import { printCsv } from "../../utils/printCsv";

const linkClass = "block px-4 w-full py-2 text-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white";

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

  const clickHandler = (): void => {
    console.log("clicked the side button", showMenu);
    setShowMenu(!showMenu);
  };

  // todo there should be dialog popups for the new bookmark and new folder
  return (
    <div className={"dev-test-outline z-40 relative"}>
      <button
        onClick={clickHandler}
        id="dropdownDefaultButton"
        className="text-white  hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-slate-900 rounded-lg text-3xl p-4 text-center"
        type="button"
        // todo this might not work
        onBlur={() => clickHandler()}
      >
        &#8942;
      </button>
      <div id="dropdown" onBlur={() => clickHandler()} className={`absolute right-1/3 top-1/10 z-10 ${!showMenu && "hidden"} bg-white divide-y divide-gray-100 rounded-sm shadow w-44 dark:bg-gray-700`} >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" >
          <li>
            <button className={linkClass} onClick={(v) => props.sortCallback}>
              sort by name
            </button>
          </li>
          <li>
            <button className={linkClass} onClick={(v) => props.sortCallback}>
              sort by date made
            </button>
          </li>
          <li>
            <button className={linkClass} onClick={(v) => makeBookmark("someId")}>
              add new bookmark{" "}
            </button>
          </li>
          <li>
            <button className={linkClass} onClick={(v) => makeFolder("test", "someid")}>
              add new folder{" "}
            </button>
          </li>
          <li>
            <button className={linkClass}
              onClick={(v) => setOpenVariant(OpenMenuStates.IMPORT)}
            >
              import bookmarks
            </button>
          </li>
          <li>
            <button className={linkClass} onClick={(v) => exportBookmarks}>
              export bookmarks{" "}
            </button>
          </li>
          <li>
            <button className={linkClass} onClick={(v) => printCsv(props.rows)}>
              download csv of current display (for Excel)
            </button>
          </li>
          <li>
            <button
              className={linkClass}
              onClick={(v) => console.log("should open some setting page?")}
            >
              &#9881; settings
            </button>
          </li>
          <li>
            <a className={linkClass} href="https://github.com/stan-dot/bkmrk">
              help center
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
