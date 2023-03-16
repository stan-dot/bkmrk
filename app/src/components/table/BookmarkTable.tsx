import DataEditor, {
  CellClickedEventArgs,
  CompactSelection,
  GridDragEventArgs,
  GridSelection,
  gridSelectionHasItem,
  Item,
} from "@glideapps/glide-data-grid";
import React from "react";
import {
  ContextMenuActionTypes,
  useContextMenuDispatch,
} from "../../contexts/ContextMenuContext";
import { usePath, usePathDispatch } from "../../contexts/PathContext";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { createBookmarksFromPaste } from "../../utils/interactivity/createBookmarksFromPaste";
import {
  readRawTextAsBookmarks,
  unpackBookmarks,
} from "../../utils/interactivity/dragProcessing";
import { getPath } from "../../utils/interactivity/getPath";
import {
  columns,
  getData,
  viewDetailsColNumber,
} from "./columns";

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
  const [selection, setSelection] = React.useState<GridSelection>({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
  });

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

  const doubleClickHandler = (cell: Item) => {
    const colNumber = cell[0];
    const b = props.rows[colNumber];
    const isFolder = isAFolder(b);

    console.log("col number:", colNumber);
    if (props.searchResultsMode && isFolder) {
      getPath(b).then((newPath) => {
        console.log("path:", newPath);
        pathDispatch({
          type: "full",
          nodes: newPath,
        });
      });
    } else if (colNumber === viewDetailsColNumber) {
      contextMenuDispatch({
        type: isFolder ? "folder" : "single-bookmark",
        direction: "open",
        // todo change that hardcoded value for position
        position: [350, 350],
        things: [b],
      });
    } else if (isFolder) {
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
    const includes = gridSelectionHasItem(selection, cell);
    if (includes) {
      const start = selection.current?.range.y ?? 0;
      // todo can change to use always full width
      const selectedBookmarks = props.rows.slice(
        start,
        start + (selection.current?.range.height ?? 0),
      );
      console.log("selected bookmarks", selectedBookmarks);

      const type: ContextMenuActionTypes = selectedBookmarks.length === 1
        ? "mixed"
        : isAFolder(selectedBookmarks[0])
        ? "folder"
        : "single-bookmark";

      contextMenuDispatch({
        type: type,
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
        onCellActivated={doubleClickHandler}
        onCellContextMenu={contextMenuHandler}
        rowSelect={"single"}
        gridSelection={selection}
        onGridSelectionChange={setSelection}
        // onGridSelectionChange={(newSelection: GridSelection) => {
        //   console.log("changing selection into", newSelection);
        //   setselection(newSelection);
        // }}
        // drag and drop interactivity
        // isDraggable="cell" //this might be dragging the whole thing, experimental
        onDragStart={dragHandler}
        getCellsForSelection={true}
        onDrop={dropHandler}
      />
    </div>
  );
}
