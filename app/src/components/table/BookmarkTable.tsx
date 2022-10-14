import DataEditor, {
  CellClickedEventArgs,
  Item
} from "@glideapps/glide-data-grid";
import React, { useState } from "react";
import { columns } from "./columnNumberToGridCell";
import { getData } from "./getData";

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
    e.stopPropagation();
    setPosition(
      [
        e.pageX,
        e.pageY,
      ],
    );
    console.log("todo here create highlight");
  };

  return (
    <div onClick={contextClickHandler} className='dev-test-outline' style={{ position: 'relative' }}>
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
