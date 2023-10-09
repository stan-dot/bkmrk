import React from "react";
import { PathAction } from "../PathContext";

interface SiblingButtonProps {
  s: chrome.bookmarks.BookmarkTreeNode;
  node: chrome.bookmarks.BookmarkTreeNode;
  pathDispatch: React.Dispatch<PathAction>;
  level: number;
  closeCallback: () => void;
}

export function SiblingButton(
  { s, node, pathDispatch, level, closeCallback }: SiblingButtonProps,
) {
  return (
    <button
      style={{
        fontWeight: `${s.title === node.title ? "bold" : "normal"}`,
        // position: 'absolute'
      }}
      className=" w-10  mb-2  bg-slate-700 text-slate-50 z-70 "
      onClick={() => {
        pathDispatch({
          type: "branch",
          nodes: [s],
          changeLevelsUp: level,
        });
        closeCallback();
      }}
    >
      {s.title}
    </button>
  );
}
