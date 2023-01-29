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
    // <div className="absolute top-[120px] overflow-auto ml-10 z-20">
    <div className="overflow-auto z-20 left-4 w-[250px] h-full">
      <SideSubTree
        nodes={props.tree}
        pathSetter={props.pathSetter}
        path={props.tree}
      />
    </div>
  );
}
