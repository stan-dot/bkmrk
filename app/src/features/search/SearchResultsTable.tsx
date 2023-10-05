import DataEditor, {
  CellClickedEventArgs,
  CompactSelection,
  GridSelection,
  Item,
} from "@glideapps/glide-data-grid";
import React from "react";
import { BookmarkNode } from "../../lib/typesFacade";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import {
  ContextMenuActionTypes,
  useContextMenuDispatch,
} from "../context-menu/ContextMenuContext";
import { usePathDispatch } from "../path/PathContext";
import { columns, getData } from "../table/columns";
import {
  decideContextType,
  getNodesFromTableSelection,
  runDoubleClickSideEffects,
} from "./utils/getNodesFromTableSelection";

// todo use a reducer for the whole thing probably
interface FilterSearch {
  regex?: RegExp;
  page?: string;
  substringInName?: string;
  onlyFolder: boolean;
  onlyBookmark: boolean;
  // todo this with a slider interface between 3 things
}

export function SearchResultsTable(
  props: {
    rows: BookmarkNode[];
  },
): JSX.Element {
  const pathDispatch = usePathDispatch();
  const contextMenuDispatch = useContextMenuDispatch();
  const [selection, setSelection] = React.useState<GridSelection>({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
  });

  // CLICK HANDLING
  const doubleClickHandler = (cell: Item) => {
    const selectedBookmarks = getNodesFromTableSelection(
      props.rows,
      selection,
      cell,
    );
    if (selectedBookmarks.length === 0) return;
    const b = selectedBookmarks[0]; // always double click only on one thing
    const isFolder = isAFolder(b);

    runDoubleClickSideEffects(
      cell[0],
      contextMenuDispatch,
      isFolder,
      b,
      pathDispatch,
    );
  };

  const contextMenuHandler = (cell: Item, event: CellClickedEventArgs) => {
    event.preventDefault();
    const selectedBookmarks = getNodesFromTableSelection(
      props.rows,
      selection,
      cell,
    );
    if (selectedBookmarks.length === 0) return;
    const type: ContextMenuActionTypes = decideContextType(selectedBookmarks);
    contextMenuDispatch({
      type: type,
      direction: "open",
      position: [event.localEventX, event.localEventY],
      things: selectedBookmarks,
    });
  };

  return (
    <div
      className="table-container flex flex-grow pb-4 mb-40 "
      id="search-results-table-container"
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
    >
      <div id="filter" className="m-2 p-2 rounded flex flex-row">
        <button id="filterBlock1" className="mx-2 py-6">
          isFolder filter
        </button>
        <button id="filterBlock1" className="mx-2 py-6">
          contains word
        </button>
        <button id="filterBlock1" className="mx-2 py-6">
          match regex
        </button>
      </div>
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
        getCellsForSelection={true}
      />
    </div>
  );
}
