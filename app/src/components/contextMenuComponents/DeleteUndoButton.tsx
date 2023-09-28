export function DeleteUndoButton(
  props: { thing: chrome.bookmarks.BookmarkTreeNode },
): JSX.Element {
  const saveObjectForUndo: chrome.bookmarks.BookmarkCreateArg = {
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

      <button onClick={() => chrome.bookmarks.create(saveObjectForUndo)}>
        undo?
      </button>
    </div>
  );
}
