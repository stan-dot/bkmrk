import { useState } from "react";

export function PathItem(
  props: {
    handleClick: (
      index: number,
      node: chrome.bookmarks.BookmarkTreeNode,
    ) => void;
    index: number;
    node: chrome.bookmarks.BookmarkTreeNode;
    contextMenuHandler: React.MouseEventHandler<HTMLDivElement>;
    siblings?: chrome.bookmarks.BookmarkTreeNode[];
  },
): JSX.Element {
  const [siblingsVisible, setSiblingsVisible] = useState(false);
  return (
    <div
      className="flex justify-start h-12 text-slate-50 m-1 z-20 rounded-sm border-1 border-solid  focus:shadow "
      onContextMenu={props.contextMenuHandler}
    >
      <button
        // onClick={(v) => setSiblingsVisible(true)}
        onBlur={e => setSiblingsVisible(false)}
        className={"ml-2 mr-1 text-md h-fit hover:bg-slate-400 rounded-sm"}
      >
        {"/"}
      </button>
      <div
        id="siblings"
        className="bg-slate-700 z-20 h-40 overflow-visible min-h-fit mb-2 text-slate-50 "
        style={{
          visibility: `${siblingsVisible ? "visible" : "hidden"}`,
          width: `${siblingsVisible ? 40 : 0}`,
        }}
      >
        {/* {props.siblings
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
          : props.node.title} */}
      </div>
      <button onClick={(v) => props.handleClick(props.index, props.node)}
      >
        {props.node.title}
      </button>
    </div>
  );
}
