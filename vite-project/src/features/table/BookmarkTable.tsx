import DataEditor, {
  CellClickedEventArgs,
  CompactSelection,
  GridSelection,
  Item,
} from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import React from "react";
import CRUDBookmarkFacade from "../../lib/CRUDBookmarkFacade";
import { readRawTextAsBookmarks } from "../../lib/ClipboardFacade";
import { useBookmarks } from "../../lib/GlobalReducer";
import { BookmarkChangesArg, BookmarkNode } from "../../lib/typesFacade";
import {
  getNodesFromTableSelection
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
        getCellsForSelection={true}
      />
    </div>
  );
}
