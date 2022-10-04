
import DataEditor, { LoadingCell } from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import React, { useState } from "react";
import { GridColumn } from "@glideapps/glide-data-grid";
import { GridCell, GridCellKind, Item } from "@glideapps/glide-data-grid";
import { makeFolder } from "../dataProcessing/interact";


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
  const [currentPath, setCurrentPath] = useState([] as chrome.bookmarks.BookmarkTreeNode[]);

  const treePromise: Promise<chrome.bookmarks.BookmarkTreeNode[]> = chrome.bookmarks.getTree();
  treePromise.then((nodes: chrome.bookmarks.BookmarkTreeNode[]) => {
    console.log(nodes);
    setLoaded(true);
    setRows(nodes);
    setCurrentPath([nodes[0]]);
  });

  return <>
    <Icon />
    <ManipulationMenu />
    <p>loading status:{loaded}</p>
    <p>sorting, keywords - need to do in the data source</p>
    {
      loaded
        ?
        <>
          <SideTree tree={rows} />
          <DisplayCurrentPath path={currentPath} setter={setCurrentPath} />
          <BookmarkTable rows={rows} />
        </>
        :
        <p>Loading...</p>
    }
  </>
}


function DisplayCurrentPath(props: {
  path: chrome.bookmarks.BookmarkTreeNode[],
  setter: React.Dispatch<React.SetStateAction<chrome.bookmarks.BookmarkTreeNode[]>>
}): JSX.Element {

  // goes backs, changes the current location, the current pathq
  const handleClick = (node: chrome.bookmarks.BookmarkTreeNode, index: number) => {
    props.setter(props.path.slice(0, index));
  }

  // creates a '>' linked horizontal list of locations, genealogy of the currrent path
  return <div style={{ 'display': 'flex' }}>
    {props.path.map((node: chrome.bookmarks.BookmarkTreeNode, index: number) => {
      return <div>
        <button onClick={v => handleClick(node, index)}>
          {node.title}
        </button>
        {'>'}
      </div>
    })}
  </div>
}


function traverseBookmarks(bookmarkTreeNodes: chrome.bookmarks.BookmarkTreeNode[]): void {
  for (var i = 0; i < bookmarkTreeNodes.length; i++) {
    console.log(bookmarkTreeNodes[i].title, bookmarkTreeNodes[i].url ? bookmarkTreeNodes[i].url : "[Folder]");
    if (bookmarkTreeNodes[i].children) {
      traverseBookmarks(bookmarkTreeNodes[i].children!);
    }

  }
}

function Icon() {
  return <p>icon</p>;
}

function ManipulationMenu(): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  // sort by name, add new BookmarkTable, add new makeFolderimport bookmarks, export bookmarks, help center
  //todo export should be native

  // keywords, tags, in the title tbh
  const ar: chrome.bookmarks.BookmarkCreateArg = {};

  return <div>
    {
      showMenu
        ?
        <div>

          <ul>
            <li>sort by name</li>
            <li>add new bookmark</li>
            <li>add new folder</li>
            <li>import bookmarks</li>
            <li>export bookmarks</li>
            <li> help center</li>
          </ul>
        </div>
        :
        <p>show svg for 3 dots</p>}


  </div>

}

function SideTree(props: { tree: chrome.bookmarks.BookmarkTreeNode[] }): JSX.Element {
  return <>
    <p>side panel with the tree</p>
    <p>scroll indicator on the side</p>
  </>
}


function BookmarkTable(props: { rows: chrome.bookmarks.BookmarkTreeNode[] }): JSX.Element {

  return <DataEditor keybindings={{ 'search': true }} showSearch={true} getCellContent={getData(props.rows)} columns={columns} rows={props.rows.length} />

}