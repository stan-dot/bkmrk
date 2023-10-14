import {
  GridSelection,
  gridSelectionHasItem,
  Item,
} from "@glideapps/glide-data-grid";
import { BookmarkNode } from "../../../lib/typesFacade";

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
