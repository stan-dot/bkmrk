import DataEditor, {
  CellClickedEventArgs,
  GridDragEventArgs,
  GridSelection,
  gridSelectionHasItem,
  Item,
} from "@glideapps/glide-data-grid";
import React, { useState } from "react";
import { useContextMenuDispatch } from "../../contexts/ContextMenuContext";
import { usePath, usePathDispatch } from "../../contexts/PathContext";
import { getPath } from "../../utils/interactivity/getPath";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { columns, getData } from "./columnNumberToGridCell";
import { createBookmarksFromPaste } from "../../utils/interactivity/createBookmarksFromPaste";
import {
  readRawTextAsBookmarks,
  unpackBookmarks,
} from "../../utils/interactivity/dragProcessing";

export function BookmarkTable(
  props: {
    rows: chrome.bookmarks.BookmarkTreeNode[];
    searchResultsMode: boolean;
    setRowsCallback: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
  },
): JSX.Element {
  const path = usePath();
  const pathDispatch = usePathDispatch();
  const contextMenuDispatch = useContextMenuDispatch();

  const tableClickHandler = (cell: Item, event: CellClickedEventArgs) => {
    console.log("in table click handler");
    if (event.ctrlKey) {
      console.log(" pressed ctrl button");
    }
    if (event.shiftKey) {
      console.log(" pressed shift button");
    }

    const bookmark: chrome.bookmarks.BookmarkTreeNode = props.rows[cell[1]];
    console.log("in table click handler on bookmark", bookmark);
    // checking col number for the cell with the button
    // only react on that row
    const folder = isAFolder(bookmark);
    // todo make this more robust, rn that number is hard coded
    console.log("col number:", cell[0]);
    if (cell[0] === 4) {
      contextMenuDispatch({
        type: folder ? "folder" : "single-bookmark",
        direction: "open",
        position: [event.localEventX, event.localEventY],
        things: [bookmark],
      });
    }
    // else {
    //   getPath(bookmark).then((newPath) => {
    //     console.log("path:", newPath);
    //     pathDispatch({
    //       type: "full",
    //       nodes: newPath,
    //     });
    //   });
    // }
  };

  const dragHandler = (e: GridDragEventArgs) => {
    e.preventDefault();
    const x = e.location[0];
    // const y = e.location[1];
    const data: chrome.bookmarks.BookmarkChangesArg = {
      title: props.rows[x].title,
      url: props.rows[x].url,
    };
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

  const pasteHandler = (v: React.ClipboardEvent<HTMLDivElement>) => {
    const data: DataTransfer = v.clipboardData;
    const items: chrome.bookmarks.BookmarkChangesArg[] = readRawTextAsBookmarks(
      data,
    );
    items.forEach((i) => chrome.bookmarks.create(i));
  };

  const containerDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const parentId = path.items.at(-1)!.id;
    console.log("ondrop triggered");
    createBookmarksFromPaste(e, parentId);
  };

  const [currentSelection, setCurrentSelection] = useState({} as GridSelection);
  const doubleClickHandler = (cell: Item) => {
    console.log(cell);
    const b = props.rows[cell[0]];
    const isFolder = isAFolder(b);
    if (isFolder) {
      pathDispatch({
        type: "added",
        nodes: [b],
      });
    } else {
      chrome.tabs.create({ url: b.url });
    }
  };

  const contextMenuHandler = (cell: Item, event: CellClickedEventArgs) => {
    event.preventDefault();
    console.log("on cell context in cell", cell);
    // todo here error for many cells
    const includes = gridSelectionHasItem(currentSelection, cell);
    if (includes) {
      const rowIndexes = currentSelection.rows.toArray();
      const selectedBookmarks = rowIndexes.map((i) => props.rows[i]);
      contextMenuDispatch({
        type: "single-bookmark",
        direction: "open",
        position: [event.localEventX, event.localEventY],
        things: selectedBookmarks,
      });
    }
  };

  return (
    <div
      // onClick={contextClickHandler}
      className="table-container flex flex-grow pb-4 mb-40 "
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onDrop={containerDropHandler}
      onPaste={pasteHandler}
    >
      <DataEditor
        // contents
        rows={props.rows.length}
        columns={columns}
        getCellContent={getData(props.rows)}
        // click interactivity
        keybindings={{
          search: true,
          selectAll: true,
          selectRow: true,
          copy: true,
          paste: true,
        }}
        onCellClicked={tableClickHandler}
        onCellActivated={doubleClickHandler}
        onCellContextMenu={contextMenuHandler}
        rowSelect={"single"}
        onGridSelectionChange={(newSelection: GridSelection) => {
          setCurrentSelection(newSelection);
        }}
        // drag and drop interactivity
        // isDraggable="cell" //this might be dragging the whole thing, experimental
        onDragStart={dragHandler}
        onDrop={dropHandler}
      />
    </div>
  );
}
