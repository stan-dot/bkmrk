import { CloseSection } from "./sidePanel/CloseSection";

export function GeneralContextMenu(
  props: { thing: chrome.bookmarks.BookmarkTreeNode; position: number[], closeCallback: () => void },
): JSX.Element {
  return (
    <div
      id="sidePanelContextMenu"
      className={`contextMenu l-[${props.position[0]}px] t-[${props.position[1]}px] absolute`}
    >
      <div className="group5">
        <p>create new bookmark</p>
        <p>create new folder</p>
      </div>
      <CloseSection closeCallback={props.closeCallback} />
    </div >
  );
}

/**
 * todo needed props: position to display, add handle, cancel handle
 * todo add useref
 * @returns 
 */
function AddBookmarkForm(): JSX.Element {
  return <div id="addBookmarkForm" >
    <h3>Add fodler</h3>
    <label htmlFor='bookmarkName'>
      Name
    </label>
    <input id="bookmarkName">
    </input>
    <label htmlFor='URL'>
      URL
    </label>
    <input id="URL">
    </input>
    <button>
      Cancel
    </button>
    <button>
      Save
    </button>
  </div>
}


/**
 * todo needed props: position to display, add handle, cancel handle
 * todo add useref
 * @returns 
 */
function AddFolderForm(): JSX.Element {
  return <div id="addFolderForm" >
    <h3>Add fodler</h3>
    <label htmlFor='folderName'>
      Name
    </label>
    <input id="folderName">
    </input>
    <button>
      Cancel
    </button>
    <button>
      Save
    </button>
  </div>
}
