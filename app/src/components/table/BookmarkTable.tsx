import DataEditor, {
  CellClickedEventArgs,
  Item
} from "@glideapps/glide-data-grid";
import React, { useState } from "react";
import { columns } from "./columnNumberToGridCell";
import { getData } from "./getData";
import { TableContextMenu } from "./TableContextMenu";

export function BookmarkTable(
  props: {
    rows: chrome.bookmarks.BookmarkTreeNode[];
    globalClickHandler: (cell: Item, event: CellClickedEventArgs) => void;
  },
): JSX.Element {
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [position, setPosition] = useState([0, 0]);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [lastInteractedItem, setLastInteractedItem] = useState({} as Item);

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
    if (showContextMenu) {
      setShowContextMenu(false);
    }
    console.log("todo here create highlight");
  };

  const clickHandler = props.globalClickHandler;
  return (
    <div onClick={contextClickHandler} className='dev-test-outline' style={{ position: 'relative' }}>
      {showContextMenu ?? <TableContextMenu thing={props.rows[lastInteractedItem[1]]} position={position} />}
      <DataEditor
        onCellClicked={clickHandler}
        onHeaderClicked={() => console.log("clicked header")}
        onCellContextMenu={(cell: Item, event: CellClickedEventArgs) => {
          setLastInteractedItem(cell);
          setShowContextMenu(true)
        }}
        keybindings={{ "search": true }}
        showSearch={searchVisibility}
        onSearchClose={() => setSearchVisibility(false)}
        getCellContent={getData(props.rows)}
        columns={columns}
        rows={props.rows.length}
      />

    </div>
  );
}
