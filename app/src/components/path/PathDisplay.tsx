import { useState } from "react";
import { usePathDispatch, usePath } from "../../contexts/PathContext";
import { ContextMenuProps } from "../contextMenuComponents/ContextMenuProps";
import { PathDisplayContextMenu } from "./PathDisplayContextMenu";
import { PathItem } from "./PathItem";

export function PathDisplay(): JSX.Element {
  const [position, setPosition] = useState([0, 0]);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const path = usePath();
  const pathDispatch = usePathDispatch()
  const [lastIteracted, setLastInteracted] = useState(path.items[path.items.length - 1])

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
    if (index !== 0 && index !== path.items.length - 1) {
      const newPath: chrome.bookmarks.BookmarkTreeNode[] = path.items.slice(
        0,
        index,
      );
      console.log("new path: ", newPath);
      pathDispatch({
        type: 'changed',
        node: node
      })
    }
  };

  const upButtonHandler = () => {
    const newPath: chrome.bookmarks.BookmarkTreeNode[] = path.items.slice(
      0,
      path.items.length - 1,
    );
    console.log("button up, new path: ", newPath);
    pathDispatch({
      type: 'changed',
      node: newPath[0]
    })
  };

  const contextMenuProps: ContextMenuProps = {
    thing: lastIteracted,
    position: position,
    closeCallback: () => setShowContextMenu(false),
    sortCallback: () => console.log("no sort here")
  };

  return (
    <div
      id="path-display"
      className="flex fixed h-12 justify-start bg-slate-700 ml-4 "
    >
      <div id="buttonArea" className="relative bg-slate-600 mr-4">
        <button disabled={true} onClick={upButtonHandler} className={"text-l text-slate-50 p-2 m-0 hover:bg-slate-300  hover:border-slate-400"}>
          {"<-"}
        </button>
        <button disabled={true} onClick={upButtonHandler} className={"text-l text-slate-50 p-2 m-0 hover:bg-slate-300  hover:border-slate-400"}>
          {"->"}
        </button>
        <button disabled={path.items.length < 2} onClick={upButtonHandler} className={"text-l text-slate-50 hover:bg-slate-300  p-2 m-0 hover:border-slate-400"}>
          [..]
        </button>
      </div>
      <div className="justify-between flex border-2 " >
        {path.items.map((n, i) => (
          <PathItem
            handleClick={handleClick}
            index={i}
            node={n}
            contextMenuHandler={contextClickHandler}
            siblings={i > 0 ? path.items[i - 1].children : []}
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
