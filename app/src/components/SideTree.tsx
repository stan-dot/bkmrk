import React, { useState } from "react";

/**
 * todo use this link
 * https://codesandbox.io/s/lpjol1opmq
 * @param props
 * @returns
 */
export function SideTree(props: { tree: chrome.bookmarks.BookmarkTreeNode[]; }): JSX.Element {
  /**
   * for each node there is 1 state variable - open /close
   */
  return <>
    <p>side panel with the tree</p>
    <p>scroll indicator on the side</p>
    <div>
      <h3>test one name</h3>

    </div>
  </>;
}

function isAFolder(item: chrome.bookmarks.BookmarkTreeNode): boolean {
  return !item.url;

}
function ifHasChildrenFolders(item: chrome.bookmarks.BookmarkTreeNode): boolean {
  if (!item.children) {
    return false;
  }
  const someThatFills: chrome.bookmarks.BookmarkTreeNode | undefined = item.children.find(v => isAFolder(v));
  return someThatFills ? true : false;
}

function getChildrenLinks(item: chrome.bookmarks.BookmarkTreeNode): chrome.bookmarks.BookmarkTreeNode[] {
  if (!item.children) {
    return [];
  }
  return item.children.filter(v => !isAFolder(v));
}

/**
 * this doesn't assume that children are present, but if no children, it shouldn't show as active when only folders
 * @param parent
 * @param newWindow
 * @param incognito
 */

async function openAllChildren(parent: chrome.bookmarks.BookmarkTreeNode, newWindow?: boolean, incognito?: boolean): Promise<void> {
  const children: chrome.bookmarks.BookmarkTreeNode[] | undefined = parent.children;
  if (!children)
    return;

  const standard: boolean = (!newWindow && !incognito);
  const currentWindow: chrome.windows.Window = await chrome.windows.getCurrent();
  // todo why is this possibly undefined?
  let finalId: number = currentWindow.id!;
  if (!standard) {
    const createData: chrome.windows.CreateData = { 'incognito': incognito ?? false };
    const openedNewWindow: chrome.windows.Window = await chrome.windows.create(createData);
    finalId = openedNewWindow.id!;
  }

  const propertiesGenerator: (url: string) => chrome.tabs.CreateProperties = (url: string) => {
    const props: chrome.tabs.CreateProperties = { windowId: finalId, url: url };
    return props;
  };

  children.forEach((b: chrome.bookmarks.BookmarkTreeNode) => {
    if (!isAFolder(b)) {
      chrome.tabs.create(propertiesGenerator(b.url!));
    }
  });
}

/**
 * for side displaying FOLDERS ONLY
 * need to display with some offset to the fight
 * todo maybe add display children prop
 * @param props
 * @returns
 */
function SideTreeElement(props: { thing: chrome.bookmarks.BookmarkTreeNode; }): JSX.Element {
  const [unrolled, setUnrolled] = useState(false);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const hasChildrenFolders: boolean = ifHasChildrenFolders(props.thing);
  const childrenLinks: chrome.bookmarks.BookmarkTreeNode[] = getChildrenLinks(props.thing);
  const hasChildrenLinks: boolean = childrenLinks.length > 0;
  const handleClick = () => {
    console.log('should change the path to this dir');
    // todo integrate via some callback
  };

  /**
   * on the context menu
   * - rename - edit bookmark fucntion
   * - delete - delete bookmark - just fetch the api
   * - cut - need to have the clipboard integrated tbh, but only link changes location
   * - copy - like cut in many ways
   * - paste - using the clipboard
   * - open all (number) - the simplest function
   * - open all (number) in new window
   * - open all (number) in Incognito window
   */
  const handleContextMenu = () => {
  };

  return <div style={{ 'display': 'flex' }} id={`${props.thing.id}-side-tree-row`}>
    {hasChildrenFolders ?? <div id={`${props.thing.id}-arrow`}>
      {unrolled
        ?
        <button onClick={e => setUnrolled(false)}>
          <p>arrow down svg</p>
        </button>
        :
        <button onClick={e => setUnrolled(true)}>
          <p>arrow right svg</p>
        </button>}
    </div>}
    <div>
      <button onClick={e => handleClick} onContextMenu={e => handleContextMenu}>
        <p>{props.thing.title}</p>
      </button>
    </div>
    {contextMenuOpen
      ??
      <div>
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
      </div>}
  </div>;

}
