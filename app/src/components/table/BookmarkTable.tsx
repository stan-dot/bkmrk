import DataEditor, {
  CellClickedEventArgs,
  GridColumnIcon,
  GridDragEventArgs,
  Item,
} from "@glideapps/glide-data-grid";
import React, { useCallback, useState } from "react";
import { ContextMenuProps } from "../../types/ContextMenuProps";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { getPath } from "../getPath";
import { BookmarkContextMenu } from "../contextMenuComponents/BookmarkContextMenu";
import { columns } from "./columnNumberToGridCell";
import { getData } from "./getData";
import {
  readRawTextAsBookmarks,
  unpackBookmarks,
} from "../../utils/dragProcessing";

import { useExtraCells } from "@glideapps/glide-data-grid-cells";

export function BookmarkTable(
  props: {
    path: chrome.bookmarks.BookmarkTreeNode[];
    pathChangeHandler: (
      nodesForNewPath: chrome.bookmarks.BookmarkTreeNode[],
    ) => void;
    rows: chrome.bookmarks.BookmarkTreeNode[];
    searchResultsMode: boolean;
    setRowsCallback: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
  },
): JSX.Element {
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [position, setPosition] = useState([0, 0]);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [lastInteractedItem, setLastInteractedItem] = useState({} as Item);
  // todo maybe have the number of those selected? then it would simply increase with ctrl or shift. shift adding also those between tbf

  const contextClickHandler: React.MouseEventHandler<HTMLDivElement> = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setPosition(
      [
        e.pageX,
        e.pageY,
      ],
    );
    if (showContextMenu) {
      setShowContextMenu(false);
    }
  };

  const tableClickHandler = (cell: Item, event: CellClickedEventArgs) => {
    if (event.ctrlKey) {
      console.log(" pressed ctrl button");
    }
    if (event.shiftKey) {
      console.log(" pressed shift button");
    }

    // todo early handling if the row is
    if (cell[0] === 4) {
      setShowContextMenu(true);
    } else {
      const bookmark: chrome.bookmarks.BookmarkTreeNode = props.rows[cell[1]];
      if (isAFolder(bookmark)) {
        getPath(bookmark).then((path) => {
          console.log("path:", path);
          props.pathChangeHandler(path);
        });
      }
      // else {
      //   chrome.tabs.create({ url: bookmark.url });
      // }
    }
  };

  const contextMenuProps: ContextMenuProps = {
    thing: props.rows[lastInteractedItem[1]],
    position: position,
    closeCallback: () => setShowContextMenu(false),
    sortCallback: () => console.log("no sort here"),
  };

  const dragHandler = (e: GridDragEventArgs) => {
    const x = e.location[0];
    // const y = e.location[1];
    const data: chrome.bookmarks.BookmarkChangesArg = {
      title: props.rows[x].title,
      url: props.rows[x].url,
    };
    e.preventDefault();
    const stringified = JSON.stringify(data);
    e.setData("text/uri-list", stringified);
  };

  const dropHandler = (cell: Item, dataTransfer: DataTransfer | null) => {
    if (dataTransfer === null) {
      return;
    }
    const parsed: chrome.bookmarks.BookmarkChangesArg[] = unpackBookmarks(
      dataTransfer,
    );
    parsed.forEach((arg) => {
      chrome.bookmarks.create(arg);
    });
  };

  const lastPathItem = useCallback(() => props.path[props.path.length - 1], [
    props.path,
  ]);

  return (
    <div
      onClick={contextClickHandler}
      className="table-container flex flex-grow pb-4 mb-40 "
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onDrop={(e) => {
        e.preventDefault();
        console.log("ondrop triggered");
        const data: DataTransfer = e.dataTransfer;
        const items: chrome.bookmarks.BookmarkChangesArg[] =
          readRawTextAsBookmarks(data);
        const parentId = lastPathItem().id;
        const withParent = items.map((i) => {
          return { ...i, parentId: parentId };
        });
        withParent.forEach((i) => chrome.bookmarks.create(i));
      }}
      onPaste={(v: React.ClipboardEvent<HTMLDivElement>) => {
        const data: DataTransfer = v.clipboardData;
        const items: chrome.bookmarks.BookmarkChangesArg[] =
          readRawTextAsBookmarks(data);
        items.forEach((i) => chrome.bookmarks.create(i));
      }}
    >
      {showContextMenu && (
        <BookmarkContextMenu
          contextMenuProps={contextMenuProps}
          searchResults={props.searchResultsMode}
          setRowsCallback={props.setRowsCallback}
        />
      )}
      <DataEditor
        columns={columns}
        getCellContent={getData(props.rows)}
        isDraggable="cell"
        keybindings={{
          search: true,
          selectAll: true,
          selectRow: true,
          copy: true,
          paste: true,
        }}
        onCellClicked={tableClickHandler}
        onCellContextMenu={(cell: Item, event: CellClickedEventArgs) => {
          event.preventDefault();
          setLastInteractedItem(cell);
          setShowContextMenu(true);
        }}
        onDragStart={dragHandler}
        onDrop={dropHandler}
        onHeaderClicked={() => console.log("clicked header")}
        onSearchClose={() => setSearchVisibility(false)}
        rows={props.rows.length}
        showSearch={searchVisibility}
        theme={{ accentColor: "#CF9FFF" }}
      />
    </div>
  );
}
