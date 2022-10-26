import {
  getChildrenLinks,
  openAllChildren,
} from "../../functions/ifHasChildrenFolders";
import { OpenAllSection } from "../contextMenuComponents/OpenAllSection";

/**
 * todo the show in folder bit
 * @param props
 * @returns
 */
export function SearchResultContextMenu(
  props: {
    thing: chrome.bookmarks.BookmarkTreeNode;
    position: number[];
    closeCallback: () => void;
  },
): JSX.Element {
  const childrenLinks: chrome.bookmarks.BookmarkTreeNode[] = getChildrenLinks(
    props.thing,
  );
  const hasChildrenLinks: boolean = childrenLinks.length > 0;
  const tableContextMenuStyles: React.CSSProperties = {
    position: "absolute",
    left: `${props.position[0]}px`,
    right: `${props.position[1]}px`,
    zIndex: "40",
  };
  return (
    <div
      id="searchResultContextMenu"
      className="contextMenu"
      style={tableContextMenuStyles}
    >
      <div className="group1">
        <p>rename button</p>
        <p>show in folder</p>
        <p>delete button</p>
      </div>
      <div className="group2">
        <p>cut button</p>
        <p>copy buton</p>
        <p>paste buton</p>
      </div>
      <OpenAllSection thing={props.thing} />
      <div className="group4">
        <button onClick={() => props.closeCallback()}>
          Close
        </button>
      </div>
    </div>
  );
}
