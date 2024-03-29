import DataEditor, {
  CellClickedEventArgs,
  CompactSelection,
  GridSelection,
  Item,
} from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import React, { useEffect } from "react";
import CRUDBookmarkFacade from "../../lib/CRUDBookmarkFacade";
import { readRawTextAsBookmarks } from "../../lib/ClipboardFacade";
import { useBookmarks } from "../../lib/GlobalReducer";
import { BookmarkChangesArg, BookmarkNode } from "../../lib/typesFacade";
import {
  getNodesFromTableSelection,
} from "../search/utils/getNodesFromTableSelection";
import { columns, getData } from "./columns";

const initialSelection = {
  columns: CompactSelection.empty(),
  rows: CompactSelection.empty(),
};
export function BookmarkTable(
  props: {
    rows: BookmarkNode[];
  },
): JSX.Element {
  const { state, dispatch } = useBookmarks();
  const path = state.path;
  const [selection, setSelection] = React.useState<GridSelection>(
    initialSelection,
  );

  const pasteHandler = (v: React.ClipboardEvent<HTMLDivElement>) => {
    const data: DataTransfer = v.clipboardData;
    const items: BookmarkChangesArg[] = readRawTextAsBookmarks(
      data,
    );
    CRUDBookmarkFacade.createManyBookmarks(items);
  };

  const containerDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const parentId = path.at(-1)!.id;
    console.debug("ondrop triggered, data: ", e.dataTransfer);
    CRUDBookmarkFacade.createBookmarksFromPaste(e, parentId);
  };

  // CLICK HANDLING
  const doubleClickHandler = (cell: Item) => {
    const selectedBookmarks = getNodesFromTableSelection(
      props.rows,
      selection,
      cell,
    );
    if (selectedBookmarks.length === 0) return;
    const b = selectedBookmarks[0];
    // todo run double click side effects
    // runDoubleClickSideEffects(cell[0], b);
  };

  const contextMenuHandler = (cell: Item, event: CellClickedEventArgs) => {
    event.preventDefault();
    const selectedBookmarks = getNodesFromTableSelection(
      props.rows,
      selection,
      cell,
    );
    if (selectedBookmarks.length === 0) return;
    // todo open context menu
  };

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      // Check if 'Ctrl + A' is pressed
      if (e.ctrlKey && e.key === "a") {
        // Check if the target is not within your table
        if (!e.target.closest("#bookmarkTableContainer")) {
          e.preventDefault();
        }
      }
    };

    // Add the event listener to the window object
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup: remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      id="bookmarkTableContainer"
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
        // selection
        rowSelect={"single"}
        gridSelection={selection}
        onGridSelectionChange={setSelection}
        getCellsForSelection={true}
        // drag and drop interactivity
        // isDraggable="cell" //this might be dragging the whole thing, experimental
      />
    </div>
  );
}
