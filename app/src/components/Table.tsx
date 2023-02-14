import "@glideapps/glide-data-grid/dist/index.css";
import React, { useCallback, useEffect, useState } from "react";
import {
  PathProvider,
  usePath,
  usePathDispatch
} from "../contexts/PathContext";
import { PopupProvider } from "../contexts/PopupContext";
import { SortOptions, sortRows } from "../utils/sortRows";
import { ContextMenuProps } from "./contextMenuComponents/ContextMenuProps";
import { MiniContextMenu } from "./contextMenuComponents/MiniContextMenu";
import { HistoryPanel } from "./HistoryPanel";
import { LoadingScreen } from "./LoadingScreen";
import { Navbar } from "./Navbar";
import { PathDisplay } from "./path/PathDisplay";
import Popup from "./Popup";
import { SideSubTree } from "./sidePanel/SideSubTree";
import { BookmarkTable } from "./table/BookmarkTable";

// todo instructions how to sort given a node and props
// boils down to deleting all children of a node,
// then doing a quicksort algorithm by the given index to get the monoid,
// then pasting into the children,
// then reloading the current path

type MainDisplayStates =
  | "LOADING"
  | "LOADED"
  | "RESULT_EMPTY"
  | "SEARCH_RESULT";

export function TableLoader(props: {}): JSX.Element {
  const [loaded, setLoaded] = useState<MainDisplayStates>("LOADING");
  const [rows, setRows] = useState([] as chrome.bookmarks.BookmarkTreeNode[]);
  const [globalTree, setGlobalTree] = useState(
    [] as chrome.bookmarks.BookmarkTreeNode[],
  );

  const [history, setHistory] = useState(
    [] as chrome.bookmarks.BookmarkTreeNode[],
  );

  const [historyVisible, setHistoryVisible] = useState(false);
  const [miniMenuVisible, setMiniMenuVisible] = useState(false);

  const [position, setPosition] = useState([0, 0]);

  const path = usePath();
  const pathDispatch = usePathDispatch();

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
    console.log("reloaded with node");
    setLoaded("LOADED");
    setGlobalTree(root[0].children!);
    const bookmarksBar: chrome.bookmarks.BookmarkTreeNode =
      root[0].children![0];
    setRows(bookmarksBar.children ?? []);
    pathDispatch({
      type: "full",
      nodes: [...root, bookmarksBar],
    });
  };

  const lastPathItem: () => chrome.bookmarks.BookmarkTreeNode = useCallback(
    () => path.items.at(-1) ?? globalTree[0],
    [globalTree, path.items],
  );

  if (loaded === "LOADING") {
    /**
     * NOTE: the getTree method returns the ROOT node, which has 3 children: bookmarks bar, other bookmarks, mobile bookmarks.
     * these only show up if not empty
     */
    chrome.bookmarks.getTree().then(
      (root: chrome.bookmarks.BookmarkTreeNode[]) => {
        console.log("loaded!");
        reloadWithNode(root);
      },
    );
  }

  const deltaListener = (e: string): void => {
    console.log("the bookmarks have changed...", e);
    reloadWithNode(path.items);
  };
  // todo here change for the definite update processing
  chrome.bookmarks.onChanged.addListener(deltaListener);
  chrome.bookmarks.onMoved.addListener(deltaListener);
  chrome.bookmarks.onRemoved.addListener(deltaListener);
  chrome.bookmarks.onImportEnded.addListener(() => reloadWithNode(path.items));

  useEffect(() => {
    const currentLast = lastPathItem();
    console.log('current last:', currentLast);
    setHistory((previousHistory) => [...previousHistory, currentLast]);
    if (currentLast) {
      chrome.bookmarks.getChildren(currentLast.id).then((children) => {
        setRows(children);
      });
    }
    return () => { };
  }, [path, lastPathItem]);

  const sortHandler = (
    nodes: chrome.bookmarks.BookmarkTreeNode[],
    config: SortOptions,
  ) => {
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

  const dataCallback = (nodes: chrome.bookmarks.BookmarkTreeNode[]): void => {
    setRows(nodes);
  };

  return <>
    <PathProvider>
      <PopupProvider>
        <Navbar
          dataCallback={dataCallback}
          reloadWithNode={reloadWithNode}
          lastPathItem={lastPathItem}
          setHistoryVisible={setHistoryVisible}
          historyVisible={historyVisible}
          sortHandler={sortHandler}
          rows={rows}
        />
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
          <PathDisplay />
        </div>
        <LoadingScreen loading={loaded === "LOADING"} />
        <div
          id="lowerPanel"
          style={{ visibility: loaded === "LOADED" ? "visible" : "hidden" }}
          className={"flex flex-grow h-full fixed top-28 w-full  bg-slate-800 "}
        >
          <div className="overflow-auto z-20 left-4 w-[250px] h-full mb-40">
            <SideSubTree
              nodes={globalTree}
              setRowsCallback={dataCallback}
            />
          </div>
          <div
            id="mainContainer"
            className=" overflow-auto drop-shadow m-2 p-2 flex flex-col rounded-md"
            onClick={(e) => {
              e.preventDefault();
              console.log("it was clicked on the outside");
            }}
          >
            <BookmarkTable
              rows={rows}
              setRowsCallback={dataCallback}
              searchResultsMode={loaded === "SEARCH_RESULT"}
            />
          </div>
          <HistoryPanel history={history} historyVisible={historyVisible} />
        </div>
        <MiniContextMenu
          contextMenuProps={getContextProps()}
          visible={miniMenuVisible}
        />
        <Popup />
      </PopupProvider>
    </PathProvider>
  </>
}



