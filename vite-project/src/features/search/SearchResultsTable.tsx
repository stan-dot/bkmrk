import DataEditor, {
  CellClickedEventArgs,
  CompactSelection,
  GridSelection,
  Item,
} from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import React, { useEffect, useState } from "react";
import { useBookmarks } from "../../lib/GlobalReducer";
import { BookmarkNode } from "../../lib/typesFacade";
import Filterer, { defaultFilters, FilterSearch } from "../filter/Filterer";
import { columns, getData, viewDetailsColNumber } from "../table/columns";
import { FilterPanel } from "./components/FilterPanel";
import { getNodesFromTableSelection } from "./utils/getNodesFromTableSelection";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import useContextMenu from "../../test-contextmenu/hooks/useContextMenu";

export function SearchResultsTable(
  props: { rows: BookmarkNode[] },
): JSX.Element {
  const [filter, setFilter] = useState<FilterSearch>(defaultFilters);
  const filteredRows = Filterer.bigFilter(filter, props.rows);
  const [selection, setSelection] = React.useState<GridSelection>({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
  });

  useEffect(() => {
    const handleKeyDown = (e:any) => {
      // Check if 'Ctrl + A' is pressed
      if (e.ctrlKey && e.key === "a") {
        // Check if the target is not within your table
        if (!e.target.closest("#searchTableContainer")) {
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

  const { clicked, setClicked, points, setPoints } = useContextMenu();
  // CLICK HANDLING
  const doubleClickHandler = (cell: Item) => {
    const selectedBookmarks = getNodesFromTableSelection(
      filteredRows,
      selection,
      cell,
    );
    if (selectedBookmarks.length === 0) return;
    const b = selectedBookmarks[0]; // always double click only on one thing
    const isF = isAFolder(b);
    if (cell[0] === viewDetailsColNumber) {
      setClicked(true);
    } else if (isF) {
      // todo fix this. if bookmark, open it, if folder navigate
      // todo might need to dispatch
    } else {
      // open the page
      chrome.tabs.create({ url: b.url });
    }
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
    <>
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
        <div id="searchTableContainer">
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
      </div>
      {clicked &&
        (
          <>
            <h2>Clicked!</h2>
          </>
        )}
    </>
  );
}
