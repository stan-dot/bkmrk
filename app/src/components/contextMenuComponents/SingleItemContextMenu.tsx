import { useCallback, useEffect, useState } from "react";
import {
  useContextMenu,
  useContextMenuDispatch
} from "../../contexts/ContextMenuContext";
import { basicNodes } from "../../utils/dataProcessing/basicNodes";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { sortRows } from "../../utils/interactivity/sortRows";
import { contextMenuButtonClass } from "./contextMenuButtonClass";
import { EditDeleteSection } from "./EditDeleteSection";
import { OpenAllSection } from "./OpenAllSection";

export function SingleItemContextMenu(
  props: {
    thing: chrome.bookmarks.BookmarkTreeNode;
    setRowsCallback?: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
    searchResults?: boolean;
  },
): JSX.Element {

  const isProtected: boolean = props.thing?.title
    ? basicNodes.includes(props.thing.title)
    : false;

  const [children, setChildren] = useState<chrome.bookmarks.BookmarkTreeNode[]>(
    [],
  );

  const handleShowInFolder = async (
    _e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (!props.setRowsCallback) return;
    const parent: chrome.bookmarks.BookmarkTreeNode[] = await chrome.bookmarks
      .get(props.thing.parentId!);

    if (parent.length > 1) {
      console.error("there is more than one parent for this id");
      return;
    }
    const children: chrome.bookmarks.BookmarkTreeNode[] = parent[0].children!;
    setChildren(children);
    props.setRowsCallback(children);
  };

  // it's sortable when either just 1 thing is selected, or are all
  // todo here error
  const sortable = isAFolder(props.thing) &&
    ((props.thing.children?.length ?? -1) > 0);

  const dispatch = useContextMenuDispatch();

  const contextMenu = useContextMenu();
  const position = contextMenu.position;

  const close = useCallback(() => {
    dispatch({
      type: "single-bookmark",
      direction: "close",
      position: position,
      things: [props.thing],
    });
  }, [dispatch, position, props.thing]);

  useEffect(() => {
    setTimeout(() => {
      // props.contextMenuProps.closeCallback();
      close();
    }, 3000);
  }, [close]);

  return (
    <div
      id="singleItemContextMenu"
      className={`contextMenu w-36 z-50 border-1 text-l rounded-md border-solid bg-slate-700 `}
      style={{
        position: "absolute",
        left: `${position[0]}px`,
        right: `${position[1]}px`,
      }}
      onBlur={close}
    >
      <hr />
      <EditDeleteSection
        thing={props.thing}
        protected={isProtected}
      />
      <hr />
      <div className="group2 w-32 flex flex-col border-t-solid border-b-solid border-slate-200 m-2">
        <button disabled={!isProtected} className={contextMenuButtonClass}>
          <p>Cut</p>
        </button>
        <button disabled={!isProtected} className={contextMenuButtonClass}>
          <p>Copy</p>
        </button>
        <button disabled={!isProtected} className={contextMenuButtonClass}>
          <p>Paste</p>
        </button>
      </div>
      <hr />
      <div className="group-changing flex flex-col">
        <button
          className={`${
            !props.searchResults && "hidden"
          } ${contextMenuButtonClass}`}
          onClick={handleShowInFolder}
        >
          <p>show in folder</p>
        </button>
        <button
          onClick={() =>
            sortRows(children, {
              key: "title",
              reverse: false,
            })}
          disabled={sortable}
          className={contextMenuButtonClass}
        >
          Sort contents A-Z
        </button>
        <button
          onClick={() =>
            sortRows(children, {
              key: "date",
              reverse: false,
            })}
          disabled={sortable}
          className={contextMenuButtonClass}
        >
          Sort contents by date
        </button>
      </div>
      <hr />
      <OpenAllSection things={children} />
    </div>
  );
}
