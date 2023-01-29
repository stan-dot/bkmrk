import React, { useState } from "react";

// todo here also siblings
export function PathItem(
  props: {
    handleClick: (
      index: number,
      node: chrome.bookmarks.BookmarkTreeNode,
    ) => void;
    index: number;
    node: chrome.bookmarks.BookmarkTreeNode;
    contextMenuHandler: any;
    siblings?: chrome.bookmarks.BookmarkTreeNode[];
  },
): JSX.Element {
  const [siblingsVisible, setSiblingsVisible] = useState(false);
  return (
    <div className="flex justify-start text-slate-50 m-1 z-20 border-1 border-solid hover:border-slate-400 focus:shadow hover:bg-slate-400">
      <button onClick={(v) => setSiblingsVisible(true)}
        onBlur={e => setSiblingsVisible(false)}
      >
        {"/"}
      </button>
      {"  "}
      <div
        id="siblings"
        className="bg-slate-800 text-slate-50 "
        style={{
          visibility: `${siblingsVisible ? "visible" : "hidden"}`,
          width: `${siblingsVisible ? "40" : "0"}`,
        }}
      >
        {props.siblings
          ? props.siblings.map((s) => {
            return (
              <p
                style={{
                  fontWeight: `${s.title === props.node.title ? "bold" : "normal"
                    }`,
                }}
              >
                {s.title}
              </p>
            );
          })
          : props.node.title}
      </div>
      <button onClick={(v) => props.handleClick(props.index, props.node)}>
        {props.node.title}
      </button>
    </div>
  );
}
