import React, { useState } from "react";
import { makeBookmark, makeFolder } from "../../dataProcessing/interact";
import { exportBookmarks } from "../../io/exportBookmarks";
import { BookmarkImportWindow } from "../../io/importBookmarks";
import { DotsSvg } from "./DotsSvg";

export function ManipulationMenu(
  props: { sortCallback: Function; importCallback: Function },
): JSX.Element {
  enum OpenMenuStates {
    IMPORT,
    EXPORT,
    NEW_FOLDER,
    NEW_BOOKMARK,
  }
  const [showMenu, setShowMenu] = useState(false);
  const [openVariant, setOpenVariant] = useState(OpenMenuStates.NEW_BOOKMARK);

  const clickHandler = (v: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    console.log('clicked the side button', showMenu);
    setShowMenu(!showMenu)
  };

  // sort by name, add new BookmarkTable, add new makeFolderimport bookmarks, export bookmarks, help center
  // todo there should be dialog popups for the new bookmark and new folder
  // todo add a theme selection panel to the options
  return (
    <div style={{ zIndex: 4, position: "relative" }} className={'dev-test-outline'}>
      <button onClick={clickHandler} style={{ width: 'fit-content', padding: '20px' }} >
        <DotsSvg />
      </button>
      {showMenu
        && (
          <div id="manipulationMenuContainer" style={{ position: 'absolute', left: '-190%', top: '90%' }}>
            <ul style={{ listStyle: "none", fontSize: "15px" }}>
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
