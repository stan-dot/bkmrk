import DataEditor, { CellClickedEventArgs, Item } from "@glideapps/glide-data-grid";
import { columns } from "./columnNumberToGridCell";
import { getData } from "./getData";

/**
 *
 * todo if a folder, on click it should open
 * todo use this example to create a new context menu div @ any location - just need to track position, then using absolute location
 * https://www.pluralsight.com/guides/how-to-create-a-right-click-menu-using-react
 * todo when clicking anywhere, 2 options - add new bookmark, add new folder
 * @param props
 * @returns
 */
export function BookmarkTable(
  props: {
    rows: chrome.bookmarks.BookmarkTreeNode[];
    cellClickHandler: (cell: Item, event: CellClickedEventArgs) => void;
  }): JSX.Element {
  return <>
    <DataEditor
      onCellContextMenu={props.cellClickHandler}
      onHeaderClicked={() => console.log("clicked header")}
      onCellClicked={() => console.log("todo here create highlight")}
      keybindings={{ "search": true }}
      
      // showSearch={true}
      getCellContent={getData(props.rows)}
      columns={columns}
      rows={props.rows.length} />
  </>
}
