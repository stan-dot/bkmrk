import { basicNodes } from "../../dataProcessing/basicNodes";
import { ContextMenuProps } from "../../types/ContextMenuProps";
import { OpenAllSection } from "../contextMenuComponents/OpenAllSection";
import { EditDeleteSection } from "../EditDeleteSection";
import { CloseSection } from "./CloseSection";

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

export function SidePanelContextMenu(
  props: {
    contextMenuProps: ContextMenuProps;
  },
): JSX.Element {
  const isProtected: boolean = basicNodes.includes(
    props.contextMenuProps.thing.title,
  );
  const styles = getStyles(props.contextMenuProps.position);
  return (
    <div id="sidePanelContextMenu" className="contextMenu" style={styles}>
      <EditDeleteSection
        thing={props.contextMenuProps.thing}
        protected={isProtected}
      />
      <div className="group2">
        <button disabled={!isProtected}>
          <p>cut button</p>
        </button>
        <button disabled={!isProtected}>
          <p>copy buton</p>
        </button>
        <button disabled={!isProtected}>
          <p>paste buton</p>
        </button>
      </div>
      <OpenAllSection thing={props.contextMenuProps.thing} />
      <CloseSection closeCallback={props.contextMenuProps.closeCallback} />
    </div>
  );
}
