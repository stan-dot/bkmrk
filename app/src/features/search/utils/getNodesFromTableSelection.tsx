import {
  GridSelection,
  gridSelectionHasItem,
  Item,
} from "@glideapps/glide-data-grid";
import React from "react";
import CRUDBookmarkFacade from "../../../lib/CRUDBookmarkFacade";
import { BookmarkNode } from "../../../lib/typesFacade";
import { isAFolder } from "../../../utils/ifHasChildrenFolders";
import {
  ContextMenuActionTypes,
  ContextMenuContextAction,
  useContextMenuDispatch,
} from "../../context-menu/ContextMenuContext";
import { PathAction, usePathDispatch } from "../../path/PathContext";
import { viewDetailsColNumber } from "../../table/columns";

export function runDoubleClickSideEffects(
  col: number,
  b: BookmarkNode,
): void {
  const isFolder = isAFolder(b);
  const contextMenuDispatch = useContextMenuDispatch();
  const pathDispatch = usePathDispatch();

  if (col === viewDetailsColNumber) {
    contextMenuDispatch({
      type: isFolder ? "folder" : "single-bookmark",
      direction: "open",
      // todo change that hardcoded value for position, should be some start of the table maybe
      position: [550, 550],
      things: [b],
    });
  } else if (isFolder) {
    CRUDBookmarkFacade.getPath(b).then((newPath) => {
      console.debug("path:", newPath);
      pathDispatch({
        type: "full",
        nodes: newPath,
      });
    });
  } else {
    chrome.tabs.create({ url: b.url });
  }
}

// todo here logic does not seem to work actualyl
export function decideContextType(
  selectedBookmarks: BookmarkNode[],
): ContextMenuActionTypes {
  return selectedBookmarks.length === 1
    ? "mixed"
    : isAFolder(selectedBookmarks[0])
    ? "folder"
    : "single-bookmark";
}

export function getNodesFromTableSelection(
  rows: BookmarkNode[],
  selection: GridSelection,
  cell: Item,
): BookmarkNode[] {
  const includes: boolean = gridSelectionHasItem(selection, cell);
  if (!includes) return [];
  const start: number = selection.current?.range.y ?? 0;
  const end: number = start + (selection.current?.range.height ?? 0);
  const selectedBookmarks = rows.slice(start, end);
  return selectedBookmarks;
}
