import DataEditor, { CellClickedEventArgs, Item } from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import { useState } from "react";
import { columns } from "./columnNumberToGridCell";
import { DisplayCurrentPath } from "./DisplayCurrentPath";
import { getData } from "./getData";
import { ManipulationMenu } from "./ManipulationMenu";
import { SearchField } from "./SearchField";
import { SideTree } from "./SideTree";

export function TableLoader(props: {}): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [rows, setRows] = useState([] as chrome.bookmarks.BookmarkTreeNode[]);
  const [currentPath, setCurrentPath] = useState(
    [] as chrome.bookmarks.BookmarkTreeNode[],
  );

  const DEV_NUMBER_OF_BOOKMARKS = 10000;
  if (rows.length === 0) {
    // const idsNumber: number[] = [...Array(DEV_NUMBER_OF_BOOKMARKS).keys()];
    // console.log('ids number:', idsNumber);
    // const ids: string[] = idsNumber.map(v => v.toString());
    // console.log('ids:', ids);

    const rootPromise: Promise<chrome.bookmarks.BookmarkTreeNode[]> = chrome
      .bookmarks.getTree();
    // const treePromise: Promise<chrome.bookmarks.BookmarkTreeNode[]> = chrome
    //   .bookmarks.get(ids);
    // NOTE: the gettree returns the ROOT node, which has 3 children: bookmarks bar, other bookmarks, mobile bookmarkq
    rootPromise.then((root: chrome.bookmarks.BookmarkTreeNode[]) => {
      const main3: chrome.bookmarks.BookmarkTreeNode[] = root[0].children!;
      console.log(main3);
      // try loading bookmarks bar
      const bookmarksBar = main3[0];
      console.log("displaying the bookmarks bar");
      setRows(bookmarksBar.children ?? []);
      setLoaded(true);
      setCurrentPath([bookmarksBar]);
      // setLoaded(true);
      // setRows(nodes);
    });
  }

  const cellClickHandler = (cell: Item, event: CellClickedEventArgs) => {
    const bookmark: chrome.bookmarks.BookmarkTreeNode = rows[cell[1]];
    chrome.tabs.create({ url: bookmark.url });
  };

  return (
    <>
      <nav>
        <svg>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📖</text></svg>"
          >
          </link>
        </svg>

        <div id="lunrSearchField">
          <SearchField
            classNames={undefined}
            searchText={undefined}
            placeholder={undefined}
            disabled={undefined}
            onChange={undefined}
            onEnter={undefined}
            onSearchClick={undefined}
            onBlur={undefined}
          />
        </div>
        <ManipulationMenu
          sortCallback={() => console.log("should sort current location")}
          importCallback={() => console.log("should load the datastructure")}
        />
      </nav>
      <p>loading status:{loaded}</p>
      <p>sorting, keywords - need to do in the data source</p>
      {loaded
        ? (
          <>
            <p>
              side panel for only opening folders with such and such tag, and with
              color moods
            </p>
            <SideTree tree={rows} />
            <DisplayCurrentPath path={currentPath} setter={setCurrentPath} />
            <BookmarkTable rows={rows} cellClickHandler={cellClickHandler} />
          </>
        )
        : <p>Loading...</p>}
    </>
  );
}

function traverseBookmarks(
  bookmarkTreeNodes: chrome.bookmarks.BookmarkTreeNode[],
): void {
  bookmarkTreeNodes.map((node: chrome.bookmarks.BookmarkTreeNode) => {
    console.log(node.title, node.url ? node.url : "[Folder]");
    // todo here execute other necessary actions
    if (node.children) {
      traverseBookmarks(node.children);
    }
  });
}

function BookmarkTable(
  props: {
    rows: chrome.bookmarks.BookmarkTreeNode[];
    cellClickHandler: (cell: Item, event: CellClickedEventArgs) => void;
  },
): JSX.Element {
  return (
    <DataEditor
      onCellContextMenu={props.cellClickHandler}
      onHeaderClicked={() => console.log("clicked header")}
      onCellClicked={() => console.log("todo here create highlight")}
      keybindings={{ "search": true }}
      // showSearch={true}
      getCellContent={getData(props.rows)}
      columns={columns}
      rows={props.rows.length}
    />
  );
}
