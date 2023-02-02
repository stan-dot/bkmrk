import { ContextMenuProps } from "../../types/ContextMenuProps";
import { contextMenuButtonClass } from "./contextMenuButtonClass";

export function MiniContextMenu(
  props: {
    contextMenuProps: ContextMenuProps;
    visible: boolean
  },
): JSX.Element {

  const position = props.contextMenuProps.position;
  return (
    <div
      id="sidePanelContextMenu"
      className={`contextMenu w-36 z-50 border-1 text-l rounded-md border-solid bg-slate-700 `}
      style={{
        display: props.visible ? 'flex' : 'none',
        position: "absolute",
        left: `${position[0]}px`,
        right: `${position[1]}px`,
      }}
      onBlur={() => props.contextMenuProps.closeCallback()}
    >
      <div className="group2 w-32 border-t-solid border-b-solid border-slate-200 m-2">
        <button className={contextMenuButtonClass}>
          <p>Add new bookmark</p>
        </button>
        <button className={contextMenuButtonClass}>
          <p>Add new folder</p>
        </button>
      </div>
    </div>
  );
}
