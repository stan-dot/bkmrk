import { MouseEvent, useState } from "react";
import { ifIsALeafNode } from "../../utils/ifHasChildrenFolders";
import { BottomArrow } from "../../svgs/BottomArrow";
import { RightArrow } from "../../svgs/RightArrow";
import { getPath } from "../getPath";
import { SidePanelContextMenu } from "./SidePanelContextMenu";
import { SideSubTree } from "./SideSubTree";
import { ContextMenuProps } from "../../types/ContextMenuProps";
import { SortOptions } from "../../utils/rowSorter";

const WIDTH_OF_NODE = 120;
const sideTreeElementContainerStyles: React.CSSProperties = {
  display: "flex",
  width: WIDTH_OF_NODE,
  border: "1px solid",
  borderColor: "purple",
  justifyContent: "space-between",
  height: "fit-content",
  minHeight: '50px',
  flexDirection: "column",
};

const sideTreeElementStyles: React.CSSProperties = {
  display: "flex",
  minWidth: WIDTH_OF_NODE,
  width: "fit-content",
  border: "1px solid",
  borderColor: "purple",
  justifyContent: "space-between",
  height: "fit-content",
  minHeight: '50px',
  flexDirection: "row",
};

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
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    console.log("summoned the context menu on", props.thing.title);
    e.preventDefault();
    e.stopPropagation();
    setPosition([e.pageX, e.pageY]);
    setContextMenuOpen(true);
  };

  const contextProps: ContextMenuProps = {
    thing: props.thing,
    position: position,
    closeCallback: () => setContextMenuOpen(false),
    sortCallback: () => console.log('should use some context for this, it is too bothersome now')
  };
  return (
    <div
      style={sideTreeElementContainerStyles}
      id={`${props.thing.id}-side-tree-container`}
    >
      <div
        style={sideTreeElementStyles}
        id={`${props.thing.id}-side-tree-row`}
      >
        <button
          id={`${props.thing.id}-arrow`}
          onClick={(e) => setUnrolled(!unrolled)}
          style={{ visibility: isALeafNode ? "visible" : "hidden" }}
        >
          {unrolled ? <RightArrow /> : <BottomArrow />}
          {props.thing.children?.length}
        </button>
        <button
          onClick={handleClick}
          onContextMenu={(e) => handleContextMenu(e)}
          style={{ width: "80%", textAlign: "left" }}
        >
          <p>{props.thing.title}</p>
        </button>
        {contextMenuOpen &&
          (
            <SidePanelContextMenu
              contextMenuProps={contextProps}
            />
          )}
      </div>
      {unrolled && (
        <SideSubTree
          nodes={props.thing.children!}
          pathSetter={props.pathSetter}
          path={props.path}
        />
      )}
    </div>
  );
}
