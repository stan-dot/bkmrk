import { OpenAllSection } from "../contextMenuComponents/OpenAllSection";
import { getPath } from "../../lib/CRUDBookmarkFacade";
import { useContextMenu } from "../context-menu/ContextMenuContext";
import { EditDeleteSection } from "../contextMenuComponents/EditDeleteSection";
import { toast } from "react-toastify";

function stringifyPath(nodes: BookmarkNode[]): string {
  return nodes.map((b: BookmarkNode) => b.title).join("/");
}

export function PathDisplayContextMenu(
  props: { thing: BookmarkNode },
): JSX.Element {
  const handleCopyOption = () => {
    getPath(props.thing).then((path) => {
      const text: string = stringifyPath(path);
      window.navigator.clipboard.writeText(text);
      const content = `copied to clipboard ${text}`;
      toast(content);
    });
  };

  const contextMenu = useContextMenu();
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
      <EditDeleteSection thing={props.thing} protected={false} />
      <div className="group2">
        <p>copy path</p>
        <p>paste buton</p>
      </div>
      <OpenAllSection things={[props.thing]} />
      <div className="group4">
        <button onClick={(e) => handleCopyOption()}>
          Copy path
        </button>
      </div>
    </div>
  );
}
