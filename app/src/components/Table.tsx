import "@glideapps/glide-data-grid/dist/index.css";
import { useState } from "react";
import { rowSorter, SortOptions } from "../utils/rowSorter";
import { CornerMenu } from "./navbar/CornerMenu";
import { SearchField } from "./navbar/SearchField";
import { PathDisplay } from "./path/PathDisplay";
import { SideTree } from "./sidePanel/SideTree";
import { BookmarkTable } from "./table/BookmarkTable";

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


  // todo instructions how to sort given a node and props
  // boils down to deleting all children of a node,
  // then doing a quicksort algorithm by the given index to get the monoid,
  // then pasting into the children,
  // then reloading the current path

  const sortHandler = (node: chrome.bookmarks.BookmarkTreeNode, config: SortOptions) => {
    if (node.children?.length === 0) return;
    const tmp: chrome.bookmarks.BookmarkTreeNode[] = node.children!;
    const sorted: chrome.bookmarks.BookmarkTreeNode[] = rowSorter(tmp, config);
    sorted.forEach((v, i) => {
      const args: chrome.bookmarks.BookmarkCreateArg = {
        parentId: v.parentId,
        index: v.index,
        title: v.title,
        url: v.url,
      };
      chrome.bookmarks.create(args);
    })
  }

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

  // const [sideTreeWidth, setSideTreeWidth] = useState(240);
  return (
    <>
      <nav className="fixed w-full h-[68px] top-0 flex justify-between bg-slate-700 z-10" >
        <div className="flex align-middle" id="brandingBit" >
          <p className="text-2xl mt-2 ml-2 text-white">
            &#128366;
            BOOKasta
          </p>
        </div>
        <SearchField setDataCallback={dataCallback} />
        <CornerMenu
          sortCallback={() => console.log("should sort current location")}
          importCallback={() => console.log("should load the datastructure")}
          rows={rows}
        />
      </nav>
      <div id="lowerPanel" className={`flex flex-grow h-full fixed top-[68px] w-full  bg-slate-800 ${loaded !== MainDisplayStates.LOADED && 'hidden'}`}>
        <SideTree
          tree={globalTree}
          pathSetter={pathChangeHandler}
          path={currentPath}
        />
        <div
          id="mainContainer"
          className=" overflow-auto drop-shadow"
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
      </div>
      {loaded === MainDisplayStates.LOADING &&
        (
          <div id="Loading status" >
            <p>Loading...</p>
          </div>
        )}
      {loaded === MainDisplayStates.RESULT_EMPTY &&
        (
          <div id="empty status" >
            <p>To bookmark pages, click the star in the address bar</p>
          </div>
        )}
    </>
  );

}
