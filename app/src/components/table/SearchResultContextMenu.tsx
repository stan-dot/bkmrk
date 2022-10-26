import { basicNodes } from "../../dataProcessing/basicNodes";
import { OpenAllSection } from "../contextMenuComponents/OpenAllSection";
import { EditDeleteSection } from "../EditDeleteSection";
import { CloseSection } from "../sidePanel/CloseSection";

function getStyles(position: number[]): React.CSSProperties {
  return {
    position: "absolute",
    left: `${position[0]}px`,
    right: `${position[1]}px`,
    zIndex: 50,
    fontSize: 10,
    border: "1px solid",
    borderColor: "#FF0000",
    background: "solid",
    backgroundColor: "coral",
    width: "fit-content",
  };
}

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
  const isProtected: boolean = basicNodes.includes(props.thing.title);
  return (
    <div
      id="searchResultContextMenu"
      className="contextMenu"
      style={getStyles(props.position)}
    >
      <EditDeleteSection thing={props.thing} protected={isProtected} />
      <div className="group2">
        <p>cut button</p>
        <p>copy buton</p>
        <p>paste buton</p>
      </div>
      <p>show in folder</p>
      <OpenAllSection thing={props.thing} />
      <CloseSection closeCallback={props.closeCallback} />
    </div>
  );
}
