import { basicNodes } from "../../dataProcessing/basicNodes";
import { OpenAllSection } from "../contextMenuComponents/OpenAllSection";
import { EditDeleteSection } from "../EditDeleteSection";
import { CloseSection } from "../sidePanel/CloseSection";

const tableContextMenuStyles = (position: number[]): React.CSSProperties => {
  return {
    position: "absolute",
    left: `${position[0]}px`,
    right: `${position[1]}px`,
    zIndex: "40",
  };
};
/**
 * @param props
 * @returns
 */
export function TableContextMenu(
  props: {
    thing: chrome.bookmarks.BookmarkTreeNode;
    position: number[];
    closeCallback: () => void;
  },
): JSX.Element {
  const isProtected: boolean = basicNodes.includes(props.thing.title);
  return (
    <div
      id="tableContextMenu"
      className="contextMenu"
      style={tableContextMenuStyles(props.position)}
    >
      <EditDeleteSection thing={props.thing} protected={isProtected} />
      <div className="group2">
        <p>cut button</p>
        <p>copy buton</p>
        <p>paste buton</p>
      </div>
      <OpenAllSection thing={props.thing} />
      <CloseSection closeCallback={props.closeCallback} />
    </div>
  );
}
