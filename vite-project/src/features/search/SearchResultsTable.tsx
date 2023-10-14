import DataEditor, {
  CellClickedEventArgs,
  CompactSelection,
  GridSelection,
  Item,
} from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import React, { useState } from "react";
import { useBookmarks } from "../../lib/GlobalReducer";
import { BookmarkNode } from "../../lib/typesFacade";
import Filterer, { defaultFilters, FilterSearch } from "../filter/Filterer";
import { columns, getData } from "../table/columns";
import { FilterPanel } from "./components/FilterPanel";
import { getNodesFromTableSelection } from "./utils/getNodesFromTableSelection";

export function SearchResultsTable(
  props: {
    rows: BookmarkNode[];
  },
): JSX.Element {
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
    // todo fix this
    // runDoubleClickSideEffects(cell[0], b, contextMenuDispatch, pathDispatch);
  };

  const contextMenuHandler = (cell: Item, event: CellClickedEventArgs) => {
    event.preventDefault();
    const selectedBookmarks = getNodesFromTableSelection(
      filteredRows,
      selection,
      cell,
    );
    if (selectedBookmarks.length === 0) return;
    // todo add context menu new variant
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
