import React, { useState } from "react";
import { SiblingBox } from "./SiblingBox";

export function PathItem(
  props: {
    handleClick: (
      index: number,
      node: chrome.bookmarks.BookmarkTreeNode,
    ) => void;
    index: number;
    node: chrome.bookmarks.BookmarkTreeNode;
    contextMenuHandler: (
      e: React.MouseEvent<HTMLDivElement>,
      node: chrome.bookmarks.BookmarkTreeNode,
    ) => void;
    siblings?: chrome.bookmarks.BookmarkTreeNode[];
  },
): JSX.Element {
  const [siblingsVisible, setSiblingsVisible] = useState(false);

  return (
    <div
      className="flex justify-start h-12 text-slate-50 m-1 z-20 rounded-sm border-1 border-solid  focus:shadow "
      onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
        props.contextMenuHandler(e, props.node)}
    >
      <button
        onClick={(v) => setSiblingsVisible(true)}
        onBlur={(e) => setSiblingsVisible(false)}
        className={"ml-2 mr-1 text-md h-fit hover:bg-slate-400 rounded-sm"}
      >
        {"/"}
      </button>
      <SiblingBox siblingsVisible={siblingsVisible} node={props.node} />
      <button onClick={(v) => props.handleClick(props.index, props.node)}>
        {props.node.title}
      </button>
    </div>
  );
}
