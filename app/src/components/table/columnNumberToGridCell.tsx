import {
  GridCell, GridCellKind, GridColumn, LoadingCell,
  TextCell,
  UriCell
} from "@glideapps/glide-data-grid";

function getFaviconUrl(url?: string): string {
  if (url) return `chrome://favicon/${url}`;
  return "chrome://bookmarks/images/folder_open.svg";
}

type ComprehensiveColDef = {
  static: GridColumn;
  columnGetter: (v: chrome.bookmarks.BookmarkTreeNode) => TextCell | UriCell;
};

function getDisplayableData(d: Date): string {
  const hour: string = `${d.getHours()}:${d.getMinutes()}`;
  const day: string = `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`;
  return `${hour} - ${day}`;
}

function getImageCell(v: chrome.bookmarks.BookmarkTreeNode): UriCell {
  const cell: UriCell = {
    kind: GridCellKind.Uri,
    data: getFaviconUrl(v.url ?? undefined),
    allowOverlay: false,
  };
  return cell;
}

const myCols: ComprehensiveColDef[] = [
  {
    static: { title: "Icon", width: 50 },
    columnGetter: (v) => {
      return getImageCell(v);
    },
  },
  {
    static: { title: "Date Added", width: 190 },
    columnGetter: (v) => {
      const date: Date = new Date(v.dateAdded || 0);
      const cell: GridCell = {
        kind: GridCellKind.Text,
        data: v.dateAdded?.toString() ?? "-1",
        allowOverlay: false,
        displayData: getDisplayableData(date),
      };
      return cell;
    },
  },
  {
    // url unified with number of children, like in Safari
    static: { title: "URL", width: 100 },
    columnGetter: (v) => {
      const display: string = v.url ?? v.children?.length.toString() ??
        "unknown";
      const cell: TextCell = {
        kind: GridCellKind.Text,
        data: v.url ? v.url : "",
        allowOverlay: false,
        displayData: display,
      };
      return cell;
    },
  },
  {
    static: { title: "Title", width: 600 },
    columnGetter: (v) => {
      const cell: TextCell = {
        kind: GridCellKind.Text,
        data: v?.title ?? "empty",
        allowOverlay: false,
        displayData: v.title,
      };
      return cell;
    },
  },
  {
    static: { title: "Button", width: 100 },
    columnGetter: (v) => {
      const cell: GridCell = {
        kind: GridCellKind.Text,
        data: v.index?.toString() ?? "-1",
        allowOverlay: false,
        displayData: v.index?.toString() ?? "",
      };
      return cell;
    },
  },
];

const arr: [number, (v: chrome.bookmarks.BookmarkTreeNode) => TextCell | UriCell][] = myCols.map((v, i) => [i, v.columnGetter])

export const columnNumberToGridCell: Map<
  number,
  (v: chrome.bookmarks.BookmarkTreeNode) => TextCell | UriCell
> = new Map(arr);
export const DEFAULT_GRID_CELL: LoadingCell = {
  kind: GridCellKind.Loading,
  allowOverlay: false,
};

export const columns: GridColumn[] = myCols.map((c) => c.static);
