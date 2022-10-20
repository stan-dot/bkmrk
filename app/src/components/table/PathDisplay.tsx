import React from "react";
import { PathItem } from "./PathItem";

const pathDisplayStyle: React.CSSProperties = {
  position: "fixed",
  display: "flex",
  justifyContent: "space-between",
  top: "120px",
  left: "200px",
  border: "2px solid",
  borderColor: "#FF0000",
};

export function PathDisplay(props: {
  path: chrome.bookmarks.BookmarkTreeNode[];
  globalPathChanger: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
}): JSX.Element {

  /**
   * goes backs, changes the current location, the current path
   */
  const handleClick = (
    index: number,
  ): void => {
    const slicedPath: chrome.bookmarks.BookmarkTreeNode[] = props.path.slice(
      0,
      index,
    );
    /**
     * cases when want to change to the root or to the last(current) element
     */
    if (index !== 0 && index !== props.path.length - 1) {
      const newPath: chrome.bookmarks.BookmarkTreeNode[] = slicedPath.splice(
        0,
        index,
      );
      props.globalPathChanger(newPath);
    }
  };

  const handleContextMenuClick = (node: chrome.bookmarks.BookmarkTreeNode): void => {
  };


  return (
    <div style={pathDisplayStyle}>
      <div style={{ display: "flex", justifyContent: "start" }}>
        {
          props.path.map((n, i) => (
            <PathItem
              handleClick={handleClick}
              index={i}
              node={n}
              contextMenuHandler={handleContextMenuClick}
            />
          ))
        }
      </div>
      <button onClick={() => handleClick(props.path.length - 1)}>
        [..]
      </button>
    </div>
  );
}
