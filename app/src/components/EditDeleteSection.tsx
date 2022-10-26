export function EditDeleteSection(props: { thing: chrome.bookmarks.BookmarkTreeNode; protected: boolean }) {
  return <div className="group1">
    <button
      disabled={props.protected}
      onClick={(e) => {
        const update: chrome.bookmarks.BookmarkChangesArg = {
          title: `CHANGED ${props.thing.title}`,
          url: props.thing.url,
        };
        chrome.bookmarks.update(props.thing.id, update);
      }}
    >
      <p>rename button</p>
    </button>
    <button
      disabled={props.protected}
      onClick={(e) => {
        chrome.bookmarks.remove(props.thing.id);
      }}

    >
      <p>delete</p>
    </button>
  </div>;
}
