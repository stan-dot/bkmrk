import React, { useCallback, useState } from "react";
import { BookmarkNode } from "../../../lib/typesFacade";
import { useContextMenuDispatch } from "../../context-menu/ContextMenuContext";
import { usePath, usePathDispatch } from "../PathContext";
import { PathItem } from "./PathItem";
import CRUDBookmarkFacade from "../../../lib/CRUDBookmarkFacade";

interface PathDisplayProps {
}

export function PathDisplay(): JSX.Element {
  const path = usePath();
  const pathDispatch = usePathDispatch();
  const initLastIteraction = path.items[path.items.length - 1];
  const [lastInteracted, setLastInteracted] = useState<BookmarkNode>(
    initLastIteraction,
  );

  const onPasteHandler = (e: React.ClipboardEvent<HTMLDivElement>) => {
    if (path && path.items && path.items.length > 0) {
      const parent = path.items.at(-1);
      if (parent) {
        const parentId = parent.id;
        e.preventDefault();
        console.debug(e);
        CRUDBookmarkFacade.createBookmarksFromPaste(e, parentId);
      }
    }
  };

  const contextMenuDispatch = useContextMenuDispatch();

  const contextClickHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    node: BookmarkNode,
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    contextMenuDispatch({
      type: "single-bookmark",
      things: [node],
      direction: "open",
      position: [
        e.pageX,
        e.pageY,
      ],
    });
  };

  const handleClick = (
    index: number,
    node: BookmarkNode,
  ) => {
    setLastInteracted(node);
    if (index !== 0 && index !== path.items.length - 1) {
      const newPath: BookmarkNode[] = path.items.slice(
        0,
        index,
      );
      pathDispatch({
        type: "full",
        nodes: newPath,
      });

      // historyDispatch({
      //   type: "add",
      //   nodeId: node.id,
      // });
    }
  };

  const upButtonHandler = () => {
    const newPath: BookmarkNode[] = path.items.slice(
      0,
      path.items.length - 1,
    );
    pathDispatch({
      type: "full",
      nodes: newPath,
    });
    // historyDispatch({
    //   type: "add",
    //   nodeId: newPath[-1].id,
    // });
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
            disabled={path.items.length < 2}
            onClick={upButtonHandler}
            className={"text-l text-slate-50 hover:bg-slate-300  p-2 m-0 hover:border-slate-400"}
          >
            [..]
          </button>
        </div>
        <div className="justify-between flex border-2 ">
          {path.items.map((n, i) => (
            <PathItem
              handleClick={handleClick}
              index={i}
              node={n}
              key={n.id}
              contextMenuHandler={contextClickHandler}
              siblings={i > 0 ? path.items[i - 1].children : []}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
