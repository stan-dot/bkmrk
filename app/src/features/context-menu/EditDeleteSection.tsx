import { toast } from "react-toastify";
import { PopupAction, usePopupDispatch } from "../alerts/PopupContext";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { contextMenuButtonClass } from "./contextMenuButtonClass";
import { DeleteUndoButton } from "./DeleteUndoButton";

export function EditDeleteSection(
  props: { thing: BookmarkNode; protected: boolean },
) {
  const dispatch = usePopupDispatch();

  const handleEditClick = (e) => {
    console.debug("clicked the edit button, opening the edit menu");
    const changeType = isAFolder(props.thing) ? "edit-folder" : "edit-bookmark";

    const changes: PopupAction = {
      type: changeType,
      direction: "open",
      nodeId: props.thing.id,
    };

    dispatch(changes);
  };

  const handleDeleteClick = (e) => {
    toast(<DeleteUndoButton thing={props.thing} />);
    chrome.bookmarks.remove(props.thing.id);
  };

  return (
    <div className="group1 flex flex-col">
      <button
        disabled={props.protected}
        onClick={handleEditClick}
        className={`${contextMenuButtonClass} 'disabled:opacity-25'`}
      >
        <p>Edit</p>
      </button>
      <button
        disabled={props.protected}
        onClick={handleDeleteClick}
        className={`${contextMenuButtonClass} 'disabled:opacity-25'`}
      >
        <p>Delete</p>
      </button>
    </div>
  );
}
