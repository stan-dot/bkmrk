
import DataEditor, { LoadingCell } from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import { useState } from "react";
import { GridColumn } from "@glideapps/glide-data-grid";
import { GridCell, GridCellKind, Item } from "@glideapps/glide-data-grid";


const columns: GridColumn[] = [
  { title: "index", width: 100 },
  { title: "Date Added", width: 100 },
  { title: "URL", width: 100 },
  { title: "Title", width: 100 },
  { title: "ID", width: 100 },
  { title: "parentId", width: 100 },
  { title: "Number of Children", width: 100 },
  { title: "Unmodifiable", width: 100 },
];

const columnNumberToGridCell: Map<number, (v: chrome.bookmarks.BookmarkTreeNode) => GridCell> = new Map([
  [0, (v) => {
    const cell: GridCell = {
      kind: GridCellKind.Text,
      data: v.index?.toString() ?? '-1',
      allowOverlay: false,
      displayData: v.index?.toString() ?? '',
    };
    return cell
  }],
  [1, (v) => {
    const cell: GridCell = {
      kind: GridCellKind.Text,
      data: v.index?.toString() ?? '-1',
      allowOverlay: false,
      displayData: v.index?.toString() ?? '',
    };
    return cell
  }],
])

const DEFAULT_GRID_CELL: LoadingCell = {
  kind: GridCellKind.Loading,
  allowOverlay: false
};


// If fetching data is slow you can use the DataEditor ref to send updates for cells
// once data is loaded.
function getData(bookmarksArr: chrome.bookmarks.BookmarkTreeNode[]): ([col, row]: Item) => GridCell {
  const curriedFunction: ([col, row]: Item) => GridCell = (v: Item) => {
    const columnSpecificFunction = columnNumberToGridCell.get(v[0]);
    if (columnSpecificFunction === undefined) return DEFAULT_GRID_CELL as GridCell;
    const bookmark: chrome.bookmarks.BookmarkTreeNode = bookmarksArr[v[1]];
    return columnSpecificFunction(bookmark);
  }
  return curriedFunction;
}

export function TableLoader(props: {}): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [rows, setRows] = useState([] as chrome.bookmarks.BookmarkTreeNode[]);

  // tbh this doesn't track the current location status
  const treePromise: Promise<chrome.bookmarks.BookmarkTreeNode[]> = chrome.bookmarks.getTree();
  treePromise.then((nodes: chrome.bookmarks.BookmarkTreeNode[]) => {
    console.log(nodes);
    setLoaded(true);
    setRows(nodes);
  });

  return <>
    <p>loading status:{loaded}</p>
    {
      loaded
        ?
        <BookmarkTable rows={rows} />
        :
        <p>Loading...</p>
    }
  </>
}


function BookmarkTable(props: { rows: chrome.bookmarks.BookmarkTreeNode[] }): JSX.Element {

  return <DataEditor getCellContent={getData(props.rows)} columns={columns} rows={props.rows.length} />

}