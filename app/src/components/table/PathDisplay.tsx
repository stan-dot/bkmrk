import React from "react";
import { PathItem } from "./PathItem";

const pathDisplayStyle: React.CSSProperties = {
  position: "fixed",
  display: "flex",
  top: "120px",
  left: "200px",
  border: "2px solid",
  justifyContent: "space-between",
  borderColor: "#FF0000",
};

export function PathDisplay(props: {
  path: chrome.bookmarks.BookmarkTreeNode[];
  pathChangeHandler: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
}): JSX.Element {

  /**
   * goes backs, changes the current location, the current path
   */
  const handleClick = (
    index: number,
  ): void => {
    /**
     * cases when want to change to the root or to the last(current) element
     */
    if (index !== 0 && index !== props.path.length - 1) {
      const newPath: chrome.bookmarks.BookmarkTreeNode[] = props.path.slice(
        0,
        index,
      );
      console.log('new path: ', newPath);
      props.pathChangeHandler(newPath);
    }
  };

  const upButtonHandler = () => {
    const newPath: chrome.bookmarks.BookmarkTreeNode[] = props.path.slice(
      0,
      props.path.length - 1,
    );
    console.log('button up, new path: ', newPath);
    props.pathChangeHandler(newPath);
  }

  const handleContextMenuClick = (node: chrome.bookmarks.BookmarkTreeNode): void => {
    console.log('context menu click detected on the PathDisplay element');
  };


  return <>
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
    </div>
    <div id="buttonArea" style={{
      position: "fixed",
      display: "flex",
      top: "120px",
      left: "200px",
    }}>
      <button disabled={props.path.length < 2} onClick={upButtonHandler}>
        [..]
      </button>
    </div>
  </>
}
