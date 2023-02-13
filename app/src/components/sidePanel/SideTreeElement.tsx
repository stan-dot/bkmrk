import { MouseEvent, useState } from "react";
import { ifIsALeafNode } from "../../utils/ifHasChildrenFolders";
import { getPath } from "../getPath";
import { BookmarkContextMenu } from "../contextMenuComponents/BookmarkContextMenu";
import { SideSubTree } from "./SideSubTree";
import { ContextMenuProps } from "../contextMenuComponents/ContextMenuProps";
import { codeBookmarkToUriList } from "../../utils/dragProcessing";

/**
 * for side displaying FOLDERS ONLY
 * need to display with some offset to the fight
 * @param props
 * @returns
 */
export function SideTreeElement(
  props: {
    thing: chrome.bookmarks.BookmarkTreeNode;
    pathSetter: (path: chrome.bookmarks.BookmarkTreeNode[]) => void;
    unrolled: boolean;
    path: chrome.bookmarks.BookmarkTreeNode[];
    setRowsCallback: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void
  },
): JSX.Element {
  const [position, setPosition] = useState([0, 0]);
  const [unrolled, setUnrolled] = useState(props.unrolled);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const isALeafNode: boolean = ifIsALeafNode(props.thing);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    getPath(props.thing).then((path: chrome.bookmarks.BookmarkTreeNode[]) => {
      console.log("path: ", path);
      props.pathSetter(path);
    });
  };

  const handleContextMenu = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    console.log("summoned the context menu on", props.thing.title);
    e.preventDefault();
    e.stopPropagation();
    setPosition([e.pageX, e.pageY]);
    setContextMenuOpen(true);
  };

  const lastPathItem = () => props.path[props.path.length - 1];

  const contextProps: ContextMenuProps = {
    thing: props.thing,
    position: position,
    closeCallback: () => setContextMenuOpen(false),
    sortCallback: props.setRowsCallback
  };
  return (
    <>
      <div
        className={`flex w-fit  min-w-[20rem] pt-2 justify-between ${lastPathItem() === props.thing ? "ring-cyan-300" : ""
          } overflow-auto min-h-30 flex-col cursor-pointer bg-slate-700 rounded-r-md`}
        id={`${props.thing.id}-side-tree-container`}
        onClick={() =>
          getPath(props.thing).then((path: chrome.bookmarks.BookmarkTreeNode[]) => {
            console.log("path: ", path);
            props.pathSetter(path);
          })
        }
        style={{ border: lastPathItem() === props.thing ? '1rem solid red' : 'none' }}
        onContextMenu={e => handleContextMenu(e)}
        onDragStart={e => {
          const stringified: string = codeBookmarkToUriList([props.thing], true);
          e.dataTransfer.setData("text/uri-list", stringified);
          e.dataTransfer.setData("text/plain", codeBookmarkToUriList([props.thing], false));
          // NOTE - the text/plain is a fallback if uri-list fails
          // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types#:~:text=As%20usual%2C%20set%20the%20text/plain%20type%20last%2C%20as%20a%20fallback%20for%20the%20text/uri%2Dlist%20type.
          e.dataTransfer.dropEffect = "move";
          console.log('dragging the side element', e);
        }}
        draggable
      >
        <div
          className="flex min-w-fit  min-h-fit flex-row p-2 hover:bg-slate-500 focus:bg-cyan-400 focus:border-white focus:border-2"
          id={`${props.thing.id}-side-tree-row`}
        >
          <button
            id={`${props.thing.id}-arrow`}
            onClick={(e) => setUnrolled(!unrolled)}
            className={`${!isALeafNode && "hidden"
              } hover:bg-slate-400 text-slate-50 text-xl mr-2 rounded-full`}
          >
            {unrolled ? <p>&#709;</p> : <p>&#707;</p>}
          </button>
          <p className={` text-slate-50 text-xl mr-2`}>
            {props.thing.children?.length}
          </p>
          <button
            onClick={handleClick}
            onContextMenu={(e) => handleContextMenu(e)}
            className="w-fit  text-left mr-2"
            onDoubleClick={(e) => setUnrolled(!unrolled)}
          >
            <p className="text-slate-50">{props.thing.title}</p>
          </button>
        </div>
        {unrolled && (
          <SideSubTree
            nodes={props.thing.children!}
            pathSetter={props.pathSetter}
            path={props.path}
            setRowsCallback={props.setRowsCallback}
          />
        )}
      </div>
      {
        contextMenuOpen &&
        (
          <BookmarkContextMenu
            contextMenuProps={contextProps}
          />
        )
      }
    </>
  );
}