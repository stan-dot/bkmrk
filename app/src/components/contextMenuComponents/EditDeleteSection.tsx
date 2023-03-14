import { PopupAction, usePopupDispatch } from "../../contexts/PopupContext";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { contextMenuButtonClass } from "./contextMenuButtonClass";

export function EditDeleteSection(
  props: { thing: chrome.bookmarks.BookmarkTreeNode; protected: boolean },
) {
  const dispatch = usePopupDispatch();
  return (
    <div className="group1 flex flex-col">
      <button
        disabled={props.protected}
        onClick={(e) => {
          console.log("clicked the edit button, opening the edit menu");
          const changes: PopupAction = {
            type: isAFolder(props.thing) ? "edit-folder" : "edit-bookmark",
            direction: "open",
            nodeId: props.thing.id,
          };
          dispatch(changes);
        }}
        className={`${contextMenuButtonClass} 'disabled:opacity-25'`}
      >
        <p>Edit</p>
      </button>
      <button
        disabled={props.protected}
        onClick={(e) => {
          chrome.bookmarks.remove(props.thing.id);
        }}
        className={`${contextMenuButtonClass} 'disabled:opacity-25'`}
      >
        <p>Delete</p>
      </button>
    </div>
  );
}
