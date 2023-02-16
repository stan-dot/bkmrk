import DataEditor, {
  CellClickedEventArgs,
  GridDragEventArgs,
  Item
} from "@glideapps/glide-data-grid";
import React from "react";
import { useContextMenuDispatch } from "../../contexts/ContextMenuContext";
import { usePath, usePathDispatch } from "../../contexts/PathContext";
import { getPath } from "../../utils/interactivity/getPath";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { columns, getData } from "./columnNumberToGridCell";
import { createBookmarksFromPaste } from "../../utils/interactivity/createBookmarksFromPaste";
import { unpackBookmarks, readRawTextAsBookmarks } from "../../utils/interactivity/dragProcessing";

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

  // // todo delete this, just use the glide api bindings  another button to open, another for details. keep the native package handling of this
  // // early handling if the row is
  // // that executes actually instead of the onclick of the grid thing
  // const tableClickHandler = (cell: Item, event: CellClickedEventArgs) => {
  //   console.log('in tble click handler');
  //   if (event.ctrlKey) {
  //     console.log(" pressed ctrl button");
  //   }
  //   if (event.shiftKey) {
  //     console.log(" pressed shift button");
  //   }

  //   if (cell[0] === 4) {
  //     // setShowContextMenus(true);
  //   } else {
  //     const bookmark: chrome.bookmarks.BookmarkTreeNode = props.rows[cell[1]];
  //     console.log('in tble click handler on bookmark', bookmark);
  //     if (isAFolder(bookmark)) {
  //       getPath(bookmark).then((newPath) => {
  //         console.log("path:", newPath);
  //         pathDispatch({
  //           type: 'full',
  //           nodes: newPath
  //         })
  //       });
  //     }
  //   }
  // };

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
      // onCellClicked={tableClickHandler}
      onCellContextMenu={(cell: Item, event: CellClickedEventArgs) => {
        event.preventDefault();
        contextMenuDispatch({
          type: 'single-bookmark',
          direction: 'open',
          position: [event.localEventX, event.localEventY]
        })
      }}
      onDragStart={dragHandler}
      onDrop={dropHandler}
      onHeaderClicked={() => console.log("clicked header")}
      rows={props.rows.length}

    />
  </div>
}
