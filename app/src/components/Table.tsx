
import DataEditor, { CellClickedEventArgs } from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import React, { useState } from "react";
import { GridCell, Item } from "@glideapps/glide-data-grid";
import { columnNumberToGridCell, DEFAULT_GRID_CELL, columns } from "./columnNumberToGridCell";
import { DisplayCurrentPath } from "./DisplayCurrentPath";
import { ManipulationMenu } from "./ManipulationMenu";
import { SideTree } from "./SideTree";



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
    <ManipulationMenu sortCallback={() => console.log('should sort current location')} importCallback={() => console.log('should load the datastructure')} />
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


function traverseBookmarks(bookmarkTreeNodes: chrome.bookmarks.BookmarkTreeNode[]): void {
  bookmarkTreeNodes.map((node: chrome.bookmarks.BookmarkTreeNode) => {
    console.log(node.title, node.url ? node.url : '[Folder]');
    // todo here execute other necessary actions
    if (node.children) {
      traverseBookmarks(node.children);
    }
  })
}



function BookmarkTable(props: { rows: chrome.bookmarks.BookmarkTreeNode[], cellClickHandler: ((cell: Item, event: CellClickedEventArgs) => void) }): JSX.Element {

  return <DataEditor onHeaderClicked={() => console.log('clicked header')} onCellClicked={props.cellClickHandler} keybindings={{ 'search': true }} showSearch={true} getCellContent={getData(props.rows)} columns={columns} rows={props.rows.length} />

}
