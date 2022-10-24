import { getChildrenLinks, openAllChildren } from "../../functions/ifHasChildrenFolders";
import { getPath } from "../getPath";
import { stringifyPath } from "./stringifyPath";

export function PathDisplayContextMenu(props: { thing: chrome.bookmarks.BookmarkTreeNode, position: number[] }): JSX.Element {
  const childrenLinks: chrome.bookmarks.BookmarkTreeNode[] = getChildrenLinks(props.thing);
  const hasChildrenLinks: boolean = childrenLinks.length > 0;
  const handleCopyOption = () => {
    getPath(props.thing).then(path => {
      const text: string = stringifyPath(path);
      window.navigator.clipboard.writeText(text);
      // todo some sweet alert to notify it's copied
    })
  };

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
    <div className="group4">
      <button onClick={e => handleCopyOption()}>
        Copy path
      </button>
    </div>
  </div>;
}
