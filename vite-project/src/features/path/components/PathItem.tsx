import React, { useState } from "react";
import { BookmarkNode } from "../../../lib/typesFacade";
import { SiblingBox } from "./SiblingBox";
import useContextMenu from "../../../test-contextmenu/hooks/useContextMenu";
import { PathDisplayContextMenu } from "./PathDisplayContextMenu";

type PathItemProps = {
  handleClick: (index: number, node: BookmarkNode) => void;
  index: number;
  node: BookmarkNode;
  siblings?: BookmarkNode[];
  openBranch: (node: BookmarkNode) => void;
};

export function PathItem(
  { handleClick, index, node, siblings, openBranch }: PathItemProps,
): JSX.Element {
  const [siblingsVisible, setSiblingsVisible] = useState<boolean>(false);

  const { clicked, setClicked, points, setPoints } = useContextMenu();
  return (
    <>
      <div
        className="flex justify-start h-12 text-slate-50 m-1 z-20 rounded-sm border-1 border-solid focus:shadow "
        onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
          setPoints({ x: e.clientX, y: e.clientY });
          setClicked(true);
          console.log(e);
        }}
      >
        <div className="flex flex-col">
          <button
            onClick={(v) => setSiblingsVisible(true)}
            className={"ml-2 mr-1 text-lg p-2 h-fit hover:bg-slate-400 rounded-sm"}
            disabled
          >
            {"/"}
          </button>
          <SiblingBox
            siblingsVisible={siblingsVisible}
            node={node}
            closeCallback={() => setSiblingsVisible(false)}
            level={index}
            openBranch={openBranch}
          />
        </div>
        <button onClick={(v) => handleClick(index, node)}>
          {node.title}
        </button>
      </div>
      {clicked && (
        <PathDisplayContextMenu
          thing={node}
          points={points}
          close={() => setClicked(false)}
        />
      )}
    </>
  );
}
