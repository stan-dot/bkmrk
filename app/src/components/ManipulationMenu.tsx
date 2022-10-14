import React, { useState } from "react";
import { makeBookmark, makeFolder } from "../dataProcessing/interact";
import { exportBookmarks } from "../io/exportBookmarks";
import { BookmarkImportWindow } from "../io/importBookmarks";

const DotsSvg = () => {
  const SEARCH_BUTTON_EDGE = 180;
  const iconEdge = Math.ceil(SEARCH_BUTTON_EDGE * 0.60);
  const searchIconStyle = {
    fill: '#727272',
  };
  return <svg
    version="1.1"
    x="0px"
    y="0px"
    width={18}
    height={64}
    viewBox="-10 -20 45 165"
    style={searchIconStyle}
  >
    <g>
      <path
        d="M15,0A15,15,0,1,1,0,15,15,15,0,0,1,15,0Zm0,92.93a15,15,0,1,1-15,15,15,15,0,0,1,15-15Zm0-46.47a15,15,0,1,1-15,15,15,15,0,0,1,15-15Z"
      />
    </g>
  </svg >
}

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
        ?? (
          <div id="manipulationMenuContainer" style={{ position: 'absolute' }}>
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
      {openVariant === OpenMenuStates.IMPORT ?? (
        <BookmarkImportWindow callback={props.importCallback} />
      )}
      {openVariant === OpenMenuStates.NEW_BOOKMARK ?? <NewBookmarkWindow />}
      {openVariant === OpenMenuStates.NEW_FOLDER ?? <NewFolderWindow />}
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
