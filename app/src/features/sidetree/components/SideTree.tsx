import { useState } from "react";
import { isAFolder } from "../../../utils/ifHasChildrenFolders";
import { usePath } from "../../path/PathContext";
import { BookmarkNode } from "../../../lib/typesFacade";
import { SideTreeElement } from "./SideTreeElement";

export function SideTree(props: {
  nodes: BookmarkNode[];
  setRowsCallback: (nodes: BookmarkNode[]) => void;
}): JSX.Element {
  const path = usePath();
  const [expandedNodeIds, setExpandedNodeIds] = useState<string[]>([]);
  if (!props.nodes) {
    return (
      <div id="empty-sidetree">
        <h2>No bookmark nodes</h2>
      </div>
    );
  }
  return (
    <div
      id="sidetree-container"
      className="overflow-auto z-20 left-4 w-[250px] h-full mb-40"
    >
      <div id="sidetree" className="relative l-10 ml-5 p-1 ">
        {props.nodes.filter(isAFolder).map((n) => {
          const unrolled: boolean = path.items.includes(n) ||
            expandedNodeIds.includes(n.id);
          const unrollCallback = (
            n: chrome.bookmarks.BookmarkTreeNode,
          ) => {
            setExpandedNodeIds((prev) => {
              return [...prev, n.id];
            });
          };
          return (
            <SideTreeElement
              thing={n}
              initialUnrolled={unrolled}
              setRowsCallback={props.setRowsCallback}
              unrollCallback={unrollCallback}
            />
          );
        })}
      </div>
    </div>
  );
}