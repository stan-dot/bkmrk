import React, { useEffect, useState } from "react";
import { useHistoryDispatch } from "../../contexts/HistoryContext";
import { usePathDispatch } from "../../contexts/PathContext";

type SiblingBoxTypes = {
  siblingsVisible: boolean;
  node: chrome.bookmarks.BookmarkTreeNode;
  closeCallback: () => void;
  level: number;
};

export function SiblingBox(
  { siblingsVisible, node, closeCallback, level }: SiblingBoxTypes,
) {
  const siblings = useSiblings(node);
  // console.debug("siblings of :", node, " : ,", siblings);
  const historyDispatch = useHistoryDispatch();
  const pathDispatch = usePathDispatch();
  return (
    <>
      {siblingsVisible &&
        (
          <div
            id="siblings"
            // style={{
            //   visibility: `${siblingsVisible ? "visible" : "hidden"}`,
            //   // width: `${siblingsVisible ? 40 : 0}`,
            //   width: 40,
            //   display: "absolute",
            // }}
            // className="bg-slate-700 z-20 w-40 h-40 overflow-visible mb-2 text-slate-50 "
            // className=" relative  w-40 h-40 mb-2  bg-slate-700 text-slate-50 z-50 "
            className="absolute w-40 h-40 mb-2 flex flex-col  bg-slate-700 text-slate-50 z-50 "
          >
            {siblings.map((s) => {
              return (
                <button
                  style={{
                    fontWeight: `${s.title === node.title ? "bold" : "normal"}`,
                    // position: 'absolute'
                  }}
                  className=" w-10  mb-2  bg-slate-700 text-slate-50 z-70 "
                  onClick={() => {
                    pathDispatch({
                      type: "branch",
                      nodes: [s],
                      changeLevelsUp: level,
                    });
                    historyDispatch({
                      type: "add",
                      nodeId: s.id,
                    });
                    closeCallback();
                  }}
                >
                  {s.title}
                </button>
              );
            })}
          </div>
        )}
    </>
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
