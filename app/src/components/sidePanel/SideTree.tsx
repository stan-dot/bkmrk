import React from "react";
import { SideSubTree } from "./SideSubTree";

export function SideTree(
  props: {
    tree: chrome.bookmarks.BookmarkTreeNode[];
    pathSetter: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
    path: chrome.bookmarks.BookmarkTreeNode[];
  },
): JSX.Element {
  return (
    <div className="fixed left-10 t-120 over h-2/3 min-w-fit">
      <SideSubTree
        nodes={props.tree}
        pathSetter={props.pathSetter}
        path={props.tree}
      />
    </div>
  );
}
