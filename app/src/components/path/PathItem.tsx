import React from "react";


export function PathItem(
  props: {
    handleClick: (index: number, node: chrome.bookmarks.BookmarkTreeNode) => void;
    index: number;
    node: chrome.bookmarks.BookmarkTreeNode;
    contextMenuHandler: any;
  }
): JSX.Element {
  return (
    <div className="flex justify-start text-slate-50 m-2 border-1 border-solid hover:border-slate-400 focus:shadow hover:bg-slate-200" >
      {"/"}
      <button onClick={(v) => props.handleClick(props.index, props.node)}>
        {props.node.title}
      </button>
    </div>
  );
}
