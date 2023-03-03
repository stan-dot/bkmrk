import "@glideapps/glide-data-grid/dist/index.css";
import React, { useCallback, useEffect, useState } from "react";
import { usePath, usePathDispatch } from "../contexts/PathContext";
import { createBookmarksFromPaste } from "../utils/interactivity/createBookmarksFromPaste";
import { LoadingScreen } from "./LoadingScreen";
import ContextMenu from "./multi-displayers/ContextMenu";
import Popup from "./multi-displayers/Popup";
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

  const reloadWithNode = (root: chrome.bookmarks.BookmarkTreeNode[]) => {
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

  useEffect(() => {
    chrome.bookmarks.onChanged.addListener(deltaListener);
    chrome.bookmarks.onMoved.addListener(deltaListener);
    chrome.bookmarks.onRemoved.addListener(deltaListener);
    chrome.bookmarks.onImportEnded.addListener(() =>
      reloadWithNode(path.items)
    );

    return () => {
      chrome.bookmarks.onChanged.removeListener(deltaListener);
      chrome.bookmarks.onMoved.removeListener(deltaListener);
      chrome.bookmarks.onRemoved.removeListener(deltaListener);
      chrome.bookmarks.onImportEnded.removeListener(() =>
        reloadWithNode(path.items)
      );
    };
  }, []);

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
      <Navbar
        dataCallback={dataCallback}
        reloadWithNode={reloadWithNode}
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
      {/**the multidiplayers */}
      <Popup />
      <ContextMenu />
    </>
  );
}
