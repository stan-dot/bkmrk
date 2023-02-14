import { ContextMenuProps } from "../contextMenuComponents/ContextMenuProps";
import { OpenAllSection } from "../contextMenuComponents/OpenAllSection";
import { getPath } from "../../utils/getPath";
import { stringifyPath } from "./stringifyPath";
import { useContextMenu } from "../../contexts/ContextMenuContext";

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
      <div className="group1">
        <p>rename</p>
        <p>delete</p>
      </div>
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
