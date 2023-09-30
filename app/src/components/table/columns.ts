import {
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
  LoadingCell,
} from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { CellGetter, myCols } from "./columnDefinitions";

const columnNumberToGridCell: Map<number, CellGetter> = new Map(
  myCols.map((v, i) => [i, v.columnGetter]),
);

const DEFAULT_GRID_CELL: LoadingCell = {
  kind: GridCellKind.Loading,
  allowOverlay: false,
};

// If fetching data is slow you can use the DataEditor ref to send updates for cells
// once data is loaded.
export function getData(
  bookmarksArr: chrome.bookmarks.BookmarkTreeNode[],
): ([col, row]: Item) => GridCell {
  const curriedFunction: ([col, row]: Item) => GridCell = (
    coordinates: Item,
  ) => {
    const col = coordinates[0];
    const row = coordinates[1];

    const columnSpecificFunction = columnNumberToGridCell.get(col);

    if (columnSpecificFunction === undefined) {
      return DEFAULT_GRID_CELL as GridCell;
    }
    const bookmark: chrome.bookmarks.BookmarkTreeNode = bookmarksArr[row];
    return columnSpecificFunction(bookmark);
  };
  return curriedFunction;
}

export const viewDetailsColNumber: number = myCols.findIndex((c) =>
  c.static.title === "Actions"
);

export const columns: GridColumn[] = myCols.map((c) => c.static);
