import { basicNodes } from "../../dataProcessing/basicNodes";
import { ContextMenuProps } from "../../types/ContextMenuProps";
import { OpenAllSection } from "../contextMenuComponents/OpenAllSection";
import { EditDeleteSection } from "../EditDeleteSection";
import { CloseSection } from "./CloseSection";


export function SidePanelContextMenu(
  props: {
    contextMenuProps: ContextMenuProps;
  },
): JSX.Element {
  const isProtected: boolean = basicNodes.includes(
    props.contextMenuProps.thing.title,
  );
  const position = props.contextMenuProps.position;
  return (
    <div id="sidePanelContextMenu" className={`contextMenu absolute left-[${position[0]}px] top-[${position[1]}px] z-50 text-l border-solid border-red-700 bg-cyan-600 w-fit`} >
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
