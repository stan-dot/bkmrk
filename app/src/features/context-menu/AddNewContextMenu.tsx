import { usePopupDispatch } from "../alerts/PopupContext";
import { ContextMenuButton } from "./ContextMenuButton";
import { useContextMenu, useContextMenuDispatch } from "./ContextMenuContext";

export function AddNewContextMenu(props: {}): JSX.Element {
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
        <ContextMenuButton
          textNode={<p>&#9734; Add new bookmark</p>}
          callback={(v: any) => {
            popupDispatch({
              type: "add-new-bookmark",
              direction: "open",
            });
          }}
        />
        <ContextMenuButton
          textNode={<p>&#128448; Add new folder</p>}
          callback={(v: any) => {
            popupDispatch({
              type: "add-new-folder",
              direction: "open",
            });
          }}
        />
      </div>
    </div>
  );
}
