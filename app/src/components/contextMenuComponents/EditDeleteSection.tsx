import { toast } from "react-toastify";
import { PopupAction, usePopupDispatch } from "../../contexts/PopupContext";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { contextMenuButtonClass } from "./contextMenuButtonClass";

function DeleteUndoButton(
  props: { thing: chrome.bookmarks.BookmarkTreeNode; undoCallback: Function },
): JSX.Element {
  return (
    <div>
      <h2>
        removed item {props.thing.title}
      </h2>

      <button onClick={() => props.undoCallback}>undo?</button>
    </div>
  );
}

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
          toast(
            <DeleteUndoButton
              thing={props.thing}
              undoCallback={() => {
                const createArgs: chrome.bookmarks.BookmarkCreateArg = {
                  parentId: props.thing.parentId,
                  index: props.thing.index,
                  title: props.thing.title,
                  url: props.thing.url,
                };
                chrome.bookmarks.create(createArgs);
              }}
            />,
          );
          chrome.bookmarks.remove(props.thing.id);
        }}
        className={`${contextMenuButtonClass} 'disabled:opacity-25'`}
      >
        <p>Delete</p>
      </button>
    </div>
  );
}
