import { useState } from "react";
import { usePath } from "../../../contexts/PathContext";
import { isAFolder } from "../../../utils/ifHasChildrenFolders";
import { SideTreeElement } from "./SideTreeElement";

export function SideTree(props: {
  nodes: chrome.bookmarks.BookmarkTreeNode[];
  setRowsCallback: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
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
    <div id="sidetree" className="relative l-10 ml-5 p-1 ">
      {props.nodes.filter(isAFolder).map((n) => {
        const unrolled: boolean = path.items.includes(n) ||
          expandedNodeIds.includes(n.id);
        return (
          <SideTreeElement
            thing={n}
            unrolled={unrolled}
            setRowsCallback={props.setRowsCallback}
            unrollCallback={(n) => {
              setExpandedNodeIds((prev) => {
                return [...prev, n.id];
              });
            }}
          />
        );
      })}
    </div>
  );
}
