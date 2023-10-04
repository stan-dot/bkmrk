import { toast } from "react-toastify";
import CRUDBookmarkFacade from "../../lib/CRUDBookmarkFacade";
import { BookmarkCreateArg, BookmarkNode } from "../../lib/typesFacade";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { PopupAction, usePopupDispatch } from "../alerts/PopupContext";
import { ContextMenuButton } from "./ContextMenuButton";

export function EditDeleteSection(
  props: { thing: BookmarkNode; protected: boolean },
) {
  const dispatch = usePopupDispatch();

  const handleEditClick = (e: any) => {
    console.debug("clicked the edit button, opening the edit menu");
    const changeType = isAFolder(props.thing) ? "edit-folder" : "edit-bookmark";

    const changes: PopupAction = {
      type: changeType,
      direction: "open",
      nodeId: props.thing.id,
    };

    dispatch(changes);
  };

  const handleDeleteClick = (_e: any) => {
    const savedBookmarkForUndo: BookmarkCreateArg = {
      parentId: props.thing.parentId,
      index: props.thing.index,
      title: props.thing.title,
      url: props.thing.url,
    };
    toast(
      <ContextMenuButton
        textNode={<p>"undo?"</p>}
        callback={() => CRUDBookmarkFacade.createBookmark(savedBookmarkForUndo)}
        title={`removed item ${props.thing.title}`}
      />,
    );
    CRUDBookmarkFacade.removeBookmark(props.thing.id);
  };

  return (
    <div className="group1 flex flex-col">
      <ContextMenuButton
        textNode={<p>Edit</p>}
        callback={handleEditClick}
        disabled={props.protected}
      />
      <ContextMenuButton
        textNode={<p>Delete</p>}
        callback={handleDeleteClick}
        disabled={props.protected}
      />
    </div>
  );
}
