
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
    <p> some svg icon</p>
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


function DisplayCurrentPath(props: {
  path: chrome.bookmarks.BookmarkTreeNode[],
  setter: React.Dispatch<React.SetStateAction<chrome.bookmarks.BookmarkTreeNode[]>>
}): JSX.Element {

  // goes backs, changes the current location, the current path
  const handleClick = (node: chrome.bookmarks.BookmarkTreeNode, index: number) => {
    props.setter(props.path.slice(0, index));
  }

  const text: string = props.path.map((b: chrome.bookmarks.BookmarkTreeNode) => b.title).join('/');
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
    <button onClick={() => window.navigator.clipboard.writeText(text)}>Copy path</button>
  </div>
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



function ManipulationMenu(props: { sortCallback: Function, importCallback: Function }): JSX.Element {
  enum OpenMenuStates {
    IMPORT,
    EXPORT,
    NEW_FOLDER,
    NEW_BOOKMARK,
  }
  const [showMenu, setShowMenu] = useState(false);
  const [openVariant, setOpenVariant] = useState(OpenMenuStates.NEW_BOOKMARK);

  // sort by name, add new BookmarkTable, add new makeFolderimport bookmarks, export bookmarks, help center

  // todo there should be dialog popups for the new bookmark and new folder
  return <div>
    {
      showMenu
        ?
        <div>
          <ul>
            <li>sort by name <button onClick={v => props.sortCallback} /></li>
            <li>sort by date made<button onClick={v => props.sortCallback} /></li>
            <li>add new bookmark <button onClick={v => makeBookmark('someId')} /></li>
            <li>add new folder <button onClick={v => makeFolder('test', 'someid')} /></li>
            <li>import bookmarks<button onClick={v => setOpenVariant(OpenMenuStates.IMPORT)}>import</button></li>
            <li>export bookmarks <button onClick={v => exportBookmarks}>export</button></li>
            <li> help center</li>
          </ul>
        </div>
        : <div>
          <p>svg for 3 dots</p>
          <button onClick={v => setShowMenu(true)}>Open</button>
        </div>
    }
    {
      openVariant === OpenMenuStates.IMPORT ?? <BookmarkImportWindow callback={props.importCallback} />
    }

    {
      openVariant === OpenMenuStates.NEW_BOOKMARK ?? <NewBookmarkWindow />
    }
    {
      openVariant === OpenMenuStates.NEW_FOLDER ?? <NewFolderWindow />
    }
  </div >
}

function NewBookmarkWindow(props: {}): JSX.Element {
  return <dialog>
    <p>hi, what's the new bookmark that you need?</p>
  </dialog>
}

function NewFolderWindow(props: {}): JSX.Element {
  return <dialog>
    <p>hi, what's the new folder that you need?</p>
  </dialog>
}

/**
 * todo use this link
 * https://codesandbox.io/s/lpjol1opmq
 * @param props 
 * @returns 
 */
function SideTree(props: { tree: chrome.bookmarks.BookmarkTreeNode[] }): JSX.Element {
  /**
   * for each node there is 1 state variable - open /close
   */
  return <>
    <p>side panel with the tree</p>
    <p>scroll indicator on the side</p>
    <div>
      <h3>test one name</h3>

    </div>
  </>
}

function isAFolder(item: chrome.bookmarks.BookmarkTreeNode): boolean {
  return !item.url
}
function ifHasChildrenFolders(item: chrome.bookmarks.BookmarkTreeNode): boolean {
  if (!item.children) {
    return false;
  }
  const someThatFills: chrome.bookmarks.BookmarkTreeNode | undefined = item.children.find(v => isAFolder(v));
  return someThatFills ? true : false;
}

function getChildrenLinks(item: chrome.bookmarks.BookmarkTreeNode): chrome.bookmarks.BookmarkTreeNode[] {
  if (!item.children) {
    return [];
  }
  return item.children.filter(v => !isAFolder(v));
}

/**
 * this doesn't assume that children are present, but if no children, it shouldn't show as active when only folders
 * @param parent 
 * @param newWindow 
 * @param incognito 
 */
async function openAllChildren(parent: chrome.bookmarks.BookmarkTreeNode, newWindow?: boolean, incognito?: boolean): Promise<void> {
  const children: chrome.bookmarks.BookmarkTreeNode[] | undefined = parent.children;
  if (!children) return;

  const standard: boolean = (!newWindow && !incognito);
  const currentWindow: chrome.windows.Window = await chrome.windows.getCurrent();
  // todo why is this possibly undefined?
  let finalId: number = currentWindow.id!;
  if (!standard) {
    const createData: chrome.windows.CreateData = { 'incognito': incognito ?? false };
    const openedNewWindow: chrome.windows.Window = await chrome.windows.create(createData);
    finalId = openedNewWindow.id!;
  }

  const propertiesGenerator: (url: string) => chrome.tabs.CreateProperties = (url: string) => {
    const props: chrome.tabs.CreateProperties = { windowId: finalId, url: url };
    return props;
  };

  children.forEach((b: chrome.bookmarks.BookmarkTreeNode) => {
    if (!isAFolder(b)) {
      chrome.tabs.create(propertiesGenerator(b.url!));
    }
  })
}

/**
 * for side displaying FOLDERS ONLY
 * need to display with some offset to the fight
 * todo maybe add display children prop
 * @param props 
 * @returns 
 */
function SideTreeElement(props: { thing: chrome.bookmarks.BookmarkTreeNode }): JSX.Element {
  const [unrolled, setUnrolled] = useState(false);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const hasChildrenFolders: boolean = ifHasChildrenFolders(props.thing);
  const childrenLinks: chrome.bookmarks.BookmarkTreeNode[] = getChildrenLinks(props.thing);
  const hasChildrenLinks: boolean = childrenLinks.length > 0;
  const handleClick = () => {
    console.log('should change the path to this dir');
    // todo integrate via some callback
  }

  /**
   * on the context menu
   * - rename - edit bookmark fucntion
   * - delete - delete bookmark - just fetch the api
   * - cut - need to have the clipboard integrated tbh, but only link changes location
   * - copy - like cut in many ways
   * - paste - using the clipboard
   * - open all (number) - the simplest function
   * - open all (number) in new window
   * - open all (number) in Incognito window
   */



  const handleContextMenu = () => {

  };

  return <div style={{ 'display': 'flex' }} id={`${props.thing.id}-side-tree-row`}  >
    {
      hasChildrenFolders ?? <div id={`${props.thing.id}-arrow`}>
        {
          unrolled
            ?
            <button onClick={e => setUnrolled(false)}>
              <p>arrow down svg</p>
            </button>
            :
            <button onClick={e => setUnrolled(true)}>
              <p>arrow right svg</p>
            </button>
        }
      </div>
    }
    <div>
      <button onClick={e => handleClick} onContextMenu={e => handleContextMenu}>
        <p>{props.thing.title}</p>
      </button>
    </div>
    {
      contextMenuOpen
      ??
      <div>
        <div className="group1">
          <p>rename button</p>
          <p>delete button</p>
        </div>
        <div className="group2">
          <p>cut button</p>
          <p>copy buton</p>
          <p>paste buton</p>

        </div>
        <div className="group3">
          <button onClick={e => openAllChildren(props.thing)} disabled={!hasChildrenLinks}>
            <p>open all {childrenLinks.length}</p>
          </button>
          <button onClick={e => openAllChildren(props.thing, true)} disabled={!hasChildrenLinks}>
            <p>open all {childrenLinks.length} in new window</p>
          </button>
          <button onClick={e => openAllChildren(props.thing, true, true)} disabled={!hasChildrenLinks}>
            <p>open all {childrenLinks.length} in Incognito winow</p>
          </button>

        </div>
      </div>
    }
  </div>

}

function BookmarkTable(props: { rows: chrome.bookmarks.BookmarkTreeNode[], cellClickHandler: ((cell: Item, event: CellClickedEventArgs) => void) }): JSX.Element {

  return <DataEditor onHeaderClicked={() => console.log('clicked header')} onCellClicked={props.cellClickHandler} keybindings={{ 'search': true }} showSearch={true} getCellContent={getData(props.rows)} columns={columns} rows={props.rows.length} />

}