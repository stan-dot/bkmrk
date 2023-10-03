import { useState } from "react";
import { useContextMenuDispatch } from "../context-menu/ContextMenuContext";
import { useHistory, useHistoryDispatch } from "../history/HistoryContext";
import { usePath, usePathDispatch } from "./PathContext";
import { PathItem } from "./PathItem";

interface PathDisplayProps {
  onPasteHandler: (e: React.ClipboardEvent<HTMLDivElement>) => void;
}

export function PathDisplay({ onPasteHandler }: PathDisplayProps): JSX.Element {
  const path = usePath();
  const pathDispatch = usePathDispatch();
  const [lastInteracted, setLastInteracted] = useState<
    BookmarkNode
  >(
    path.items[path.items.length - 1],
  );

  const historyDispatch = useHistoryDispatch();
  const history = useHistory();

  const contextMenuDispatch = useContextMenuDispatch();

  const contextClickHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    node: BookmarkNode,
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
    node: BookmarkNode,
  ) => {
    setLastInteracted(node);
    if (index !== 0 && index !== path.items.length - 1) {
      const newPath: BookmarkNode[] = path.items.slice(
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
    const newPath: BookmarkNode[] = path.items.slice(
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
      className="fixed w-full h-12 top-16 bg-slate-700 flex-col justify-evenly"
      onPaste={onPasteHandler}
    >
      <div
        id="path-display"
        className="flex fixed h-12 justify-start bg-slate-700 ml-4 "
      >
        <div id="buttonArea" className="relative bg-slate-600 mr-4 h-12">
          {
            /* <button
          disabled={history.pastNodeIds.length === 0}
          onClick={() => {
            historyDispatch({
              type: "back",
            });
            console.debug("history:", history);
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
            console.debug("history:", history);
          }}
          className={"text-l text-slate-50 p-2 m-0 hover:bg-slate-300  hover:border-slate-400"}
        >
          {"->"}
        </button> */
          }
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
    </div>
  );
}
