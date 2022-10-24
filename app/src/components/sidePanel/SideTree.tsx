import React from "react";
import { SideSubTree } from "./SideSubTree";

const rootSideTreeStyles: React.CSSProperties = {
  position: "absolute",
  left: "20px",
  top:"120px",
  overflow: 'scroll',
  overflowX: 'scroll',
  overflowY:'scroll',
  minWidth: '200px'
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
    <div
      id="vericalHoriontalScrollArea"
      style={rootSideTreeStyles}
      className="dev-test-outline"
    >
      <SideSubTree
        nodes={props.tree}
        pathSetter={props.pathSetter}
        path={props.tree}
      />
    </div>
  );
}
