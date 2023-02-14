import React from "react";
import { SortOptions } from "../utils/sortRows";
import { CornerMenu } from "./navbar/CornerMenu";
import { SearchField } from "./navbar/SearchField";

type NavbarProps = {
  dataCallback: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
  reloadWithNode: (root: chrome.bookmarks.BookmarkTreeNode[]) => void;
  lastPathItem: () => chrome.bookmarks.BookmarkTreeNode;
  setHistoryVisible: React.Dispatch<React.SetStateAction<boolean>>;
  historyVisible: boolean;
  sortHandler: (
    nodes: chrome.bookmarks.BookmarkTreeNode[],
    config: SortOptions,
  ) => void;
  rows: chrome.bookmarks.BookmarkTreeNode[];
};

export function Navbar(
  {
    dataCallback,
    reloadWithNode,
    lastPathItem,
    setHistoryVisible,
    historyVisible,
    sortHandler,
    rows,
  }: NavbarProps,
) {
  return (
    <nav className="fixed w-full h-16 top-0 flex justify-between bg-slate-700 z-10">
      <div className="flex align-middle" id="brandingBit">
        <p className="text-2xl mt-2 ml-2 text-white">
          &#128366; BOOKasta
        </p>
      </div>
      <SearchField setDataCallback={dataCallback} />
      {/* <button
        id="refresh-button"
        className="text-white hover:bg-slate-400 focus:outline-none rounded-lg text-xl p-4 text-center border-red-600 cursor-pointer"
        onClick={() => reloadWithNode([lastPathItem()])}
        disabled
      >
        &#128472; refresh
      </button> */}
      {/* <button
        id="history-button"
        className="text-white hover:bg-slate-400 focus:outline-none rounded-lg text-md p-4 text-center border-red-600 cursor-pointer"
        onClick={() => setHistoryVisible(!historyVisible)}
        onBlur={() => setHistoryVisible(false)}
        disabled
      >
        &#11186; History
      </button>
      <button
        id="notifications-button"
        className="text-white hover:bg-slate-400 focus:outline-none rounded-lg text-md p-4 text-center border-red-600 cursor-pointer"
        onClick={() => console.log(" activated notifications button")}
        onBlur={() => console.log(" lost focus on notifications button")}
        disabled
      >
        &#128276; Notifications
      </button> */}
      <CornerMenu
        sortCallback={sortHandler}
        importCallback={() => console.log("should load the datastructure")}
        rows={rows}
      />
    </nav>
  );
}
