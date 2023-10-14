import { BookmarkNode } from "../../../lib/typesFacade";

interface SiblingButtonProps {
  s: chrome.bookmarks.BookmarkTreeNode;
  node: chrome.bookmarks.BookmarkTreeNode;
  addNodeToBranch: (node: BookmarkNode) => void;
  level: number;
  closeCallback: () => void;
}

export function SiblingButton(
  { s, node, addNodeToBranch, closeCallback }: SiblingButtonProps,
) {
  return (
    <button
      style={{
        fontWeight: `${s.title === node.title ? "bold" : "normal"}`,
        // position: 'absolute'
      }}
      className=" w-10  mb-2  bg-slate-700 text-slate-50 z-70 "
      onClick={() => {
        addNodeToBranch(node);
        closeCallback();
      }}
    >
      {s.title}
    </button>
  );
}
