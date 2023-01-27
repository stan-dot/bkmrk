import { useState } from "react";
import { ContextMenuProps } from "../../types/ContextMenuProps";
import { PathDisplayContextMenu } from "./PathDisplayContextMenu";
import { PathItem } from "./PathItem";

export function PathDisplay(props: {
  path: chrome.bookmarks.BookmarkTreeNode[];
  pathChangeHandler: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
}): JSX.Element {
  const [position, setPosition] = useState([0, 0]);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [lastIteracted, setLastInteracted] = useState(props.path[props.path.length - 1])

  const contextClickHandler: React.MouseEventHandler<HTMLDivElement> = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setPosition(
      [
        e.pageX,
        e.pageY,
      ],
    );
    if (showContextMenu) {
      setShowContextMenu(false);
    }
  };

  const handleClick = (index: number, node: chrome.bookmarks.BookmarkTreeNode) => {
    setLastInteracted(node)
    if (index !== 0 && index !== props.path.length - 1) {
      const newPath: chrome.bookmarks.BookmarkTreeNode[] = props.path.slice(
        0,
        index,
      );
      console.log("new path: ", newPath);
      props.pathChangeHandler(newPath);
    }
  };

  const upButtonHandler = () => {
    const newPath: chrome.bookmarks.BookmarkTreeNode[] = props.path.slice(
      0,
      props.path.length - 1,
    );
    console.log("button up, new path: ", newPath);
    props.pathChangeHandler(newPath);
  };

  const contextMenuProps: ContextMenuProps = {
    thing: lastIteracted,
    position: position,
    closeCallback: () => setShowContextMenu(false),
    sortCallback: () => console.log("no sort here")
  };

  return (
    <div
      id="taskbar"
      className="flex justify-start min-w-min l-3 t-3 hover:border-1 "
    >
      <div id="buttonArea" className="relative bg-slate-600 mr-4">
        <button disabled={true} onClick={upButtonHandler} className={"text-xl text-slate-50"}>
          {"<-"}
        </button>
        <button disabled={true} onClick={upButtonHandler} className={"text-xl text-slate-50"}>
          {"->"}
        </button>
        <button disabled={props.path.length < 2} onClick={upButtonHandler} className={"text-xl text-slate-50"}>
          [..]
        </button>
      </div>
      <div className="justify-between flex border-2 " >
        {props.path.map((n, i) => (
          <PathItem
            handleClick={handleClick}
            index={i}
            node={n}
            contextMenuHandler={contextClickHandler}
          />
        ))}
      </div>
      {showContextMenu && (
        <PathDisplayContextMenu
          contextMenuProps={contextMenuProps}
        />
      )}
    </div>
  );
}
