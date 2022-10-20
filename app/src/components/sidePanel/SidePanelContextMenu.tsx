import {
  getChildrenLinks,
  openAllChildren,
} from "../../functions/ifHasChildrenFolders";

function getStyles(position: number[]): React.CSSProperties {
  return {
    position: "absolute",
    left: `${position[0]}px`,
    right: `${position[1]}px`,
    zIndex: 5,
    fontSize: 10,
    border: "1px solid",
    borderColor: "#FF0000",
    background: "solid",
    backgroundColor: "coral",
    width: 'fit-content'
  };
}

export function SidePanelContextMenu(
  props: { thing: chrome.bookmarks.BookmarkTreeNode; position: number[] },
): JSX.Element {
  const childrenLinks: chrome.bookmarks.BookmarkTreeNode[] = getChildrenLinks(
    props.thing,
  );
  const hasChildrenLinks: boolean = childrenLinks.length > 0;
  console.log("rendering side panel context menu for", props.thing.title);

  const styles = getStyles(props.position);
  return (
    <div id="sidePanelContextMenu" className="contextMenu" style={styles}>
      <div className="group1">
        <p>rename button</p>
        <p>delete button</p>
      </div>
      <div className="group2">
        <p>cut button</p>
        <p>copy buton</p>
        <p>paste buton</p>
      </div>
      <div className="group3">
        <button
          onClick={(e) => openAllChildren(props.thing)}
          disabled={!hasChildrenLinks}
        >
          <p>open all {childrenLinks.length}</p>
        </button>
        <button
          onClick={(e) => openAllChildren(props.thing, true)}
          disabled={!hasChildrenLinks}
        >
          <p>open all {childrenLinks.length} in new window</p>
        </button>
        <button
          onClick={(e) => openAllChildren(props.thing, true, true)}
          disabled={!hasChildrenLinks}
        >
          <p>open all {childrenLinks.length} in Incognito winow</p>
        </button>
      </div>
    </div>
  );
}
