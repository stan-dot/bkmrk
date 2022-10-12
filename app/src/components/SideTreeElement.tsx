import React, { useState } from "react";
import { ifHasChildrenFolders, getChildrenLinks, openAllChildren } from "./SideTree";

/**
 * for side displaying FOLDERS ONLY
 * need to display with some offset to the fight
 * todo maybe add display children prop
 * @param props
 * @returns
 */
export function SideTreeElement(props: { thing: chrome.bookmarks.BookmarkTreeNode; }): JSX.Element {
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
