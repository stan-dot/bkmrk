import React, { useCallback, useEffect } from "react";
import { sortRows } from "../../features/sorting/sortRows";
import { BookmarkNode } from "../../lib/typesFacade";
import { useLocation } from "../path/LocationContext";
import { ContextMenuButton } from "./ContextMenuButton";
import { useContextMenu, useContextMenuDispatch } from "./ContextMenuContext";
import { EditDeleteSection } from "./EditDeleteSection";
import { OpenAllSection } from "./OpenAllSection";

const CLOSING_TIMEOUT = 3000;
export function ManySelectedContextMenu(
  props: {
    things: BookmarkNode[];
    setRowsCallback?: (nodes: BookmarkNode[]) => void;
    searchResults?: boolean;
  },
): JSX.Element {
  console.debug("many selected menu for :", props.things);
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

  const showInFolderHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
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
        // todo here must also update path
      });
  };

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
        <EditDeleteSection thing={props.things[0]} protected={isProtected} />}
      <hr />

      {props.things.length === 1 && (
        <ContextMenuButton
          textNode={<p>show in folder</p>}
          callback={showInFolderHandler}
        />
      )}
      <div className="group-changing flex flex-col">
        <ContextMenuButton
          textNode={<p>Sort A-Z</p>}
          callback={() =>
            sortRows(props.things, {
              key: "title",
              reverse: false,
            })}
        />
        <ContextMenuButton
          textNode={<p>Sort by date</p>}
          callback={() =>
            sortRows(props.things, {
              key: "date",
              reverse: false,
            })}
        />
      </div>

      <hr />
      <OpenAllSection things={props.things} />
    </div>
  );
}
