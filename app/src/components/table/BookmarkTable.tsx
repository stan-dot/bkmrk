import DataEditor, {
  CellClickedEventArgs,
  GridDragEventArgs,
  Item
} from "@glideapps/glide-data-grid";
import React from "react";
import { useContextMenuDispatch } from "../../contexts/ContextMenuContext";
import { usePath, usePathDispatch } from "../../contexts/PathContext";
import { readRawTextAsBookmarks, unpackBookmarks } from "../../utils/dragProcessing";
import { getPath } from "../../utils/getPath";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { createBookmarksFromPaste } from "../../utils/createBookmarksFromPaste";
import { columns } from "./columnNumberToGridCell";
import { getData } from "./getData";

export function BookmarkTable(
  props: {
    rows: chrome.bookmarks.BookmarkTreeNode[];
    searchResultsMode: boolean;
    setRowsCallback: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
  },
): JSX.Element {
  // todo maybe have the number of those selected? then it would simply increase with ctrl or shift. shift adding also those between tbf

  const path = usePath();
  const pathDispatch = usePathDispatch();

  const contextMenuDispatch = useContextMenuDispatch();
  const contextClickHandler: React.MouseEventHandler<HTMLDivElement> = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    contextMenuDispatch({
      type: 'position-update',
      position: [
        e.pageX,
        e.pageY,
      ],
      direction: 'open'
    })
  }

  // todo srsly consider just ignoring this. another button to open, another for details. keep the native package handling of this
  const tableClickHandler = (cell: Item, event: CellClickedEventArgs) => {
    console.log('in tble click handler');
    if (event.ctrlKey) {
      console.log(" pressed ctrl button");
    }
    if (event.shiftKey) {
      console.log(" pressed shift button");
    }

    // todo early handling if the row is
    // todo that executes actually instead of the onclick of the grid thing
    if (cell[0] === 4) {
      setShowContextMenu(true);
    } else {
      const bookmark: chrome.bookmarks.BookmarkTreeNode = props.rows[cell[1]];
      console.log('in tble click handler on bookmark', bookmark);
      if (isAFolder(bookmark)) {
        getPath(bookmark).then((newPath) => {
          console.log("path:", newPath);
          pathDispatch({
            type: 'full',
            nodes: newPath
          })
        });
      }
    }
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
    const items: chrome.bookmarks.BookmarkChangesArg[] = readRawTextAsBookmarks(data);
    items.forEach((i) => chrome.bookmarks.create(i));
  };

  const containerDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const parentId = path.items.at(-1)!.id;
    console.log("ondrop triggered");
    createBookmarksFromPaste(e, parentId);
  };

  // todo figure out the difference between container on drop and inner onDrop
  return <div
    onClick={contextClickHandler}
    className="table-container flex flex-grow pb-4 mb-40 "
    onDragOver={(e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    }}
    onDrop={containerDropHandler}
    onPaste={pasteHandler}
  >
    {/* {showContextMenu && (
      <BookmarkContextMenu
        contextMenuProps={contextMenuProps}
        searchResults={props.searchResultsMode}
        setRowsCallback={props.setRowsCallback}
      />
    )} */}
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
        // todo here there might be a problem
      }}
      onDragStart={dragHandler}
      onDrop={dropHandler}
      onHeaderClicked={() => console.log("clicked header")}
      rows={props.rows.length}
      
    />
  </div>
}
