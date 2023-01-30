import { getChildrenLinks, openAllChildren } from "../../utils/ifHasChildrenFolders";
import { contextMenuButtonClass } from "./contextMenuButtonClass";

export function OpenAllSection(props: { thing: chrome.bookmarks.BookmarkTreeNode }): JSX.Element {
  const childrenLinks: chrome.bookmarks.BookmarkTreeNode[] = getChildrenLinks(
    props.thing,
  );
  const hasChildrenLinks: boolean = childrenLinks.length > 0;
  return <div className="group3  flex flex-col">
    <button onClick={e => openAllChildren(props.thing)} disabled={!hasChildrenLinks} className={contextMenuButtonClass}>
      <p>Open all &#40;{childrenLinks.length}&#41;</p>
    </button>
    <button onClick={e => openAllChildren(props.thing, { newWindow: true, incognito: false })} disabled={!hasChildrenLinks} className={contextMenuButtonClass}>
      <p>Open all &#40;{childrenLinks.length}&#41; in new window</p>
    </button>
    <button onClick={e => openAllChildren(props.thing, { newWindow: true, incognito: true })} disabled={!hasChildrenLinks} className={contextMenuButtonClass}>
      <p>Open all &#40;{childrenLinks.length}&#41; in Incognito window</p>
    </button>
    <button onClick={e => {
      const index: number = Math.floor(Math.random() * childrenLinks.length);
      chrome.tabs.create({ url: childrenLinks[index].url });

    }} disabled={!hasChildrenLinks} className={contextMenuButtonClass}>
      <p>Open 1 random from &#40;{childrenLinks.length}&#41; selected</p>
    </button>
  </div>
}
