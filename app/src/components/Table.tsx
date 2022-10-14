import { CellClickedEventArgs, Item } from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import { useEffect, useState } from "react";
import { BookmarkTable } from "./table/BookmarkTable";
import { BrandingSection } from "./navbar/BrandingSection";
import { isAFolder } from "../functions/ifHasChildrenFolders";
import { ManipulationMenu } from "./navbar/ManipulationMenu";
import { SearchField } from "./navbar/SearchField";
import { SideTree } from "./sidePanel/SideTree";
import { PathDisplay } from "./table/PathDisplay";

/**
 * todo this needs to find the easiest path for the final root
 * @param node
 */
export async function getPath(
  node: chrome.bookmarks.BookmarkTreeNode,
): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
  let output: chrome.bookmarks.BookmarkTreeNode[] = [node];
  let lastNode: chrome.bookmarks.BookmarkTreeNode = node;
  while (lastNode.parentId) {
    const parent = await chrome.bookmarks.get(lastNode.parentId);
    console.log("getting parent of the clicked element", parent);
    output.unshift(parent[0]);
    lastNode = parent[0];
  }
  return output;
}

export function TableLoader(props: {}): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [rows, setRows] = useState([] as chrome.bookmarks.BookmarkTreeNode[]);
  const [globalTree, setGlobalTree] = useState([] as chrome.bookmarks.BookmarkTreeNode[]);
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
      setGlobalTree(main3);
      // setLoaded(true);
      // setRows(nodes);
    });
  }

  const cellClickHandler = (cell: Item, event: CellClickedEventArgs) => {
    // check if it's folder or a bookmark
    const bookmark: chrome.bookmarks.BookmarkTreeNode = rows[cell[1]];
    if (isAFolder(bookmark)) {
      getPath(bookmark).then((path) => {
        setCurrentPath(path);
      });
    } else {
      chrome.tabs.create({ url: bookmark.url });
    }
  };

  useEffect(() => {
    console.log('reacting to a change in path', currentPath);
    const last: chrome.bookmarks.BookmarkTreeNode = currentPath[currentPath.length - 1];
    console.log(last);
    const children: chrome.bookmarks.BookmarkTreeNode[] | undefined = last?.children ?? undefined;
    if (children) {
      // display the rows there
      setRows(children);
    }
  }, [currentPath])

  const pathChangeHandler = (nodes: chrome.bookmarks.BookmarkTreeNode[]) => {
    setCurrentPath(nodes);
    console.log('reacting to a change in path', currentPath);
    const last: chrome.bookmarks.BookmarkTreeNode = currentPath[currentPath.length - 1];
    const children: chrome.bookmarks.BookmarkTreeNode[] | undefined = last?.children ?? undefined;
    console.log('last element of the path', last, ' its children :', children);
    if (children) {
      // display the rows there
      setRows(children);
    }
  }


  const SEARCH_PLACEHOLDER = "Search bookmarks";
  const [sideTreeWidth, setSideTreeWidth] = useState(240);

  const navStyles: React.CSSProperties = {
    justifyContent: "space-between",
    display: "inline-flex",
    position: "fixed",
    width: "100%",
    left: "0px",
    border: "2px solid",
    borderColor: "red",
  };
  return (
    <>
      <nav style={navStyles}>
        <BrandingSection />
        <SearchField
          classNames={undefined}
          searchText={undefined}
          placeholder={SEARCH_PLACEHOLDER}
          disabled={undefined}
          onChange={undefined}
          onEnter={undefined}
          onSearchClick={undefined}
          onBlur={undefined}
        />
        <ManipulationMenu
          sortCallback={() => console.log("should sort current location")}
          importCallback={() => console.log("should load the datastructure")}
        />
      </nav>
      {loaded
        ? (
          <>
            <div id="sidePanel" style={{ position: "absolute", top: "120px" }}>
              <SideTree tree={globalTree} pathSetter={setCurrentPath} />
            </div>
            <div
              id="mainContainer"
              style={{ position: "absolute", top: "150px", left: "200px" }}
            // style={{ position: "relative", left: `${sideTreeWidth}px` }}g
            >
              <PathDisplay path={currentPath} setter={pathChangeHandler} />
              <BookmarkTable rows={rows} globalClickHandler={cellClickHandler} />
            </div>
          </>
        )
        : (
          <div
            id="Loading status"
            style={{
              position: "absolute",
              top: "120px",
              left: "200px",
            }}
          >
            <p>Loading...</p>
          </div>
        )}
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
