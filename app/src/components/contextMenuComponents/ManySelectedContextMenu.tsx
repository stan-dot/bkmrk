import { useCallback, useEffect } from "react";
import {
  useContextMenu,
  useContextMenuDispatch
} from "../../contexts/ContextMenuContext";
import { basicNodes } from "../../utils/dataProcessing/basicNodes";
import { sortRows } from "../../utils/interactivity/sortRows";
import { contextMenuButtonClass } from "./contextMenuButtonClass";
import { OpenAllSection } from "./OpenAllSection";

export function ManySelectedContextMenu(
  props: {
    things: chrome.bookmarks.BookmarkTreeNode[];
    setRowsCallback?: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
    searchResults?: boolean;
  },
): JSX.Element {
  const isProtected: boolean = props.things.length > 1 ||
    basicNodes.includes(
      props.things[0].title,
    );
  const dispatch = useContextMenuDispatch();

  const contextMenu = useContextMenu();
  const position = contextMenu.position;

  const close = useCallback(() => {
    dispatch({
      type: "bookmark",
      direction: "close",
      position: position,
    });
  }, [dispatch, position]);


  useEffect(() => {
    setTimeout(() => {
      close();
    }, 3000);
  }, [close, dispatch, position]);

  return (
    <div
      id="bookmarkContextMenu"
      className={`contextMenu w-36 z-50 border-1 text-l rounded-md border-solid bg-slate-700 `}
      style={{
        position: "absolute",
        left: `${position[0]}px`,
        right: `${position[1]}px`,
      }}
      onBlur={close}
    >
      <hr />

      <div className="group2 w-32 flex flex-col border-t-solid border-b-solid border-slate-200 m-2">
        <button disabled={!isProtected} className={contextMenuButtonClass}>
          <p>Cut</p>
        </button>
        <button className={contextMenuButtonClass}>
          <p>Copy</p>
        </button>
        <button className={contextMenuButtonClass}>
          <p>Paste</p>
        </button>
      </div>

      <hr />
      <div className="group-changing flex flex-col">
        <button
          onClick={() =>
            sortRows(props.things, {
              key: "title",
              reverse: false,
            })}
          className={contextMenuButtonClass}
        >
          Sort A-Z
        </button>
        <button
          onClick={() =>
            sortRows(props.things, {
              key: "date",
              reverse: false,
            })}
          className={contextMenuButtonClass}
        >
          Sort by date
        </button>
      </div>

      <hr />
      <OpenAllSection things={props.things} />
    </div>
  );
}
