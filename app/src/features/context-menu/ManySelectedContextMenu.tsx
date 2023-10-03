import React, { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useContextMenu, useContextMenuDispatch } from "./ContextMenuContext";
import { useLocation } from "../../contexts/LocationContext";
import { codeBookmarkToUriList } from "../../utils/dragProcessing";
import { contextMenuButtonClass } from "./contextMenuButtonClass";
import { EditDeleteSection } from "./EditDeleteSection";
import { OpenAllSection } from "./OpenAllSection";
import { sortRows } from "../../features/sorting/sortRows";

const CLOSING_TIMEOUT = 3000;
export function ManySelectedContextMenu(
  props: {
    things: BookmarkNode[];
    setRowsCallback?: (nodes: BookmarkNode[]) => void;
    searchResults?: boolean;
  },
): JSX.Element {
  console.debug("many selected menui for :", props.things);
  const protectedNames = useLocation().nodeNames;
  // console.debug("inside another context menu", props.things);
  const isProtected: boolean = props.things.length > 1 ||
    protectedNames.includes(
      props.things[0].title ?? "",
    );

  const dispatch = useContextMenuDispatch();
  const contextMenu = useContextMenu();
  const position = contextMenu.position;

  const close = useCallback(() => {
    dispatch({
      type: "mixed",
      direction: "close",
      position: position,
      things: props.things,
    });
  }, [dispatch, position, props.things]);

  useEffect(() => {
    setTimeout(() => {
      close();
    }, CLOSING_TIMEOUT);
  }, [close, dispatch, position]);

  // todo make these buttons real
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
      {props.things.length === 1 &&
        <EditDeleteSection thing={props.things[0]} protected={false} />}
      <hr />
      {/* <div className="group2 w-32 flex flex-col border-t-solid border-b-solid border-slate-200 m-2"> */}
      {
        /* <button
          disabled={!isProtected}
          className={contextMenuButtonClass}
          onClick={() => {
            const list: string = codeBookmarkToUriList(props.things, true);
            window.navigator.clipboard.writeText(list);
            toast(
              `all ${list.length} bookmarks are in your clipboard now. Proceed carefully. There is no going back right now.`,
            );
            props.things.forEach((bookmark) => {
              chrome.bookmarks.remove(bookmark.id);
            });
          }}
        >
          <p>Cut</p>
        </button>
        <button
          className={contextMenuButtonClass}
          onClick={() => {
            const list: string = codeBookmarkToUriList(props.things, true);
            window.navigator.clipboard.writeText(list);
            toast(
              `all ${list.length} bookmarks are in your clipboard now.`,
            );
          }}
        >
          <p>Copy</p>
        </button>
        <button
          className={contextMenuButtonClass}
          onClick={() => {
            const output = window.navigator.clipboard.read();
            console.debug(output);
            // todo somehow translate the output into bookmarks
            const newBookmarks: BookmarkCreateArg[] = [];
            newBookmarks.forEach((b) => {
              chrome.bookmarks.create(b);
            });
          }}
        >
          <p>Paste</p>
        </button>
      </div> */
      }

      <hr />
      {props.things.length === 1 && <ShowInFolderButton {...props} />}
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

function ShowInFolderButton(
  props: {
    things: BookmarkNode[];
    setRowsCallback?:
      | ((nodes: BookmarkNode[]) => void)
      | undefined;
    searchResults?: boolean | undefined;
  },
): React.ReactNode {
  return (
    <button
      // todo this doesn't show up
      className={`${
        !props.searchResults && "hidden"
      } ${contextMenuButtonClass}`}
      onClick={(e) => {
        if (!props.setRowsCallback) return;
        chrome
          .bookmarks
          .get(props.things[0].parentId!).then((parents) => {
            if (parents.length > 1) {
              console.error("there is more than one parent for this id");
              return;
            }
            const children: BookmarkNode[] = parents[0]
              .children!;
            props.setRowsCallback!(children);
          });
      }}
    >
      <p>show in folder</p>
    </button>
  );
}
