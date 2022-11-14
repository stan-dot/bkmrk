import React from "react";
import { SideSubTree } from "./SideSubTree";

const rootSideTreeStyles: React.CSSProperties = {
  position: "fixed",
  left: "10px",
  top: "130px",
  overflow: 'scroll',
  height: ' 600px',
  minWidth: '215px'
};

/**
 * todo use this link for horizontal scrolling, also vertical scrolling
 * todo also resizable
 * https://codesandbox.io/s/lpjol1opmq
 * @param props
 * @returns
 */
export function SideTree(
  props: {
    tree: chrome.bookmarks.BookmarkTreeNode[];
    pathSetter: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
    path: chrome.bookmarks.BookmarkTreeNode[];
  },
): JSX.Element {
  return (

    <SideSubTree
      nodes={props.tree}
      pathSetter={props.pathSetter}
      path={props.tree}
      styles={rootSideTreeStyles}
    />
  );
}
