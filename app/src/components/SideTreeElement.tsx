import { useState } from "react";
import { ContextMenu } from "./ContextMenu";
import { ifHasChildrenFolders } from "./ifHasChildrenFolders";

/**
 * for side displaying FOLDERS ONLY
 * need to display with some offset to the fight
 * todo maybe add display children prop
 * todo impossible to delete, rename if it's a stuck variant
 * @param props
 * @returns
 */
export function SideTreeElement(props: { thing: chrome.bookmarks.BookmarkTreeNode; }): JSX.Element {
  const [unrolled, setUnrolled] = useState(false);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const hasChildrenFolders: boolean = ifHasChildrenFolders(props.thing);
  const handleClick = () => {
    console.log('should change the path to this dir');
    // todo integrate via some callback
    // todo on mouse hover handler
  };

  const handleContextMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    console.log('clicked the side button');
    console.log(hasChildrenFolders, contextMenuOpen, unrolled);
  };
  const WIDTH_OF_NODE = 120;

  return <div style={{ display: 'flex', width: WIDTH_OF_NODE }} id={`${props.thing.id}-side-tree-row`}>
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
    <div style={{ width: '100%' }}>
      <button onClick={e => handleClick()} onContextMenu={e => handleContextMenu} style={{ width: '100%', textAlign: 'left' }}>
        <p>{props.thing.title}</p>
      </button>
    </div>
    {contextMenuOpen
      ??
      <ContextMenu thing={props.thing} />}
  </div>
}


