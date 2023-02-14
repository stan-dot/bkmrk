import { ContextMenuProps } from "./ContextMenuProps";
import { contextMenuButtonClass } from "./contextMenuButtonClass";
import { useContextMenu, useContextMenuDispatch } from "../../contexts/ContextMenuContext";

export function MiniContextMenu(
  props: { contextMenuProps: ContextMenuProps },
): JSX.Element {
  // const position = props.contextMenuProps.position;
  const context = useContextMenu();
  const position = context.position;
  const dispatch = useContextMenuDispatch();
  return (
    <div
      id="sidePanelContextMenu"
      className={`contextMenu w-36 z-50 border-1 text-l rounded-md border-solid bg-slate-700 `}
      style={{
        display: "flex",
        position: "absolute",
        left: `${position[0]}px`,
        right: `${position[1]}px`,
      }}
      // onBlur={() => props.contextMenuProps.closeCallback()}
      onBlur={() => {
        dispatch({
          type: 'general',
          things: props.contextMenuProps.things,
          position: context.position,
          direction: 'close'
        })
      }}
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
