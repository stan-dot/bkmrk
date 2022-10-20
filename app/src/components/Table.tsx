import "@glideapps/glide-data-grid/dist/index.css";
import { useEffect, useState } from "react";
import { BrandingSection } from "./navbar/BrandingSection";
import { ManipulationMenu } from "./navbar/ManipulationMenu";
import { SearchField } from "./navbar/SearchField";
import { SideTree } from "./sidePanel/SideTree";
import { BookmarkTable } from "./table/BookmarkTable";
import { PathDisplay } from "./table/PathDisplay";

const navStyles: React.CSSProperties = {
  justifyContent: "space-between",
  display: "inline-flex",
  position: "fixed",
  width: "100%",
  left: "0px",
  border: "2px solid",
  borderColor: "red",
};

export function TableLoader(props: {}): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [rows, setRows] = useState([] as chrome.bookmarks.BookmarkTreeNode[]);
  const [globalTree, setGlobalTree] = useState(
    [] as chrome.bookmarks.BookmarkTreeNode[],
  );
  const [currentPath, setCurrentPath] = useState(
    [] as chrome.bookmarks.BookmarkTreeNode[],
  );

  if (!loaded) {
    /**
     * NOTE: the getTree method returns the ROOT node, which has 3 children: bookmarks bar, other bookmarks, mobile bookmarks.
     * these only show up if not empty
     */
    chrome.bookmarks.getTree().then(
      (root: chrome.bookmarks.BookmarkTreeNode[]) => {
        const main3: chrome.bookmarks.BookmarkTreeNode[] = root[0].children!;
        console.log(main3);
        // try loading bookmarks bar
        const bookmarksBar = main3[0];
        setRows(bookmarksBar.children ?? []);
        setLoaded(true);
        setCurrentPath([root[0], bookmarksBar]);
        setGlobalTree(main3);
      },
    );
  }

  useEffect(() => {
    console.log("reacting to a change in path", currentPath);
    const last: chrome.bookmarks.BookmarkTreeNode =
      currentPath[currentPath.length - 1];
    const children: chrome.bookmarks.BookmarkTreeNode[] | undefined =
      last?.children ?? undefined;
    if (children) {
      console.log("about to set path to children:", children);
      setRows(children);
    }
  }, [currentPath]);

  const pathChangeHandler = (
    nodesForNewPath: chrome.bookmarks.BookmarkTreeNode[],
  ): void => {
    console.log(
      "reacting to a change in path",
      currentPath,
      " new path: ",
      nodesForNewPath,
    );
    const currentLocationLastOnPath: chrome.bookmarks.BookmarkTreeNode =
      nodesForNewPath[nodesForNewPath.length - 1];
    const children: chrome.bookmarks.BookmarkTreeNode[] =
      currentLocationLastOnPath?.children ?? [];
    setCurrentPath(nodesForNewPath);
    console.log("about to set path to children:", children);
    setRows(children);
    // console.log(
    //   "last element of the path",
    //   currentLocationLastOnPath,
    //   " its children :",
    //   children,
    // );
  };

  const SEARCH_PLACEHOLDER = "Search bookmarks";
  const [sideTreeWidth, setSideTreeWidth] = useState(240);

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
              <SideTree
                tree={globalTree}
                pathSetter={setCurrentPath}
                path={currentPath}
              />
            </div>
            <div
              id="mainContainer"
              style={{ position: "absolute", top: "150px", left: "200px" }}
            >
              <PathDisplay path={currentPath} setter={pathChangeHandler} />
              <BookmarkTable
                rows={rows}
                pathChangeHandler={pathChangeHandler}
              />
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
