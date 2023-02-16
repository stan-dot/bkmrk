import { contextMenuButtonClass } from "./contextMenuButtonClass";
import {
  useContextMenu,
  useContextMenuDispatch,
} from "../../contexts/ContextMenuContext";
import { usePopupDispatch } from "../../contexts/PopupContext";

export function MiniContextMenu(props: {}): JSX.Element {
  const context = useContextMenu();
  const position = context.position;
  const dispatch = useContextMenuDispatch();
  const popupDispatch = usePopupDispatch();
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
          type: "general",
          position: context.position,
          direction: "close",
        });
      }}
    >
      <div className="group2 w-32 border-t-solid border-b-solid border-slate-200 m-2">
        <button
          className={contextMenuButtonClass}
          onClick={(v) => {
            popupDispatch({
              type: 'add-new-bookmark',
              direction: 'open'
            })
          }}
        >
          &#9734; Add new bookmark
        </button>
        <button
          className={contextMenuButtonClass}
          onClick={(v) => {
            popupDispatch({
              type: 'add-new-folder',
              direction: 'open'
            })
          }}
        >
          &#128448; Add new folder
        </button>
      </div>
    </div>
  );
}
