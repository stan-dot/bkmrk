import { basicNodes } from "../../utils/dataProcessing/basicNodes";
import { ContextMenuProps } from "./ContextMenuProps";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { OpenAllSection } from "./OpenAllSection";
import { EditDeleteSection } from "./EditDeleteSection";
import { contextMenuButtonClass } from "./contextMenuButtonClass";
import { useEffect } from "react";
import { useContextMenuDispatch } from "../../contexts/ContextMenuContext";
import { sortRows } from "../../utils/sortRows";

// todo noe types of div for many selected items and separate for just one? 
export function BookmarkContextMenu(
  props: {
    contextMenuProps: ContextMenuProps;
    setRowsCallback?: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
    searchResults?: boolean;
  },
): JSX.Element {
  const isProtected: boolean = props.contextMenuProps.things.length > 1 ||
    basicNodes.includes(
      props.contextMenuProps.things[0].title,
    );

  const close = () => {
    dispatch({
      type: "bookmark",
      direction: "close",
      position: position,
    });
  }

  const handleShowInFolder = async (
    _e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (!props.setRowsCallback) return;
    const parent: chrome.bookmarks.BookmarkTreeNode[] = await chrome.bookmarks
      .get(props.contextMenuProps.thing.parentId!);
    if (parent.length > 1) {
      console.error("there is more than one parent for this id");
      return;
    }
    const children: chrome.bookmarks.BookmarkTreeNode[] = parent[0].children!;
    props.setRowsCallback(children);
  };

  const sortable = isAFolder(props.contextMenuProps.thing) &&
    ((props.contextMenuProps.thing.children?.length ?? -1) > 0);

  const dispatch = useContextMenuDispatch();

  const position = props.contextMenuProps.position;

  useEffect(() => {
    setTimeout(() => {
      // props.contextMenuProps.closeCallback();
      close();
    }, 3000);
  }, [dispatch, position, props.contextMenuProps]);

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
      <EditDeleteSection
        thing={props.contextMenuProps.thing}
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
          className={`${!props.searchResults && "hidden"
            } ${contextMenuButtonClass}`}
          onClick={handleShowInFolder}
        >
          <p>show in folder</p>
        </button>
        <button
          onClick={() =>
            sortRows(props.contextMenuProps.things, {
              key: "title",
              reverse: false,
            })}
          disabled={sortable}
          className={contextMenuButtonClass}
        >
          Sort A-Z
        </button>
        <button
          onClick={() =>
            sortRows(props.contextMenuProps.things, {
              key: "date",
              reverse: false,
            })}
          disabled={sortable}
          className={contextMenuButtonClass}
        >
          Sort by date
        </button>
      </div>
      <hr />
      <OpenAllSection things={props.contextMenuProps.things} />
    </div>
  );
}
