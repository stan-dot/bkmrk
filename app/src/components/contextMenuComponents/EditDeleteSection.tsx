import { useState } from "react";
import EditAlert from "../alerts/EditAlert";
import { contextMenuButtonClass } from "./contextMenuButtonClass";

export function EditDeleteSection(
  props: { thing: chrome.bookmarks.BookmarkTreeNode; protected: boolean },
) {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <div className="group1 flex flex-col">
      <button
        disabled={props.protected}
        onClick={(e) => {
          console.log('clicked the edit button, opening the edit menu');
          setEditOpen(true);
        }}
        className={contextMenuButtonClass}
      >
        <p>Edit</p>
      </button>
      <EditAlert
        submitCallback={(data) =>
          chrome.bookmarks.update(props.thing.id, data)}
        closeCallback={() => setEditOpen(false)}
        visible={editOpen}
      />
      <button
        disabled={props.protected}
        onClick={(e) => {
          chrome.bookmarks.remove(props.thing.id);
        }}
        className={contextMenuButtonClass}
      >
        <p>Delete</p>
      </button>
    </div>
  );
}