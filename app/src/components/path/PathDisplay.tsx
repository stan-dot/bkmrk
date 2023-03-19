import { useState } from "react";
import { useContextMenuDispatch } from "../../contexts/ContextMenuContext";
import { useHistory, useHistoryDispatch } from "../../contexts/HistoryContext";
import { usePath, usePathDispatch } from "../../contexts/PathContext";
import { PathItem } from "./PathItem";

export function PathDisplay(): JSX.Element {
  const path = usePath();
  const pathDispatch = usePathDispatch();
  const [lastInteracted, setLastInteracted] = useState(
    path.items[path.items.length - 1],
  );

  const historyDispatch = useHistoryDispatch();
  const history = useHistory();

  const contextMenuDispatch = useContextMenuDispatch();

  const contextClickHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    node: chrome.bookmarks.BookmarkTreeNode,
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    contextMenuDispatch({
      type: "single-bookmark",
      things: [node],
      direction: "open",
      position: [
        e.pageX,
        e.pageY,
      ],
    });
  };

  const handleClick = (
    index: number,
    node: chrome.bookmarks.BookmarkTreeNode,
  ) => {
    setLastInteracted(node);
    if (index !== 0 && index !== path.items.length - 1) {
      const newPath: chrome.bookmarks.BookmarkTreeNode[] = path.items.slice(
        0,
        index,
      );
      pathDispatch({
        type: "full",
        nodes: newPath,
      });

      historyDispatch({
        type: "add",
        nodeId: node.id,
      });
    }
  };

  const upButtonHandler = () => {
    const newPath: chrome.bookmarks.BookmarkTreeNode[] = path.items.slice(
      0,
      path.items.length - 1,
    );
    pathDispatch({
      type: "full",
      nodes: newPath,
    });
    historyDispatch({
      type: "add",
      nodeId: newPath[-1].id,
    });
  };

  return (
    <div
      id="path-display"
      className="flex fixed h-12 justify-start bg-slate-700 ml-4 "
    >
      <div id="buttonArea" className="relative bg-slate-600 mr-4 h-12">
        <button
          disabled={history.pastNodeIds.length === 0}
          onClick={() => {
            historyDispatch({
              type: "back",
            });
            console.log("history:", history);
          }}
          className={"text-l text-slate-50 p-2 m-0 hover:bg-slate-300  hover:border-slate-400"}
        >
          {"<-"}
        </button>
        <button
          disabled={history.futureNodeIds.length === 0}
          onClick={() => {
            historyDispatch({
              type: "forward",
            });
            console.log("history:", history);
          }}
          className={"text-l text-slate-50 p-2 m-0 hover:bg-slate-300  hover:border-slate-400"}
        >
          {"->"}
        </button>
        <button
          disabled={path.items.length < 2}
          onClick={upButtonHandler}
          className={"text-l text-slate-50 hover:bg-slate-300  p-2 m-0 hover:border-slate-400"}
        >
          [..]
        </button>
      </div>
      <div className="justify-between flex border-2 ">
        {path.items.map((n, i) => (
          <PathItem
            handleClick={handleClick}
            index={i}
            node={n}
            key={n.id}
            contextMenuHandler={contextClickHandler}
            siblings={i > 0 ? path.items[i - 1].children : []}
          />
        ))}
      </div>
    </div>
  );
}
