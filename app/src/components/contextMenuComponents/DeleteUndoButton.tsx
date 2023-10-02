import CRUDBookmarkFacade from "../../lib/CRUDBookmarkFacade";

// todo potentially use this with a stack
export function DeleteUndoButton(
  props: { thing: chrome.bookmarks.BookmarkTreeNode },
): JSX.Element {
  const savedBookmarkForUndo: chrome.bookmarks.BookmarkCreateArg = {
    parentId: props.thing.parentId,
    index: props.thing.index,
    title: props.thing.title,
    url: props.thing.url,
  };
  return (
    <div>
      <h2>
        removed item {props.thing.title}
      </h2>

      <button
        onClick={() => CRUDBookmarkFacade.createBookmark(savedBookmarkForUndo)}
      >
        undo?
      </button>
    </div>
  );
}
