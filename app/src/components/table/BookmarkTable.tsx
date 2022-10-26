import DataEditor, {
  CellClickedEventArgs,
  Item
} from "@glideapps/glide-data-grid";
import React, { useState } from "react";
import { isAFolder } from "../../functions/ifHasChildrenFolders";
import { getPath } from "../getPath";
import { columns } from "./columnNumberToGridCell";
import { getData } from "./getData";
import { TableContextMenu } from "./TableContextMenu";

export function BookmarkTable(
  props: {
    rows: chrome.bookmarks.BookmarkTreeNode[];
    pathChangeHandler: (
      nodesForNewPath: chrome.bookmarks.BookmarkTreeNode[],
    ) => void;
    dataCallback: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void
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
  };

  const globalClickHandler = (cell: Item, event: CellClickedEventArgs) => {
    // check if it's folder or a bookmark
    const bookmark: chrome.bookmarks.BookmarkTreeNode = props.rows[cell[1]];
    if (isAFolder(bookmark)) {
      getPath(bookmark).then((path) => {
        console.log("path:", path);
        props.pathChangeHandler(path);
      });
    } else {
      chrome.tabs.create({ url: bookmark.url });
    }
  };

  return (
    <div
      onClick={contextClickHandler}
      className="dev-test-outline"
      style={{ position: "fixed" }}
    >
      {showContextMenu && (
        <TableContextMenu
          thing={props.rows[lastInteractedItem[1]]}
          position={position}
          closeCallback={() => setSearchVisibility(false)}
          setRowsCallback={props.dataCallback}
          searchResults={true}
        />
      )}
      <DataEditor
        onCellClicked={globalClickHandler}
        onHeaderClicked={() => console.log("clicked header")}
        onCellContextMenu={(cell: Item, event: CellClickedEventArgs) => {
          event.preventDefault();
          setLastInteractedItem(cell);
          setShowContextMenu(true);
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
