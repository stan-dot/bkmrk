import React, { useEffect, useState } from "react";

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

type SiblingBoxTypes = {
  siblingsVisible: boolean;
  node: chrome.bookmarks.BookmarkTreeNode;
};

function SiblingBox(
  { siblingsVisible, node }: SiblingBoxTypes,
) {
  const siblings = useSiblings(node);
  console.log('siblings of :', node, " : ,", siblings);
  return (
    <div
      id="siblings"
      className="bg-slate-700 z-20 w-40 h-40 overflow-visible mb-2 text-slate-50 "
      style={{
        visibility: `${siblingsVisible ? "visible" : "hidden"}`,
        width: `${siblingsVisible ? 40 : 0}`,
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
    if (node.parentId === undefined) return;
    chrome.bookmarks.getChildren(node.parentId).then(
      (children: chrome.bookmarks.BookmarkTreeNode[]) => {
        setSiblings(children);
      },
    );
  }, [node.parentId]);

  return siblings;
}
