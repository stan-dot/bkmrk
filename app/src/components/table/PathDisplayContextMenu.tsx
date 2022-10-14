import { getChildrenLinks, openAllChildren } from "../../functions/ifHasChildrenFolders";

export function PathDisplayContextMenu(props: { thing: chrome.bookmarks.BookmarkTreeNode, position: number[] }): JSX.Element {
  const childrenLinks: chrome.bookmarks.BookmarkTreeNode[] = getChildrenLinks(props.thing);
  const hasChildrenLinks: boolean = childrenLinks.length > 0;
  return <div id="tableContextMenu" className="contextMenu" style={{
    position: 'absolute',
    left: `${props.position[0]}px`,
    right: `${props.position[1]}px`,

  }}>
    <div className="group1">
      <p>rename button</p>
      <p>delete button</p>
    </div>
    <div className="group2">
      <p>copy path</p>
      <p>paste buton</p>

    </div>
    <div className="group3">
      <button onClick={e => openAllChildren(props.thing)} disabled={!hasChildrenLinks}>
        <p>open all {childrenLinks.length}</p>
      </button>
      <button onClick={e => openAllChildren(props.thing, true)} disabled={!hasChildrenLinks}>
        <p>open all {childrenLinks.length} in new window</p>
      </button>
      <button onClick={e => openAllChildren(props.thing, true, true)} disabled={!hasChildrenLinks}>
        <p>open all {childrenLinks.length} in Incognito winow</p>
      </button>

    </div>
  </div>;
}
