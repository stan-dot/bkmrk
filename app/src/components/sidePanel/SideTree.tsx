import React from "react";
import { SideSubTree } from "./SideSubTree";

export function SideTree(
  props: {
    tree: chrome.bookmarks.BookmarkTreeNode[];
    dataCallback: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
  },
): JSX.Element {
  return (
    <div className="overflow-auto z-20 left-4 w-[250px] h-full mb-40">
      <SideSubTree
        nodes={props.tree}
        setRowsCallback={props.dataCallback}
      />
    </div>
  );
}
