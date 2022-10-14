import React from "react";



export function DisplayCurrentPath(props: {
  path: chrome.bookmarks.BookmarkTreeNode[];
  setter: React.Dispatch<React.SetStateAction<chrome.bookmarks.BookmarkTreeNode[]>>;
}): JSX.Element {

  // goes backs, changes the current location, the current path
  const handleClick = (node: chrome.bookmarks.BookmarkTreeNode, index: number) => {
    const clickedNodeName = props.path.slice(0, index);
    if (index !== 0) {
      props.setter(clickedNodeName);
    }
  };

  const text: string = props.path.map((b: chrome.bookmarks.BookmarkTreeNode) => b.title).join('/');
  // creates a '>' linked horizontal list of locations, genealogy of the currrent path
  return <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
    {props.path.map((node: chrome.bookmarks.BookmarkTreeNode, index: number) => {
      return <div style={{ display: 'flex', justifyContent: 'start' }}>
        <button onClick={v => handleClick(node, index)}>
          {node.title}
        </button>
        {'>'}
      </div>;
    })}
    <button onClick={() => window.navigator.clipboard.writeText(text)}>Copy path</button>
  </div>;
}
