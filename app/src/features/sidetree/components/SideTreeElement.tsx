import React, { MouseEvent, useCallback, useState } from "react";
import { useContextMenuDispatch } from "../../contexts/ContextMenuContext";
import { usePath, usePathDispatch } from "../../contexts/PathContext";
import { getPath } from "../../lib/CRUDBookmarkFacade";
import { ifIsALeafNode, isAFolder } from "../../utils/ifHasChildrenFolders";
import { SideSubTree } from "./SideSubTree";
import {
  codeBookmarkToUriList,
  readRawTextAsBookmarks,
} from "../../utils/interactivity/dragProcessing";
import { useHistoryDispatch } from "../../features/history/HistoryContext";

export function SideTreeElement(
  props: {
    thing: BookmarkNode;
    unrolled: boolean;
    setRowsCallback: (nodes: BookmarkNode[]) => void;
    unrollCallback: (n: BookmarkNode) => void;
  },
): JSX.Element {
  const [unrolled, setUnrolled] = useState<boolean>(props.unrolled);
  const isALeafNode: boolean = ifIsALeafNode(props.thing);
  const path = usePath();
  const pathDispatch = usePathDispatch();
  const contextMenuDispatch = useContextMenuDispatch();
  const historyDispatch = useHistoryDispatch();

  const isInPath = useCallback(
    () => {
      return path.items.includes(props.thing);
    },
    [path, props.thing],
  );

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (isInPath()) return;
    getPath(props.thing).then((newPath) => {
      pathDispatch({
        type: "full",
        nodes: newPath,
      });
      historyDispatch({
        type: "add",
        nodeId: props.thing.id,
      });
    });
  };

  const handleContextMenu = (
    e:
      | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
      | React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    console.debug("launching context menu for side element", props.thing);
    e.preventDefault();
    e.stopPropagation();
    contextMenuDispatch({
      type: "folder",
      position: [e.pageX, e.pageY],
      direction: "open",
      things: [props.thing],
    });
  };

  const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const stringified: string = codeBookmarkToUriList([props.thing], true);
    e.dataTransfer.setData("text/uri-list", stringified);
    e.dataTransfer.setData(
      "text/plain",
      codeBookmarkToUriList([props.thing], false),
    );
    e.dataTransfer.dropEffect = "move";
    console.debug("dragging the side element", e);
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.debug("ondrop triggered");
    const data: DataTransfer = e.dataTransfer;
    const items: chrome.bookmarks.BookmarkChangesArg[] = readRawTextAsBookmarks(
      data,
    );
    const parentId = props.thing.id;
    const withParent = items.map((i) => {
      return { ...i, parentId: parentId };
    });
    withParent.forEach((i) => chrome.bookmarks.create(i));
  };

  const newPathClickHandler = () =>
    getPath(props.thing).then((newPath) => {
      pathDispatch({
        type: "full",
        nodes: newPath,
      });
    });
  return (
    <div
      className={`flex w-fit  min-w-[20rem] pt-2 justify-between ${
        isInPath() ? "ring-cyan-300" : ""
      } overflow-auto min-h-30 flex-col cursor-pointer bg-slate-700 rounded-r-md`}
      id={`${props.thing.id}-side-tree-container`}
      onClick={newPathClickHandler}
      style={{
        borderWidth: "0.25rem",
        borderStyle: isInPath() ? "solid" : "none",
        borderColor: "rgb(8, 145, 178)",
      }}
      onContextMenu={handleContextMenu}
      onDrop={dropHandler}
      onDragStart={dragHandler}
      draggable
    >
      <div
        className="flex min-w-fit min-h-fit flex-row p-2 hover:bg-slate-500 focus:bg-cyan-400 focus:border-white focus:border-2"
        id={`${props.thing.id}-side-tree-row`}
      >
        <button
          id={`${props.thing.id}-arrow`}
          onClick={(e) => setUnrolled(!unrolled)}
          className={`${
            !isALeafNode && "hidden"
          } hover:bg-slate-400 text-slate-50 text-l m-2 rounded-full`}
        >
          {unrolled ? <p>&#709;</p> : <p>&#707;</p>}
        </button>
        <p className={` text-slate-50 text-l mr-2`}>
          {props.thing.children?.length}
        </p>
        <button
          onClick={handleClick}
          onContextMenu={handleContextMenu}
          className="w-fit  text-left mr-2"
          onDoubleClick={(e) => setUnrolled(!unrolled)}
        >
          <p className="text-slate-50">{props.thing.title}</p>
        </button>
      </div>

      <div id="sidesubtree" className="relative l-10 ml-5 p-1 ">
        {props.thing.children
          ? props.thing.children.filter(isAFolder).map((n) => {
            const unrolled: boolean = path.items.includes(n);
            return (
              <SideTreeElement
                thing={n}
                unrolled={unrolled}
                setRowsCallback={props.setRowsCallback}
                unrollCallback={props.unrollCallback}
              />
            );
          })
          : null}
      </div>
      {
        /* {unrolled && (
        <SideSubTree
          nodes={props.thing.children!}
          setRowsCallback={props.setRowsCallback}
        />
      )} */
      }
    </div>
  );
}
