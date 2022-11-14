import "@glideapps/glide-data-grid/dist/index.css";
import { useState } from "react";
import { BrandingSection } from "./navbar/BrandingSection";
import { ManipulationMenu } from "./navbar/ManipulationMenu";
import { SearchField } from "./navbar/SearchField";
import { PathDisplay } from "./path/PathDisplay";
import { SideTree } from "./sidePanel/SideTree";
import { BookmarkTable } from "./table/BookmarkTable";

const navStyles: React.CSSProperties = {
  justifyContent: "space-between",
  display: "inline-flex",
  position: "fixed",
  width: "100%",
  left: "0px",
  border: "2px solid",
  borderColor: "red",
  zIndex: 10,
};

// todo this might be better in some all-accessible context
enum MainDisplayStates {
  LOADING,
  LOADED,
  RESULT_EMPTY,
  SEARCH_RESULT
}

export function TableLoader(props: {}): JSX.Element {
  const [loaded, setLoaded] = useState(MainDisplayStates.LOADING);
  const [rows, setRows] = useState([] as chrome.bookmarks.BookmarkTreeNode[]);
  const [globalTree, setGlobalTree] = useState(
    [] as chrome.bookmarks.BookmarkTreeNode[],
  );
  const [currentPath, setCurrentPath] = useState(
    [] as chrome.bookmarks.BookmarkTreeNode[],
  );

  const reloadWithNode = (root: chrome.bookmarks.BookmarkTreeNode[]) => {
    setLoaded(MainDisplayStates.LOADED);
    setGlobalTree(root[0].children!);
    const bookmarksBar = root[0].children![0];
    setRows(bookmarksBar.children ?? []);
    setCurrentPath([root[0], bookmarksBar]);
  }

  if (!loaded) {
    /**
     * NOTE: the getTree method returns the ROOT node, which has 3 children: bookmarks bar, other bookmarks, mobile bookmarks.
     * these only show up if not empty
     */
    chrome.bookmarks.getTree().then(
      (root: chrome.bookmarks.BookmarkTreeNode[]) => {
        reloadWithNode(root);
      },
    );
  }
  chrome.bookmarks.onChanged.addListener(
    () => reloadWithNode(currentPath)
  )

  // useEffect(() => {
  //   console.log("reacting to a change in path", currentPath);
  //   const last: chrome.bookmarks.BookmarkTreeNode =
  //     currentPath[currentPath.length - 1];
  //   const children: chrome.bookmarks.BookmarkTreeNode[] | undefined =
  //     last?.children ?? undefined;
  //   console.log("last: ", last);
  //   console.log("about to set path to children:", children);
  //   if (children) {
  //     console.log("last: ", last);
  //     console.log("about to set path to children:", children);
  //     setRows(children);
  //   }
  // }, [currentPath]);

  const pathChangeHandler = (
    nodesForNewPath: chrome.bookmarks.BookmarkTreeNode[],
  ): void => {
    setCurrentPath(nodesForNewPath);
    console.log(
      "reacting to a change in path",
      currentPath,
      " new path: ",
      nodesForNewPath,
    );
    const last: chrome.bookmarks.BookmarkTreeNode =
      nodesForNewPath[nodesForNewPath.length - 1];
    try {
      chrome.bookmarks.getChildren(last.id).then(
        (children: chrome.bookmarks.BookmarkTreeNode[]) => {
          console.log(
            "last element of the path is: ",
            last,
            "its children are:",
            children,
            " setting rows to that array",
          );
          if (children) {
            // console.log("last element of the path is: ", last, "its children are:", children, " setting rows to that array");
            console.log("changing rows");
            setRows(children);
          } else {
            setLoaded(MainDisplayStates.RESULT_EMPTY);
          }
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const dataCallback = (nodes: chrome.bookmarks.BookmarkTreeNode[]): void => {
    setRows(nodes);
  }

  const [sideTreeWidth, setSideTreeWidth] = useState(240);

  return (
    <>
      <nav style={navStyles}>
        <BrandingSection />
        <SearchField
          classNames={undefined}
          searchText={undefined}
          disabled={undefined}
          onChange={undefined}
          onEnter={undefined}
          onSearchClick={undefined}
          onBlur={undefined}
          setDataCallback={dataCallback}
        />
        <ManipulationMenu
          sortCallback={() => console.log("should sort current location")}
          importCallback={() => console.log("should load the datastructure")}
          rows={rows}
        />
      </nav>
      {loaded === MainDisplayStates.LOADED &&
        (
          <>
            <SideTree
              tree={globalTree}
              pathSetter={pathChangeHandler}
              path={currentPath}
            />
            <div
              id="mainContainer"
              style={{ position: "absolute", top: "150px", left: "220px", width: '1000px', height: '1000px' }}
              onClick={
                (e) => {
                  e.preventDefault();
                  console.log('it was clicked on the outside');
                }
              }
            >
              <PathDisplay
                path={currentPath}
                pathChangeHandler={pathChangeHandler}
              />
              <BookmarkTable
                rows={rows}
                pathChangeHandler={pathChangeHandler}
                dataCallback={dataCallback}
                searchResultsMode={loaded as MainDisplayStates === MainDisplayStates.SEARCH_RESULT}
              />
            </div>
          </>
        )}
      {loaded === MainDisplayStates.LOADING &&
        (
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
      {loaded === MainDisplayStates.RESULT_EMPTY &&
        (
          <div
            id="Loading status"
            style={{
              position: "absolute",
              top: "120px",
              left: "200px",
            }}
          >
            <p>To bookmark pages, click the star in the address bar</p>
          </div>
        )}
    </>
  );

}
