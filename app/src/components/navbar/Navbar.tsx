import React, { useState } from "react";
import { CornerMenu } from "./CornerMenu";
import { HistoryPanel } from "./for-later/HistoryPanel";
import { SearchField } from "./SearchField";

type NavbarProps = {
  dataCallback: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
  lastPathItem: () => chrome.bookmarks.BookmarkTreeNode;
  rows: chrome.bookmarks.BookmarkTreeNode[];
};

export function Navbar(
  {
    dataCallback,
    lastPathItem,
    rows,
  }: NavbarProps,
) {
  const [historyVisible, setHistoryVisible] = useState(false);

  return (
    <nav className="fixed w-full h-16 top-0 flex justify-between bg-slate-700 z-10">
      <div className="flex align-middle" id="brandingBit">
        <p className="text-2xl mt-2 ml-2 text-white">
          &#128366; BKMRK
        </p>
      </div>
      <SearchField setDataCallback={dataCallback} />
      {
        /* <button
        id="history-button"
        className="text-white hover:bg-slate-400 focus:outline-none rounded-lg text-md p-4 text-center border-red-600 cursor-pointer"
        onClick={() => setHistoryVisible(!historyVisible)}
        // onBlur={() => setHistoryVisible(false)}
        disabled
      >
        &#11186; History
      </button>
      <HistoryPanel historyVisible={true} /> */
      }
      <CornerMenu
        importCallback={() => {
          console.debug("should load the datastructure");
        }}
        dataCallback={dataCallback}
        rows={rows}
      />
    </nav>
  );
}
