import { GridCell, Item } from "@glideapps/glide-data-grid";
import {
  columnNumberToGridCell,
  DEFAULT_GRID_CELL,
} from "./columnNumberToGridCell";

// If fetching data is slow you can use the DataEditor ref to send updates for cells
// once data is loaded.
export function getData(
  bookmarksArr: chrome.bookmarks.BookmarkTreeNode[],
): ([col, row]: Item) => GridCell {
  const curriedFunction: ([col, row]: Item) => GridCell = (
    colRowCoordinates: Item,
  ) => {
    const columnSpecificFunction = columnNumberToGridCell.get(
      colRowCoordinates[0],
    );
    if (columnSpecificFunction === undefined) {
      return DEFAULT_GRID_CELL as GridCell;
    }
    const bookmark: chrome.bookmarks.BookmarkTreeNode =
      bookmarksArr[colRowCoordinates[1]];
    return columnSpecificFunction(bookmark);
  };
  return curriedFunction;
}
