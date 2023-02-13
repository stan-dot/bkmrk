import "@glideapps/glide-data-grid/dist/index.css";
import React, { useCallback, useEffect, useState } from "react";
import { ContextMenuProps } from "./contextMenuComponents/ContextMenuProps";
import { SortOptions, sortRows } from "../utils/sortRows";
import { MiniContextMenu } from "./contextMenuComponents/MiniContextMenu";
import { LoadingScreen } from "./LoadingScreen";
import { CornerMenu } from "./navbar/CornerMenu";
import { SearchField } from "./navbar/SearchField";
import { PathDisplay } from "./path/PathDisplay";
import { SideTree } from "./sidePanel/SideTree";
import { BookmarkTable } from "./table/BookmarkTable";


type MainDisplayStates = "LOADING" | "LOADED" | "RESULT_EMPTY" | "SEARCH_RESULT";

export function TableLoader(props: {}): JSX.Element {
  const [loaded, setLoaded] = useState<MainDisplayStates>("LOADING");
  const [rows, setRows] = useState([] as chrome.bookmarks.BookmarkTreeNode[]);
  const [globalTree, setGlobalTree] = useState(
    [] as chrome.bookmarks.BookmarkTreeNode[],
  );
  const [currentPath, setCurrentPath] = useState(
    [] as chrome.bookmarks.BookmarkTreeNode[],
  );

  const [history, setHistory] = useState(
    [] as chrome.bookmarks.BookmarkTreeNode[],
  );

  const [historyVisible, setHistoryVisible] = useState(false);
  const [miniMenuVisible, setMiniMenuVisible] = useState(false);

  const [position, setPosition] = useState([0, 0]);

  const getContextProps: () => ContextMenuProps = () => {
    return {
      thing: lastPathItem(),
      position: position,
      closeCallback: () => setMiniMenuVisible(false),
      sortCallback: () =>
        console.log(
          "should use some context for this, it is too bothersome now",
        ),
    };
  };

  const reloadWithNode = (root: chrome.bookmarks.BookmarkTreeNode[]) => {
    console.log('reloaded with node')
    setLoaded("LOADED");
    setGlobalTree(root[0].children!);
    const bookmarksBar: chrome.bookmarks.BookmarkTreeNode =
      root[0].children![0];
    setRows(bookmarksBar.children ?? []);
    setCurrentPath([root[0], bookmarksBar]);
  };

  const lastPathItem = useCallback(() => currentPath[currentPath.length - 1], [
    currentPath,
  ]);

  if (loaded === "LOADING") {
    /**
     * NOTE: the getTree method returns the ROOT node, which has 3 children: bookmarks bar, other bookmarks, mobile bookmarks.
     * these only show up if not empty
     */
    chrome.bookmarks.getTree().then(
      (root: chrome.bookmarks.BookmarkTreeNode[]) => {
        console.log('loaded!');
        reloadWithNode(root);
      },
    );
  }

  const deltaListener = (e: string): void => {
    console.log("the bookmarks have changed...", e);
    reloadWithNode(currentPath);
  };
  // todo here change for the definite update processing
  chrome.bookmarks.onChanged.addListener(deltaListener);
  chrome.bookmarks.onMoved.addListener(deltaListener);
  chrome.bookmarks.onRemoved.addListener(deltaListener);
  chrome.bookmarks.onImportEnded.addListener(() => reloadWithNode(currentPath));

  useEffect(() => {
    setHistory((previousHistory) => [...previousHistory, lastPathItem()]);

    return () => { };
  }, [currentPath, lastPathItem]);

  // todo instructions how to sort given a node and props
  // boils down to deleting all children of a node,
  // then doing a quicksort algorithm by the given index to get the monoid,
  // then pasting into the children,
  // then reloading the current path

  const sortHandler = (
    nodes: chrome.bookmarks.BookmarkTreeNode[],
    config: SortOptions,
  ) => {
    // if (node.children?.length === 0) return;
    // const tmp: chrome.bookmarks.BookmarkTreeNode[] = node.children!;
    // const sorted: chrome.bookmarks.BookmarkTreeNode[] = sortRows(tmp, config);
    const sorted: chrome.bookmarks.BookmarkTreeNode[] = sortRows(nodes, config);
    sorted.forEach((v, i) => {
      const args: chrome.bookmarks.BookmarkCreateArg = {
        parentId: v.parentId,
        index: v.index,
        title: v.title,
        url: v.url,
      };
      chrome.bookmarks.create(args);
    });
  };

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
            setLoaded("RESULT_EMPTY");
          }
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const dataCallback = (nodes: chrome.bookmarks.BookmarkTreeNode[]): void => {
    setRows(nodes);
  };

  return <>
    <nav className="fixed w-full h-16 top-0 flex justify-between bg-slate-700 z-10">
      <div className="flex align-middle" id="brandingBit">
        <p className="text-2xl mt-2 ml-2 text-white">
          &#128366; BOOKasta
        </p>
      </div>
      <SearchField setDataCallback={dataCallback} />
      <button
        id="refresh-button"
        className="text-white hover:bg-slate-400 focus:outline-none rounded-lg text-xl p-4 text-center border-red-600 cursor-pointer"
        onClick={() => reloadWithNode([lastPathItem()])}
        disabled
      >
        &#128472; refresh
      </button>
      <button
        id="history-button"
        className="text-white hover:bg-slate-400 focus:outline-none rounded-lg text-xl p-4 text-center border-red-600 cursor-pointer"
        onClick={() => setHistoryVisible(!historyVisible)}
        onBlur={() => setHistoryVisible(false)}
        disabled
      >
        &#11186; History
      </button>
      <button
        id="notifications-button"
        className="text-white hover:bg-slate-400 focus:outline-none rounded-lg text-xl p-4 text-center border-red-600 cursor-pointer"
        onClick={() => console.log(' activated notifications button')}
        onBlur={() => console.log(' lost focus on notifications button')}
        disabled
      >
        &#128276; Notifications
      </button>
      <CornerMenu
        sortCallback={sortHandler}
        importCallback={() => console.log("should load the datastructure")}
        rows={rows}
      />
    </nav>
    <hr />
    <div
      className="fixed w-full h-12 top-16 bg-slate-700 flex-col justify-evenly"
      onPaste={(e: React.ClipboardEvent<Element>) => {
        e.preventDefault();
        console.log(e);
        chrome.bookmarks.create({
          parentId: lastPathItem().id,
          title: "Extensions doc",
          url: "https://developer.chrome.com/docs/extensions",
        });
      }}
    >
      <PathDisplay
        path={currentPath}
        pathChangeHandler={pathChangeHandler}
      />
    </div>
    <LoadingScreen loading={loaded === "LOADING"} />
    <div id="lowerPanel"
      // onClick={e => {
      // e.preventDefault();
      // }}
      style={{ visibility: loaded === "LOADED" ? "visible" : "hidden" }}
      className={"flex flex-grow h-full fixed top-28 w-full  bg-slate-800 "}
    >
      <SideTree
        tree={globalTree}
        pathSetter={pathChangeHandler}
        path={currentPath}
        dataCallback={dataCallback}
      />
      <div id="mainContainer"
        className=" overflow-auto drop-shadow m-2 p-2 flex flex-col rounded-md"
        onClick={(e) => {
          e.preventDefault();
          console.log("it was clicked on the outside");
        }}
      >
        <BookmarkTable
          rows={rows}
          pathChangeHandler={pathChangeHandler}
          setRowsCallback={dataCallback}
          searchResultsMode={loaded === "SEARCH_RESULT"}
          path={currentPath}
        />
      </div>
      <div
        id="rightPanel"
        className="bg-slate-700 w-44 z-10 rounded-md shadow"
        style={{ visibility: `${historyVisible ? "visible" : "hidden"}` }}
      >
        {history.length === 0 ? <p>No history found</p> : history.map((b) => {
          // console.log('history: ', b);
          // return "some item"
          return (
            <p
              style={{
                // fontWeight: `${b?.title === lastPathItem().title ? "bold" : "normal" }`,
              }}
            >
              <p>nothing</p>
              {
                /* <a href={b.url} className="link">
                {b.title}
              </a> */
              }
            </p>
          );
        })}
      </div>
    </div>
    <MiniContextMenu contextMenuProps={getContextProps()} visible={miniMenuVisible} />
  </>
}


