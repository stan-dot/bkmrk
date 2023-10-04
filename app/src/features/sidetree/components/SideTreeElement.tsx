import { useCallback, useState } from "react";
import CRUDBookmarkFacade from "../../../lib/CRUDBookmarkFacade";
import ClipboardFacade from "../../../lib/ClipboardFacade";
import { BookmarkNode } from "../../../lib/typesFacade";
import { isAFolder } from "../../../utils/ifHasChildrenFolders";
import { useContextMenuDispatch } from "../../context-menu/ContextMenuContext";
import { useHistoryIdsDispatch } from "../../history/HistoryContext";
import { usePath, usePathDispatch } from "../../path/PathContext";

export function ifIsALeafNode(
  item: BookmarkNode,
): boolean {
  if (!item.children) return true;
  const existingChildFolder: BookmarkNode | undefined = item.children.find(
    isAFolder,
  );
  return !!existingChildFolder;
}

type SideTreeElementProps = {
  thing: BookmarkNode;
  initialUnrolled: boolean;
  setRowsCallback: (nodes: BookmarkNode[]) => void;
  unrollCallback: (n: BookmarkNode) => void;
};

export function SideTreeElement(
  {
    thing,
    initialUnrolled,
    setRowsCallback,
    unrollCallback,
  }: SideTreeElementProps,
): JSX.Element {
  const [unrolled, setUnrolled] = useState<boolean>(initialUnrolled);
  const isALeafNode: boolean = ifIsALeafNode(thing);
  const path = usePath();
  const pathDispatch = usePathDispatch();
  const contextMenuDispatch = useContextMenuDispatch();
  const historyDispatch = useHistoryIdsDispatch();

  const isInPath = useCallback(
    () => {
      return path.items.includes(thing);
    },
    [path, thing],
  );

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (isInPath()) return;
    CRUDBookmarkFacade.getPath(thing).then((newPath) => {
      pathDispatch({
        type: "full",
        nodes: newPath,
      });
      historyDispatch({
        type: "add",
        nodeId: thing.id,
      });
    });
  };

  const handleContextMenu = (
    e: React.MouseEvent<
      (HTMLDivElement | HTMLButtonElement),
      globalThis.MouseEvent
    >,
  ) => {
    console.debug("launching context menu for side element", thing);
    e.preventDefault();
    e.stopPropagation();
    contextMenuDispatch({
      type: "folder",
      position: [e.pageX, e.pageY],
      direction: "open",
      things: [thing],
    });
  };

  const newPathClickHandler = () =>
    CRUDBookmarkFacade.getPath(thing).then((newPath) => {
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
      id={`${thing.id}-side-tree-container`}
      onClick={newPathClickHandler}
      style={{
        borderWidth: "0.25rem",
        borderStyle: isInPath() ? "solid" : "none",
        borderColor: "rgb(8, 145, 178)",
      }}
      onContextMenu={handleContextMenu}
      onDrop={thing.parentId
        ? ClipboardFacade.createDropHandlerInParent(thing.parentId)
        : () => console.log("no parent")}
      onDragStart={ClipboardFacade.createDragHandler(thing)}
      draggable
    >
      <div
        className="flex min-w-fit min-h-fit flex-row p-2 hover:bg-slate-500 focus:bg-cyan-400 focus:border-white focus:border-2"
        id={`${thing.id}-side-tree-row`}
      >
        <button
          id={`${thing.id}-arrow`}
          onClick={(e) => setUnrolled(!unrolled)}
          className={`${
            !isALeafNode && "hidden"
          } hover:bg-slate-400 text-slate-50 text-l m-2 rounded-full`}
        >
          {unrolled ? <p>&#709;</p> : <p>&#707;</p>}
        </button>
        <p className={` text-slate-50 text-l mr-2`}>
          {thing.children?.length}
        </p>
        <button
          onClick={handleClick}
          onContextMenu={handleContextMenu}
          className="w-fit  text-left mr-2"
          onDoubleClick={(e) => setUnrolled(!unrolled)}
        >
          <p className="text-slate-50">{thing.title}</p>
        </button>
      </div>

      <div id="sidesubtree" className="relative l-10 ml-5 p-1 ">
        {thing.children &&
          thing.children.filter(isAFolder).map((n) => {
            const unrolled: boolean = path.items.includes(n);
            return (
              <SideTreeElement
                thing={n}
                initialUnrolled={unrolled}
                setRowsCallback={setRowsCallback}
                unrollCallback={unrollCallback}
              />
            );
          })}
      </div>
    </div>
  );
}
