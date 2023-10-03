import { useCallback, useState } from "react";
import { BookmarkNode } from "../../../lib/typesFacade";
import ClipboardFacade, {
  codeBookmarkToUriList,
  readRawTextAsBookmarks,
} from "../../../lib/ClipboardFacade";
import { isAFolder } from "../../../utils/ifHasChildrenFolders";
import { useContextMenuDispatch } from "../../context-menu/ContextMenuContext";
import { useHistoryDispatch } from "../../history/HistoryContext";
import { usePath, usePathDispatch } from "../../path/PathContext";
import CRUDBookmarkFacade from "../../../lib/CRUDBookmarkFacade";
import { ifIsALeafNode } from "./SideTreeElement";

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
    CRUDBookmarkFacade.getPath(props.thing).then((newPath) => {
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

  const newPathClickHandler = () =>
    CRUDBookmarkFacade.getPath(props.thing).then((newPath) => {
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
      onDrop={ClipboardFacade.createDropHandlerInParent(props.thing.id)}
      onDragStart={ClipboardFacade.createDragHandler(props.thing)}
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
