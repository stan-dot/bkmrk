import React, { useState } from "react";
import { makeBookmark, makeFolder } from "../../dataProcessing/interact";
import { exportBookmarks } from "../../io/exportBookmarks";
import { BookmarkImportWindow } from "../../io/importBookmarks";
import { printCsv } from "../../utils/printCsv";
import { DotsSvg } from "./DotsSvg";

enum OpenMenuStates {
  IMPORT,
  EXPORT,
  NEW_FOLDER,
  NEW_BOOKMARK,
}

export function ManipulationMenu(
  props: { sortCallback: Function; importCallback: Function, rows: chrome.bookmarks.BookmarkTreeNode[] },
): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  const [openVariant, setOpenVariant] = useState(OpenMenuStates.NEW_BOOKMARK);

  const clickHandler = (v: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    console.log('clicked the side button', showMenu);
    setShowMenu(!showMenu)
  };

  // todo there should be dialog popups for the new bookmark and new folder
  return (
    <div className={'dev-test-outline z-40 relative'}>
      <button onClick={clickHandler} className={"w-fit p-10"} >
        <DotsSvg />
      </button>
      {showMenu
        && (
          <div id="manipulationMenuContainer" className="absolute right-1/3 top-1/10" >
            <ul className="list-none text-l" >
              <li>
                <button onClick={(v) => props.sortCallback}>
                  sort by name
                </button>
              </li>
              <li>
                <button onClick={(v) => props.sortCallback}>
                  sort by date made
                </button>
              </li>
              <li>
                <button onClick={(v) => makeBookmark("someId")}>
                  add new bookmark{" "}
                </button>
              </li>
              <li>
                <button onClick={(v) => makeFolder("test", "someid")}>
                  add new folder{" "}
                </button>
              </li>
              <li>
                <button
                  onClick={(v) => setOpenVariant(OpenMenuStates.IMPORT)}
                >
                  import bookmarks
                </button>
              </li>
              <li>
                <button onClick={(v) => exportBookmarks}>
                  export bookmarks{" "}
                </button>
              </li>
              <li>
                <button onClick={(v) => printCsv(props.rows)}>
                  download csv of current display (for Excel)
                </button>
              </li>
              <li>
                <svg href="chrome://favicon/chrome://settings" />
                <button onClick={(v) => console.log('should open some setting page?')}>
                  settings
                </button>
              </li>
              <li >
                <a href="https://github.com/stan-dot/bkmrk" >
                  help center
                </a>
              </li>
            </ul>
          </div>
        )
      }
      {openVariant === OpenMenuStates.IMPORT && (
        <BookmarkImportWindow callback={props.importCallback} />
      )}
      {openVariant === OpenMenuStates.NEW_BOOKMARK && <NewBookmarkWindow />}
      {openVariant === OpenMenuStates.NEW_FOLDER && <NewFolderWindow />}
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
