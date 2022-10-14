import { Dispatch, MouseEvent, useState } from "react";
import { ifHasChildrenFolders } from "../../functions/ifHasChildrenFolders";
import { getPath } from "../Table";
import { SidePanelContextMenu } from "./SidePanelContextMenu";

const WIDTH_OF_NODE = 120;


/**
 * for side displaying FOLDERS ONLY
 * need to display with some offset to the fight
 * @param props
 * @returns
 */
export function SideTreeElement(
  props: {
    thing: chrome.bookmarks.BookmarkTreeNode,
    pathSetter: Dispatch<
      React.SetStateAction<chrome.bookmarks.BookmarkTreeNode[]>
    >;
  },
): JSX.Element {
  const [position, setPosition] = useState([0, 0]);
  const [unrolled, setUnrolled] = useState(false);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const hasChildrenFolders: boolean = ifHasChildrenFolders(props.thing);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log("should change the path to this dir");
    getPath(props.thing).then((path: chrome.bookmarks.BookmarkTreeNode[]) => {
      props.pathSetter(path);
    });
  };

  const handleContextMenu = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    console.log("clicked the side button");
    e.preventDefault();
    e.stopPropagation();
    setPosition([e.pageX, e.pageY]);
    setContextMenuOpen(true);
  };

  return (
    <div
      style={{ display: "flex", width: WIDTH_OF_NODE }}
      id={`${props.thing.id}-side-tree-row`}
    >
      {hasChildrenFolders ?? (
        <div id={`${props.thing.id}-arrow`}>
          {unrolled
            ? (
              <button onClick={(e) => setUnrolled(false)}>
                <p>arrow down svg</p>
              </button>
            )
            : (
              <button onClick={(e) => setUnrolled(true)}>
                <p>arrow right svg</p>
              </button>
            )}
        </div>
      )}
      <div style={{ width: "100%" }}>
        <button
          onClick={handleClick}
          onContextMenu={(e) => handleContextMenu(e)}
          style={{ width: "100%", textAlign: "left" }}
        >
          <p>{props.thing.title}</p>
        </button>
      </div>
      {
        contextMenuOpen
        ??
        <SidePanelContextMenu thing={props.thing} position={position} />
      }
    </div>
  );
}
