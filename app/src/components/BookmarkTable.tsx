import DataEditor, {
  CellClickedEventArgs,
  Item,
} from "@glideapps/glide-data-grid";
import React, { useState } from "react";
import { columns } from "./columnNumberToGridCell";
import { getData } from "./getData";

/**
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
  },
): JSX.Element {
  const [position, setPosition] = useState([0, 0]);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const contextClickHandler: React.MouseEventHandler<HTMLDivElement> = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    setPosition(
      [
        e.pageX,
        e.pageY,
      ],
    );
    //
    console.log("todo here create highlight");
  };

  return (
    <div onClick={contextClickHandler}>
      {showContextMenu ?? (
        <div
          id="contextMenu"
          style={{ top: `${position[0]}px`, left: `${position[1]}px` }}
        >
          <p>context menu</p>
          <button onClick={() => setShowContextMenu(false)}>close</button>
        </div>
      )}
      <DataEditor
        onCellClicked={props.cellClickHandler}
        onHeaderClicked={() => console.log("clicked header")}
        onCellContextMenu={() => setShowContextMenu(true)}
        keybindings={{ "search": true }}
        // showSearch={true}
        getCellContent={getData(props.rows)}
        columns={columns}
        rows={props.rows.length}
      />
    </div>
  );
}
