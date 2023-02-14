import { PopupAction, usePopupDispatch } from "../../contexts/PopupContext";
import { contextMenuButtonClass } from "./contextMenuButtonClass";

export function EditDeleteSection(
  props: { thing: chrome.bookmarks.BookmarkTreeNode; protected: boolean },
) {
  // const [editOpen, setEditOpen] = useState(false);
  const dispatch = usePopupDispatch();
  return (
    <div className="group1 flex flex-col">
      <button
        disabled={props.protected}
        onClick={(e) => {
          // todo this does not even work! on the main dirs
          console.log('clicked the edit button, opening the edit menu');
          const changes: PopupAction = {
            // todo that will need to change
            type: 'edit-folder',
            direction: 'open',
          };
          // setEditOpen(true);
          // todo not a function error for the dispatch ?!
          dispatch(changes)
        }}
        className={`${contextMenuButtonClass} 'disabled:opacity-25'`}
      >
        <p>Edit</p>
      </button>
      {/* <EditBookmarkAlert
        // visible={editOpen}
        id={props.thing.id} /> */}
      <button
        disabled={props.protected}
        onClick={(e) => {
          chrome.bookmarks.remove(props.thing.id);
        }}
        className={`${contextMenuButtonClass} 'disabled:opacity-25'`}
      // todo this needs a 'undo' popup in the left bottom corner
      >
        <p>Delete</p>
      </button>
    </div>
  );
}
