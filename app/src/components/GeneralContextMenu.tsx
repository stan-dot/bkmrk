import { OpenAllSection } from "./contextMenuComponents/OpenAllSection";

export function GeneralContextMenu(
  props: { thing: chrome.bookmarks.BookmarkTreeNode; position: number[] },
): JSX.Element {
  return (
    <div
      id="sidePanelContextMenu"
      className="contextMenu"
      style={{
        position: "absolute",
        left: `${props.position[0]}px`,
        right: `${props.position[1]}px`,
      }}
    >
      <div className="group2">
        <p>cut button</p>
        <p>copy buton</p>
        <p>paste buton</p>
      </div>
      <OpenAllSection thing={props.thing} />
    </div >
  );
}


