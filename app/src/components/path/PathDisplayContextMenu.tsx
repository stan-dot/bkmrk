import { ContextMenuProps } from "../contextMenuComponents/ContextMenuProps";
import { OpenAllSection } from "../contextMenuComponents/OpenAllSection";
import { getPath } from "../../utils/getPath";
import { useContextMenu } from "../../contexts/ContextMenuContext";
import { EditDeleteSection } from "../contextMenuComponents/EditDeleteSection";

function stringifyPath(nodes: chrome.bookmarks.BookmarkTreeNode[]): string {
  return nodes.map((b: chrome.bookmarks.BookmarkTreeNode) => b.title).join("/");
}

export function PathDisplayContextMenu(
  props: { contextMenuProps: ContextMenuProps },
): JSX.Element {
  const handleCopyOption = () => {
    // todo change this
    getPath(props.contextMenuProps.things[0]).then((path) => {
      const text: string = stringifyPath(path);
      window.navigator.clipboard.writeText(text);
      // todo some sweet alert to notify it's copied. or a tooltip
    });
  };

  const contextMenu = useContextMenu()
  const position = contextMenu.position;
  return (
    <div
      id="tableContextMenu"
      className={`contextMenu absolute`}
      style={{
        position: "absolute",
        left: `${position[0]}px`,
        right: `${position[1]}px`,
      }}
    >
      <EditDeleteSection thing={props.contextMenuProps.things[0]} protected={false} />
      <div className="group2">
        <p>copy path</p>
        <p>paste buton</p>
      </div>
      <OpenAllSection things={props.contextMenuProps.things} />
      <div className="group4">
        <button onClick={(e) => handleCopyOption()}>
          Copy path
        </button>
      </div>
    </div>
  );
}
