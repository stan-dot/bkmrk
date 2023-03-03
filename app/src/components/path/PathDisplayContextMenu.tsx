import { OpenAllSection } from "../contextMenuComponents/OpenAllSection";
import { getPath } from "../../utils/interactivity/getPath";
import { useContextMenu } from "../../contexts/ContextMenuContext";
import { EditDeleteSection } from "../contextMenuComponents/EditDeleteSection";
import { toast } from "react-toastify";

function stringifyPath(nodes: chrome.bookmarks.BookmarkTreeNode[]): string {
  return nodes.map((b: chrome.bookmarks.BookmarkTreeNode) => b.title).join("/");
}

export function PathDisplayContextMenu(
  props: { thing: chrome.bookmarks.BookmarkTreeNode },
): JSX.Element {
  const handleCopyOption = () => {
    getPath(props.thing).then((path) => {
      const text: string = stringifyPath(path);
      window.navigator.clipboard.writeText(text);
      // todo check if this toast works fr https://github.com/fkhadra/react-toastify
      toast('wow so easy!');
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
