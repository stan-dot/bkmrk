import React, { useState } from "react";
import CRUDBookmarkFacade from "../../../lib/CRUDBookmarkFacade";
import { BookmarkNode } from "../../../lib/typesFacade";
import { PathItem } from "./PathItem";
import { useBookmarks } from "../../../lib/GlobalReducer";

interface PathDisplayProps {
}

export function PathDisplay(): JSX.Element {
  const { state, dispatch } = useBookmarks();
  const path = state.path;
  const initLastIteraction = path[path.length - 1];
  const [lastInteracted, setLastInteracted] = useState<BookmarkNode>(
    initLastIteraction,
  );

  const onPasteHandler = (e: React.ClipboardEvent<HTMLDivElement>) => {
    if (path && path.length > 0) {
      const parent = path.at(-1);
      if (parent) {
        const parentId = parent.id;
        e.preventDefault();
        console.debug(e);
        CRUDBookmarkFacade.createBookmarksFromPaste(e, parentId);
      }
    }
  };

  const contextClickHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    node: BookmarkNode,
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    // todo add the new context menu trick
  };

  const handleClick = (
    index: number,
    node: BookmarkNode,
  ) => {
    setLastInteracted(node);
    if (index !== 0 && index !== path.length - 1) {
      const newPath: BookmarkNode[] = path.slice(0, index);
      dispatch({ type: "SET_PATH", payload: newPath });
    }
  };

  const upButtonHandler = () => {
    const newPath: BookmarkNode[] = path.slice(
      0,
      path.length - 1,
    );
    dispatch({ type: "SET_PATH", payload: newPath });
  };

  const openBranchOnSibling = (node: BookmarkNode) => {
    const newPath = [...path];
    newPath[newPath.length - 1] = node;
    dispatch({ type: "SET_PATH", payload: newPath });
  };

  return (
    <div
      className="fixed w-full h-12 top-16 bg-slate-700 flex-col justify-evenly"
      onPaste={onPasteHandler}
    >
      <div
        id="path-display"
        className="flex fixed h-12 justify-start bg-slate-700 ml-4 "
      >
        <div id="buttonArea" className="relative bg-slate-600 mr-4 h-12">
          <button
            disabled={path.length < 2}
            onClick={upButtonHandler}
            className={"text-l text-slate-50 hover:bg-slate-300  p-2 m-0 hover:border-slate-400"}
          >
            [..]
          </button>
        </div>
        <div className="justify-between flex border-2 ">
          {path.map((n, i) => {
            return (
              <PathItem
                handleClick={handleClick}
                index={i}
                node={n}
                key={n.id}
                contextMenuHandler={contextClickHandler}
                openBranch={openBranchOnSibling}
                siblings={i > 0 ? path[i - 1].children : undefined}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
