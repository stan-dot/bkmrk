import { basicNodes } from "../../dataProcessing/basicNodes";
import { ContextMenuProps } from "../../types/ContextMenuProps";
import { OpenAllSection } from "../contextMenuComponents/OpenAllSection";
import { EditDeleteSection } from "../EditDeleteSection";

export const contextMenuButtonClass =
  "hover:bg-slate-300 w-48 text-slate-50 p-2";
export function SidePanelContextMenu(
  props: { contextMenuProps: ContextMenuProps },
): JSX.Element {
  const isProtected: boolean = basicNodes.includes(
    props.contextMenuProps.thing.title,
  );
  const position = props.contextMenuProps.position;
  return (
    <div
      id="sidePanelContextMenu"
      // className={`contextMenu absolute z-50 text-l border-solid  bg-slate-700 w-fit`}
      style={{
        position: "absolute",
        left: `${position[0]}px`,
        right: `${position[1]}px`,
      }}
      onBlur={() => props.contextMenuProps.closeCallback()}
    >
      <hr />
      <EditDeleteSection
        thing={props.contextMenuProps.thing}
        protected={isProtected}
      />
      <hr />
      <div className="group2 border-t-solid border-b-solid border-slate-200 m-2">
        <button disabled={!isProtected} className={contextMenuButtonClass}>
          <p>Cut</p>
        </button>
        <button disabled={!isProtected} className={contextMenuButtonClass}>
          <p>Copy</p>
        </button>
        <button disabled={!isProtected} className={contextMenuButtonClass}>
          <p>Paste</p>
        </button>
      </div>
      <hr />
      <OpenAllSection thing={props.contextMenuProps.thing} />
    </div>
  );
}
