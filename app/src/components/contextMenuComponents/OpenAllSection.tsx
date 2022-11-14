import { getChildrenLinks, openAllChildren } from "../../utils/ifHasChildrenFolders";

export function OpenAllSection(props: { thing: chrome.bookmarks.BookmarkTreeNode }): JSX.Element {
  const childrenLinks: chrome.bookmarks.BookmarkTreeNode[] = getChildrenLinks(
    props.thing,
  );
  const hasChildrenLinks: boolean = childrenLinks.length > 0;
  return <div className="group3">
    <button onClick={e => openAllChildren(props.thing)} disabled={!hasChildrenLinks}>
      <p>open all {childrenLinks.length}</p>
    </button>
    <button onClick={e => openAllChildren(props.thing, true)} disabled={!hasChildrenLinks}>
      <p>open all {childrenLinks.length} in new window</p>
    </button>
    <button onClick={e => openAllChildren(props.thing, true, true)} disabled={!hasChildrenLinks}>
      <p>open all {childrenLinks.length} in Incognito window</p>
    </button>
  </div>
}