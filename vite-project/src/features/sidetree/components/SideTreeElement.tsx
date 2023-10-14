import { useCallback, useState } from "react";
import CRUDBookmarkFacade from "../../../lib/CRUDBookmarkFacade";
import ClipboardFacade from "../../../lib/ClipboardFacade";
import { useBookmarks } from "../../../lib/GlobalReducer";
import { BookmarkNode } from "../../../lib/typesFacade";
import { isAFolder } from "../../../utils/ifHasChildrenFolders";

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
  unrollCallback: (n: BookmarkNode) => void;
  path: BookmarkNode[];
  changePath: (nodes: BookmarkNode[]) => void;
};

export function SideTreeElement(
  {
    thing,
    initialUnrolled,
    unrollCallback,
    path,
    changePath,
  }: SideTreeElementProps,
): JSX.Element {
  const [unrolled, setUnrolled] = useState<boolean>(initialUnrolled);
  const isALeafNode: boolean = ifIsALeafNode(thing);

  const isInPath = useCallback(
    () => {
      return path.includes(thing);
    },
    [path, thing],
  );

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (isInPath()) return;
    CRUDBookmarkFacade.getPathOfABookmark(thing).then((newPath) => {
      changePath(newPath);
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
    // todo add context menu
  };

  const newPathClickHandler = () =>
    CRUDBookmarkFacade.getPathOfABookmark(thing).then((newPath) => {
      changePath(newPath);
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
            const unrolled: boolean = path.includes(n);
            return (
              <SideTreeElement
                thing={n}
                initialUnrolled={unrolled}
                unrollCallback={unrollCallback}
                changePath={changePath}
                path={path}
              />
            );
          })}
      </div>
    </div>
  );
}
