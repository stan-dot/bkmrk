import React, { useState } from "react";
import { PathDisplayContextMenu } from "./PathDisplayContextMenu";



export function PathDisplay(props: {
  path: chrome.bookmarks.BookmarkTreeNode[];
  setter: (nodes: chrome.bookmarks.BookmarkTreeNode[], index: number) => void;
}): JSX.Element {
  const [position, setPosition] = useState([0, 0]);
  const [contextMenuVisibility, setContextMenuVisibility] = useState(false);

  // goes backs, changes the current location, the current path
  const handleClick = (node: chrome.bookmarks.BookmarkTreeNode, index: number) => {
    const clickedNodeName = props.path.slice(0, index);
    console.log(clickedNodeName);
    if (index !== props.path.length - 1) {
      props.setter(clickedNodeName, index);
    }
  };

  const handleContextMenuClick = () => {

  }

  // <button onClick={() => window.navigator.clipboard.writeText(text)}>Copy path</button>
  const text: string = props.path.map((b: chrome.bookmarks.BookmarkTreeNode) => b.title).join('/');
  // creates a '>' linked horizontal list of locations, genealogy of the currrent path
  return <div style={{ position: 'fixed', display: 'flex', justifyContent: 'space-between', top: '120px', left: '200px' }}>
    {/* {contextMenuVisibility ?? <PathDisplayContextMenu thing={ } position={position} />} */}
    <div style={{ display: 'flex', justifyContent: 'start' }}>
      {props.path.map((node: chrome.bookmarks.BookmarkTreeNode, index: number) => {
        return <div style={{ display: 'flex', justifyContent: 'start' }}>
          {'/'}
          <button onClick={v => handleClick(node, index)}>
            {node.title}
          </button>
        </div>;
      })}
    </div>
    <button onClick={() => props.setter(props.path, props.path.length - 1)}>[..]</button>
  </div>;
}
