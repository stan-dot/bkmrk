import DataEditor, {
  CellClickedEventArgs,
  CompactSelection,
  GridSelection,
  Item,
} from "@glideapps/glide-data-grid";
import React, { useState } from "react";
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
import Filterer from "../filter/Filterer";
import { defaultFilters, FilterSearch } from "../filter/Filterer";
import { FilterPanel } from "./components/FilterPanel";

export function SearchResultsTable(
  props: {
    rows: BookmarkNode[];
  },
): JSX.Element {
  const pathDispatch = usePathDispatch();
  const contextMenuDispatch = useContextMenuDispatch();
  const [filter, setFilter] = useState<FilterSearch>(defaultFilters);
  const filteredRows = Filterer.bigFilter(filter, props.rows);
  const [selection, setSelection] = React.useState<GridSelection>({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
  });

  // CLICK HANDLING
  const doubleClickHandler = (cell: Item) => {
    const selectedBookmarks = getNodesFromTableSelection(
      filteredRows,
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
      filteredRows,
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
      <FilterPanel
        onFilterChange={setFilter}
      />
      <DataEditor
        // contents
        rows={filteredRows.length}
        columns={columns}
        getCellContent={getData(filteredRows)}
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
