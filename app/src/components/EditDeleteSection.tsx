import { useState } from "react";
import EditAlert from "./alerts/EditAlert";
import { contextMenuButtonClass } from "./sidePanel/SidePanelContextMenu";

export function EditDeleteSection(
  props: { thing: chrome.bookmarks.BookmarkTreeNode; protected: boolean },
) {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <div className="group1  flex flex-col">
      <button
        disabled={props.protected}
        onClick={(e) => setEditOpen(true)} className={contextMenuButtonClass}
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
        }} className={contextMenuButtonClass}
      >
        <p>Delete</p>
      </button>
    </div>
  );
}
