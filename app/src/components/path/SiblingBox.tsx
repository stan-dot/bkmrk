import React, { useEffect, useState } from "react";

type SiblingBoxTypes = {
  siblingsVisible: boolean;
  node: chrome.bookmarks.BookmarkTreeNode;
};

export function SiblingBox(
  { siblingsVisible, node }: SiblingBoxTypes,
) {
  const siblings = useSiblings(node);
  console.log("siblings of :", node, " : ,", siblings);
  return (
    <div
      id="siblings"
      className="bg-slate-700 z-20 w-40 h-40 overflow-visible mb-2 text-slate-50 "
      style={{
        visibility: `${siblingsVisible ? "visible" : "hidden"}`,
        // width: `${siblingsVisible ? 40 : 0}`,
        width: 40,
      }}
    >
      {siblings.map((s) => {
        // todo make this a button tbh
        return (
          <p
            style={{
              fontWeight: `${s.title === node.title ? "bold" : "normal"}`,
            }}
          >
            {s.title}
          </p>
        );
      })}
    </div>
  );
}

function useSiblings(node: chrome.bookmarks.BookmarkTreeNode) {
  const [siblings, setSiblings] = useState<chrome.bookmarks.BookmarkTreeNode[]>(
    [],
  );

  useEffect(() => {
    // todo this might give error for the root
    if (node.parentId === undefined) {
      return;
    }
    chrome.bookmarks.getChildren(node.parentId).then(
      (children: chrome.bookmarks.BookmarkTreeNode[]) => {
        setSiblings(children);
      },
    );
  }, [node.parentId]);

  return siblings;
}
