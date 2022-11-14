import { ContextMenuProps } from "../../types/ContextMenuProps";
import { OpenAllSection } from "../contextMenuComponents/OpenAllSection";
import { getPath } from "../getPath";
import { stringifyPath } from "./stringifyPath";

export function PathDisplayContextMenu(
  props: { contextMenuProps: ContextMenuProps },
): JSX.Element {
  const handleCopyOption = () => {
    getPath(props.contextMenuProps.thing).then((path) => {
      const text: string = stringifyPath(path);
      window.navigator.clipboard.writeText(text);
      // todo some sweet alert to notify it's copied. or a tooltip
    });
  };

  return (
    <div
      id="tableContextMenu"
      className="contextMenu"
      style={{
        position: "absolute",
        left: `${props.contextMenuProps.position[0]}px`,
        right: `${props.contextMenuProps.position[1]}px`,
      }}
    >
      <div className="group1">
        <p>rename button</p>
        <p>delete button</p>
      </div>
      <div className="group2">
        <p>copy path</p>
        <p>paste buton</p>
      </div>
      <OpenAllSection thing={props.contextMenuProps.thing} />
      <div className="group4">
        <button onClick={(e) => handleCopyOption()}>
          Copy path
        </button>
      </div>
    </div>
  );
}
