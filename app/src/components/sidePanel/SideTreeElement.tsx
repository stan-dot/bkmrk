import { Dispatch, MouseEvent, useState } from "react";
import { ifLeaveNode } from "../../functions/ifHasChildrenFolders";
import { getPath } from "../getPath";
import { SidePanelContextMenu } from "./SidePanelContextMenu";

const WIDTH_OF_NODE = 120;
const sideTreElementStyles: React.CSSProperties = {
  display: "flex",
  width: WIDTH_OF_NODE,
  border: "1px solid",
  borderColor: "red",
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
    pathSetter: Dispatch<
      React.SetStateAction<chrome.bookmarks.BookmarkTreeNode[]>
    >;
    unrolled: boolean;
  },
): JSX.Element {
  const [position, setPosition] = useState([0, 0]);
  const [unrolled, setUnrolled] = useState(props.unrolled);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const leafNode: boolean = ifLeaveNode(props.thing);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    getPath(props.thing).then((path: chrome.bookmarks.BookmarkTreeNode[]) => {
      props.pathSetter(path);
    });
  };


  const handleContextMenu = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    console.log("clicked the side button");
    e.preventDefault();
    e.stopPropagation();
    setPosition([e.pageX, e.pageY]);
    setContextMenuOpen(true);
  };
  // https://www.svgrepo.com/svg/175769/down-arrow
  // todo add this

  return (
    <div
      style={sideTreElementStyles}
      id={`${props.thing.id}-side-tree-row`}
    >
      <button
        id={`${props.thing.id}-arrow`}
        onClick={(e) => setUnrolled(!unrolled)}
        style={{ visibility: leafNode ? "visible" : "hidden" }}
      >
        {unrolled ? <p>arrow right svg</p> : <p>arrow down svg</p>}
      </button>
      <button
        onClick={handleClick}
        onContextMenu={(e) => handleContextMenu(e)}
        style={{ width: "80%", textAlign: "left" }}
      >
        <p>{props.thing.title}</p>
      </button>
      {contextMenuOpen ??
        <SidePanelContextMenu thing={props.thing} position={position} />}
    </div>
  );
}
