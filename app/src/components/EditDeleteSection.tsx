import { useState } from "react";
import EditAlert from "./alerts/EditAlert";

export function EditDeleteSection(
  props: { thing: chrome.bookmarks.BookmarkTreeNode; protected: boolean },
) {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <div className="group1">
      <button
        disabled={props.protected}
        onClick={(e) => setEditOpen(true)}
      >
        <p>Edit</p>
      </button>
      {editOpen &&
        (
          <EditAlert
            submitCallback={(data) =>
              chrome.bookmarks.update(props.thing.id, data)}
            closeCallback={() => setEditOpen(false)}
          />
        )}
      <button
        disabled={props.protected}
        onClick={(e) => {
          chrome.bookmarks.remove(props.thing.id);
        }}
      >
        <p>delete</p>
      </button>
    </div>
  );
}
