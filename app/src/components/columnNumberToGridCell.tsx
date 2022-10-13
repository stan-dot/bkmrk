import { LoadingCell } from "@glideapps/glide-data-grid";
import { GridColumn } from "@glideapps/glide-data-grid";
import { GridCell, GridCellKind } from "@glideapps/glide-data-grid";

export const columns: GridColumn[] = [
  { title: "index", width: 100 },
  { title: "Date Added", width: 100, group: 'Superuser' },
  { title: "URL", width: 100, group: 'Core' },
  { title: "Title", width: 400, group: 'Core' },
  { title: "ID", width: 100 },
  { title: "parentId", width: 100 },
  { title: "Number of Children", width: 100, group: 'Superuser' },
  { title: "Unmodifiable", width: 100, group: 'Extra' },
];

export const columnNumberToGridCell: Map<number, (v: chrome.bookmarks.BookmarkTreeNode) => GridCell> = new Map([
  // index
  [0, (v) => {
    const cell: GridCell = {
      kind: GridCellKind.Text,
      data: v.index?.toString() ?? '-1',
      allowOverlay: false,
      displayData: v.index?.toString() ?? '',
    };
    return cell;
  }],
  // date added
  [1, (v) => {
    const cell: GridCell = {
      kind: GridCellKind.Text,
      data: v.dateAdded?.toString() ?? '-1',
      allowOverlay: false,
      displayData: v.dateAdded?.toString() ?? '',
    };
    return cell;
  }],
  // url
  [2, (v) => {
    return {
      kind: GridCellKind.Text,
      data: v.url ? v.url : '',
      allowOverlay: false,
      displayData: v.url ? v.url : '',
    };
  }],
  // title
  [3, (v) => {
    return {
      kind: GridCellKind.Text,
      data: v.title,
      allowOverlay: false,
      displayData: v.title,
    };
  }],
  // ID
  [4, (v) => {
    return {
      kind: GridCellKind.Text,
      data: v.id,
      allowOverlay: false,
      displayData: v.id,
    };
  }],
  // parent ID
  [5, (v) => {
    return {
      kind: GridCellKind.Text,
      data: v.parentId ? v.parentId! : 'root',
      allowOverlay: false,
      displayData: v.parentId ? v.parentId! : 'root',
    };
  }],
  // number of Children
  [6, (v) => {
    return {
      kind: GridCellKind.Text,
      data: v.children ? v.children.length.toString() : '0',
      allowOverlay: false,
      displayData: v.children ? v.children.length.toString() : '0',
    };
  }],
  // Unmodifiable
  [7, (v) => {
    return {
      kind: GridCellKind.Text,
      data: v.unmodifiable ? v.unmodifiable : '',
      allowOverlay: false,
      displayData: v.unmodifiable ? v.unmodifiable : '',
    };
  }],
]);

export const DEFAULT_GRID_CELL: LoadingCell = {
  kind: GridCellKind.Loading,
  allowOverlay: false
};
