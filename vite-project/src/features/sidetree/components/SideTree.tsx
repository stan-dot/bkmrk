import { useState } from "react";
import { useBookmarks } from "../../../lib/GlobalReducer";
import { BookmarkNode } from "../../../lib/typesFacade";
import { isAFolder } from "../../../utils/ifHasChildrenFolders";
import { SideTreeElement } from "./SideTreeElement";

export function SideTree(): JSX.Element {
  const [expandedNodeIds, setExpandedNodeIds] = useState<string[]>([]);

  const { state, dispatch } = useBookmarks();
  const { tree, path } = state;

  const fullPathChange = (newPath: BookmarkNode[]) => {
    dispatch({ type: "SET_PATH", payload: newPath });
  };

  if (!tree) {
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
        {tree.filter(isAFolder).map((n) => {
          const unrolled: boolean = path.includes(n) ||
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
              unrollCallback={unrollCallback}
              path={path}
              changePath={fullPathChange}
            />
          );
        })}
      </div>
    </div>
  );
}
