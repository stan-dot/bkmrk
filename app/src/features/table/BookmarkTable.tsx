import DataEditor, {
  CellClickedEventArgs,
  CompactSelection,
  GridDragEventArgs,
  GridSelection,
  gridSelectionHasItem,
  Item,
} from "@glideapps/glide-data-grid";
import React from "react";
import CRUDBookmarkFacade from "../../lib/CRUDBookmarkFacade";
import {
  readRawTextAsBookmarks,
  unpackBookmarks,
} from "../../utils/dragProcessing";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import {
  ContextMenuActionTypes,
  useContextMenuDispatch,
} from "../context-menu/ContextMenuContext";
import { useHistoryDispatch } from "../history/HistoryContext";
import { usePath, usePathDispatch } from "../path/PathContext";
import { columns, getData, viewDetailsColNumber } from "./columns";

export function BookmarkTable(
  props: {
    rows: BookmarkNode[];
    searchResultsMode: boolean;
    setRowsCallback: (nodes: BookmarkNode[]) => void;
  },
): JSX.Element {
  const path = usePath();
  const pathDispatch = usePathDispatch();
  const contextMenuDispatch = useContextMenuDispatch();
  const [selection, setSelection] = React.useState<GridSelection>({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
  });

  const historyDispatch = useHistoryDispatch();

  // DRAG AND DROP HANDLING
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

    CRUDBookmarkFacade.createManyBookmarks(parsed);
  };

  const pasteHandler = (v: React.ClipboardEvent<HTMLDivElement>) => {
    const data: DataTransfer = v.clipboardData;
    const items: chrome.bookmarks.BookmarkChangesArg[] = readRawTextAsBookmarks(
      data,
    );
    CRUDBookmarkFacade.createManyBookmarks(items);
  };

  const containerDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const parentId = path.items.at(-1)!.id;
    console.debug("ondrop triggered, data: ", e.dataTransfer);
    createBookmarksFromPaste(e, parentId);
  };

  // CLICK HANDLING
  const doubleClickHandler = (cell: Item) => {
    const colNumber = cell[0];
    // const b = props.rows[colNumber];
    // const isFolder = isAFolder(b);
    const includes = gridSelectionHasItem(selection, cell);
    if (includes) {
      const start = selection.current?.range.y ?? 0;
      // todo can change to use always full width
      const selectedBookmarks: BookmarkNode[] = props.rows
        .slice(
          start,
          start + (selection.current?.range.height ?? 0),
        );
      const b = selectedBookmarks[0];
      const isFolder = isAFolder(b);
      console.debug(
        "selected bookmarks",
        selectedBookmarks,
        " vs theoretical simple get",
        b,
      );

      console.debug("col number:", colNumber);

      if (props.searchResultsMode && isFolder) {
        getPath(b).then((newPath) => {
          console.debug("path:", newPath);
          pathDispatch({
            type: "full",
            nodes: newPath,
          });
          historyDispatch({
            type: "add",
            nodeId: newPath[newPath.length - 1].id,
          });
        });
      } else if (colNumber === viewDetailsColNumber) {
        contextMenuDispatch({
          type: isFolder ? "folder" : "single-bookmark",
          direction: "open",
          // todo change that hardcoded value for position
          position: [550, 550],
          things: [b],
        });
      } else if (isFolder) {
        // put this together with the other bit as 2 similar logical brnaches
        pathDispatch({
          type: "added",
          nodes: [b],
        });
      } else {
        chrome.tabs.create({ url: b.url });
      }
    }
  };

  const contextMenuHandler = (cell: Item, event: CellClickedEventArgs) => {
    event.preventDefault();
    const includes = gridSelectionHasItem(selection, cell);
    if (includes) {
      const start = selection.current?.range.y ?? 0;
      const selectedBookmarks = props.rows.slice(
        start,
        start + (selection.current?.range.height ?? 0),
      );
      // console.debug("selected bookmarks", selectedBookmarks);

      // todo here logic does not seem to work actualyl
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
        //   console.debug("changing selection into", newSelection);
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
