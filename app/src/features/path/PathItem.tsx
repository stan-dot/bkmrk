import React, { useState } from "react";
import { SiblingBox } from "./SiblingBox";

type PathItemProps = {
  handleClick: (index: number, node: BookmarkNode) => void;
  index: number;
  node: BookmarkNode;
  contextMenuHandler: (
    e: React.MouseEvent<HTMLDivElement>,
    node: BookmarkNode,
  ) => void;
  siblings?: BookmarkNode[];
};

export function PathItem(
  { handleClick, index, node, contextMenuHandler, siblings }: PathItemProps,
): JSX.Element {
  const [siblingsVisible, setSiblingsVisible] = useState<boolean>(false);

  return (
    <div
      className="flex justify-start h-12 text-slate-50 m-1 z-20 rounded-sm border-1 border-solid focus:shadow "
      onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
        contextMenuHandler(e, node)}
    >
      <div className="flex flex-col">
        <button
          onClick={(v) => setSiblingsVisible(true)}
          // onBlur={(e) => setSiblingsVisible(false)}
          className={"ml-2 mr-1 text-lg p-2 h-fit hover:bg-slate-400 rounded-sm"}
          disabled
        >
          {"/"}
        </button>
        {
          /* <SiblingBox
          siblingsVisible={siblingsVisible}
          node={node}
          closeCallback={() => setSiblingsVisible(false)}
          level={index}
        /> */
        }
      </div>
      <button onClick={(v) => handleClick(index, node)}>
        {node.title}
      </button>
    </div>
  );
}
