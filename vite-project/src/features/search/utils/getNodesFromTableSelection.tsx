import {
  GridSelection,
  gridSelectionHasItem,
  Item,
} from "@glideapps/glide-data-grid";
import CRUDBookmarkFacade from "../../../lib/CRUDBookmarkFacade";
import { BookmarkNode } from "../../../lib/typesFacade";
import { isAFolder } from "../../../utils/ifHasChildrenFolders";
import { viewDetailsColNumber } from "../../table/columns";

export function runDoubleClickSideEffects(
  col: number,
  b: BookmarkNode,
  contextMenuDispatch: Function,
  pathDispatch: Function,
): void {
  const isFolder = isAFolder(b);

  if (col === viewDetailsColNumber) {
    contextMenuDispatch({
      type: isFolder ? "folder" : "single-bookmark",
      direction: "open",
      // todo change that hardcoded value for position, should be some start of the table maybe
      position: [550, 550],
      things: [b],
    });
  } else if (isFolder) {
    CRUDBookmarkFacade.getPathOfABookmark(b).then((newPath) => {
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
