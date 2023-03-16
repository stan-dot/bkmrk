import "@glideapps/glide-data-grid/dist/index.css";
import React, { useCallback, useEffect, useState } from "react";
import { ContextMenuProvider } from "../contexts/ContextMenuContext";
import { usePath, usePathDispatch } from "../contexts/PathContext";
import { PopupProvider } from "../contexts/PopupContext";
import { createBookmarksFromPaste } from "../utils/interactivity/createBookmarksFromPaste";
import { LoadingScreen } from "./LoadingScreen";
import { Navbar } from "./navbar/Navbar";
import { PathDisplay } from "./path/PathDisplay";
import { SideSubTree } from "./sidePanel/SideSubTree";
import { BookmarkTable } from "./table/BookmarkTable";

type MainDisplayStates =
  | "LOADING"
  | "LOADED"
  | "RESULT_EMPTY"
  | "SEARCH_RESULT";

export function TableLoader(): JSX.Element {
  const [loaded, setLoaded] = useState<MainDisplayStates>("LOADING");
  const [rows, setRows] = useState<chrome.bookmarks.BookmarkTreeNode[]>([]);
  const [globalTree, setGlobalTree] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);

  const path = usePath();
  const pathDispatch = usePathDispatch();

  const lastPathItem: () => chrome.bookmarks.BookmarkTreeNode = useCallback(
    () => path.items.at(-1) ?? globalTree[0],
    [globalTree, path.items],
  );

  // options
  // bookmark changes in the current folder
  // bookmark changes outside of the current view
  // bookmark changes upstream in the path
  // bookmark changes completely elsewhere, like on a different tab

  // things that need to change
  // current rows. rows appears completely downstream from the path
  // current path
  // loaded status?
  // global tree - complex, it changes, but only folders changes matter, the numbers should update too though

  // todo maybe simplify with reducer, with diff actions for all of these

  const reloadWithNode = useCallback(
    (root: chrome.bookmarks.BookmarkTreeNode[]) => {
      setLoaded("LOADED");
      const bookmarksBar: chrome.bookmarks.BookmarkTreeNode =
        root[0].children![0];
      // setRows(bookmarksBar.children ?? []);
      pathDispatch({
        type: "full",
        nodes: [...root, bookmarksBar],
      });
    },
    [pathDispatch],
  );

  if (loaded === "LOADING") {
    // reloadWithNode(path.items);
    chrome.bookmarks.getTree().then(
      (root: chrome.bookmarks.BookmarkTreeNode[]) => {
        console.log("loaded!");
        setGlobalTree(root);
        reloadWithNode(root);

        // todo that might be controversial
        // setGlobalTree(root[0].children!);
        // pathDispatch({
        //   type: "full",
        //   nodes: root,
        // });
      },
    );
  }

  const deltaListener = useCallback((e?: string): void => {
    console.log("the bookmarks have changed...", e);
    reloadWithNode(path.items);
  }, [path.items, reloadWithNode]);

  useEffect(() => {
    chrome.bookmarks.onChanged.addListener(deltaListener);
    chrome.bookmarks.onMoved.addListener(deltaListener);
    chrome.bookmarks.onRemoved.addListener(deltaListener);
    chrome.bookmarks.onImportEnded.addListener(deltaListener);
    return () => {
      chrome.bookmarks.onChanged.removeListener(deltaListener);
      chrome.bookmarks.onMoved.removeListener(deltaListener);
      chrome.bookmarks.onRemoved.removeListener(deltaListener);
      chrome.bookmarks.onImportEnded.removeListener(deltaListener);
    };
  }, [deltaListener]);

  useEffect(() => {
    const currentLast = lastPathItem();
    console.log("current last:", currentLast);
    if (currentLast) {
      chrome.bookmarks.getChildren(currentLast.id).then((children) => {
        setRows(children);
      });
    }
    return () => {};
  }, [path, lastPathItem]);

  const dataCallback = (nodes: chrome.bookmarks.BookmarkTreeNode[]): void => {
    setRows(nodes);
  };

  const pasteHandler = (e: React.ClipboardEvent<Element>) => {
    const parentId = lastPathItem().id;
    e.preventDefault();
    console.log(e);
    createBookmarksFromPaste(e, parentId);
  };

  return (
    <>
      <PopupProvider>
        <ContextMenuProvider>
          <Navbar
            dataCallback={dataCallback}
            lastPathItem={lastPathItem}
            rows={rows}
          />
          <hr />
          <div
            className="fixed w-full h-12 top-16 bg-slate-700 flex-col justify-evenly"
            onPaste={pasteHandler}
          >
            <PathDisplay />
          </div>
          <LoadingScreen loading={loaded === "LOADING"} />
          <div
            id="lowerPanel"
            className={"flex flex-grow h-full fixed top-28 w-full  bg-slate-800 "}
            style={{ visibility: loaded === "LOADED" ? "visible" : "hidden" }}
          >
            <div className="overflow-auto z-20 left-4 w-[250px] h-full mb-40">
              <SideSubTree nodes={globalTree} setRowsCallback={dataCallback} />
            </div>
            <div
              id="mainContainer"
              className=" overflow-auto drop-shadow m-2 p-2 flex flex-col rounded-md"
            >
              <BookmarkTable
                rows={rows}
                setRowsCallback={dataCallback}
                searchResultsMode={loaded === "SEARCH_RESULT"}
              />
            </div>
          </div>
        </ContextMenuProvider>
      </PopupProvider>
    </>
  );
}
