
import DataEditor, { CellClickedEventArgs, LoadingCell } from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import React, { useState } from "react";
import { GridColumn } from "@glideapps/glide-data-grid";
import { GridCell, GridCellKind, Item } from "@glideapps/glide-data-grid";
import { makeBookmark, makeFolder } from "../dataProcessing/interact";
import { exportBookmarks } from "../io/exportBookmarks";
import { BookmarkImportWindow } from "../io/importBookmarks";



const columns: GridColumn[] = [
  { title: "index", width: 100 },
  { title: "Date Added", width: 100, group: 'Superuser' },
  { title: "URL", width: 100, group: 'Core' },
  { title: "Title", width: 100, group: 'Core' },
  { title: "ID", width: 100 },
  { title: "parentId", width: 100 },
  { title: "Number of Children", width: 100, group: 'Superuser' },
  { title: "Unmodifiable", width: 100, group: 'Extra' },
];

const columnNumberToGridCell: Map<number, (v: chrome.bookmarks.BookmarkTreeNode) => GridCell> = new Map([
  // index
  [0, (v) => {
    const cell: GridCell = {
      kind: GridCellKind.Text,
      data: v.index?.toString() ?? '-1',
      allowOverlay: false,
      displayData: v.index?.toString() ?? '',
    };
    return cell
  }],
  // date added
  [1, (v) => {
    const cell: GridCell = {
      kind: GridCellKind.Text,
      data: v.dateAdded?.toString() ?? '-1',
      allowOverlay: false,
      displayData: v.dateAdded?.toString() ?? '',
    };
    return cell
  }],
  // url
  [2, (v) => {
    return {
      kind: GridCellKind.Text,
      data: v.url ? v.url : '',
      allowOverlay: false,
      displayData: v.url ? v.url : '',
    }
  }],
  // title
  [3, (v) => {
    return {
      kind: GridCellKind.Text,
      data: v.title,
      allowOverlay: false,
      displayData: v.title,
    }
  }],
  // ID
  [4, (v) => {
    return {
      kind: GridCellKind.Text,
      data: v.id,
      allowOverlay: false,
      displayData: v.id,
    }
  }],
  // parent ID
  [5, (v) => {
    return {
      kind: GridCellKind.Text,
      data: v.parentId ? v.parentId! : 'root',
      allowOverlay: false,
      displayData: v.parentId ? v.parentId! : 'root',
    }
  }],
  // number of Children
  [6, (v) => {
    return {
      kind: GridCellKind.Text,
      data: v.children ? v.children.length.toString() : '0',
      allowOverlay: false,
      displayData: v.children ? v.children.length.toString() : '0',
    }
  }],
  // Unmodifiable
  [7, (v) => {
    return {
      kind: GridCellKind.Text,
      data: v.unmodifiable ? v.unmodifiable : '',
      allowOverlay: false,
      displayData: v.unmodifiable ? v.unmodifiable : '',
    }
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

  const cellClickHandler = (cell: Item, event: CellClickedEventArgs) => {
    const bookmark: chrome.bookmarks.BookmarkTreeNode = rows[cell[1]];
    chrome.tabs.create({ url: bookmark.url })
  };

  return <>
    <Icon />
    <ManipulationMenu sortCallback={() => console.log('should sort current location')} importCallback={() => console.log('should open the filesystem to look 4 files')} />
    <p>loading status:{loaded}</p>
    <p>sorting, keywords - need to do in the data source</p>
    {
      loaded
        ?
        <>
          <SideTree tree={rows} />
          <DisplayCurrentPath path={currentPath} setter={setCurrentPath} />
          <BookmarkTable rows={rows} cellClickHandler={cellClickHandler} />
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

  // goes backs, changes the current location, the current path
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

function ManipulationMenu(props: { sortCallback: Function, importCallback: Function }): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  const [importWindowOpen, setImportWindowOpen] = useState(false);
  // sort by name, add new BookmarkTable, add new makeFolderimport bookmarks, export bookmarks, help center

  // keywords, tags, in the title tbh
  const ar: chrome.bookmarks.BookmarkCreateArg = {};

  // todo there should be dialog popups for the new bookmark and new folder
  return <div>
    {
      showMenu
        ?
        <div>
          <ul>
            <li>sort by name <button onClick={v => props.sortCallback} /></li>
            <li>add new bookmark <button onClick={v => makeBookmark('someId')} /></li>
            <li>add new folder <button onClick={v => makeFolder('test', 'someid')} /></li>
            <li>import bookmarks<button onClick={v => setImportWindowOpen(true)}>import</button></li>
            <li>export bookmarks <button onClick={v => exportBookmarks}>export</button></li>
            <li> help center</li>
          </ul>
        </div>
        : <p>show svg for 3 dots</p>
    }
    {
      importWindowOpen ?? <BookmarkImportWindow callback={props.importCallback} />
    }

  </div >

}

function SideTree(props: { tree: chrome.bookmarks.BookmarkTreeNode[] }): JSX.Element {
  /**
   * on the context menu
   * - rename
   * - delete
   * - cut
   * - copy
   * - paste
   * - open all (number)
   * - open all (number) in new window
   * - open all (number) in Incognito window
   */
  return <>
    <p>side panel with the tree</p>
    <p>scroll indicator on the side</p>
  </>
}


function BookmarkTable(props: { rows: chrome.bookmarks.BookmarkTreeNode[], cellClickHandler: ((cell: Item, event: CellClickedEventArgs) => void) }): JSX.Element {

  return <DataEditor onHeaderClicked={() => console.log('clicked header')} onCellClicked={props.cellClickHandler} keybindings={{ 'search': true }} showSearch={true} getCellContent={getData(props.rows)} columns={columns} rows={props.rows.length} />

}