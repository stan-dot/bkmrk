import { LoadingCell } from "@glideapps/glide-data-grid";
import { GridColumn } from "@glideapps/glide-data-grid";
import { GridCell, GridCellKind } from "@glideapps/glide-data-grid";

export const columns: GridColumn[] = [
  // { title: "index", width: 40 },
  // { title: "ID", width: 400},
  { title: "Date Added", width: 90 },
  { title: "URL", width: 100 },
  { title: "Title", width: 600 },
  { title: "Number of Children", width: 200 },
  // { title: "parentId", width: 100},
  // { title: "Unmodifiable", width: 100, group: 'Extra' },
];


function getDisplayableData(d: Date): string {
  const hour: string = `${d.getHours()}:${d.getMinutes()}`;
  const day: string = `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`;
  return `${hour} - ${day}`
}


export const columnNumberToGridCell: Map<number, (v: chrome.bookmarks.BookmarkTreeNode) => GridCell> = new Map([
  // index
  // [0, (v) => {
  //   const cell: GridCell = {
  //     kind: GridCellKind.Text,
  //     data: v.index?.toString() ?? '-1',
  //     allowOverlay: false,
  //     displayData: v.index?.toString() ?? '',
  //   };
  //   return cell;
  // }],
  // date added
  [0, (v) => {
    const date: Date = new Date(v.dateAdded || 0);
    const cell: GridCell = {
      kind: GridCellKind.Text,
      data: v.dateAdded?.toString() ?? '-1',
      allowOverlay: false,
      displayData: getDisplayableData(date),
    };
    return cell;
  }],
  // url
  [1, (v) => {
    return {
      kind: GridCellKind.Text,
      data: v.url ? v.url : '',
      allowOverlay: false,
      displayData: v.url ? v.url : '',
    };
  }],
  // title
  [2, (v) => {
    return {
      kind: GridCellKind.Text,
      data: v.title,
      allowOverlay: false,
      displayData: v.title,
    };
  }],
  // number of Children
  [3, (v) => {
    return {
      kind: GridCellKind.Text,
      data: v.children ? v.children.length.toString() : '0',
      allowOverlay: false,
      displayData: v.children ? v.children.length.toString() : '0',
    };
  }],
  // ID
  // [4, (v) => {
  //   return {
  //     kind: GridCellKind.Text,
  //     data: v.id,
  //     allowOverlay: false,
  //     displayData: v.id,
  //   };
  // }],
  // parent ID
  // [5, (v) => {
  //   return {
  //     kind: GridCellKind.Text,
  //     data: v.parentId ? v.parentId! : 'root',
  //     allowOverlay: false,
  //     displayData: v.parentId ? v.parentId! : 'root',
  //   };
  // }],
  // Unmodifiable
  // [4, (v) => {
  //   return {
  //     kind: GridCellKind.Text,
  //     data: v.unmodifiable ? v.unmodifiable : '',
  //     allowOverlay: false,
  //     displayData: v.unmodifiable ? v.unmodifiable : '',
  //   };
  // }],
]);

export const DEFAULT_GRID_CELL: LoadingCell = {
  kind: GridCellKind.Loading,
  allowOverlay: false
};
