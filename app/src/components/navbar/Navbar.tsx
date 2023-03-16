import React from "react";
import { CornerMenu } from "./CornerMenu";
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
  return (
    <nav className="fixed w-full h-16 top-0 flex justify-between bg-slate-700 z-10">
      <div className="flex align-middle" id="brandingBit">
        <p className="text-2xl mt-2 ml-2 text-white">
          &#128366; BOOKasta
        </p>
      </div>
      <SearchField setDataCallback={dataCallback} />
      <CornerMenu
        importCallback={() => {
          console.log("should load the datastructure");
      
          
        }}
        rows={rows}
      />
    </nav>
  );
}

