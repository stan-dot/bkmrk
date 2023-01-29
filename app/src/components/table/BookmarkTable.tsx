import DataEditor, {
  CellClickedEventArgs,
  Item
} from "@glideapps/glide-data-grid";
import React, { useState } from "react";
import { ContextMenuProps } from "../../types/ContextMenuProps";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { getPath } from "../getPath";
import { BookmarkContextMenu } from "../contextMenuComponents/BookmarkContextMenu";
import { columns } from "./columnNumberToGridCell";
import { getData } from "./getData";

export function BookmarkTable(
  props: {
    rows: chrome.bookmarks.BookmarkTreeNode[];
    pathChangeHandler: (
      nodesForNewPath: chrome.bookmarks.BookmarkTreeNode[],
    ) => void;
    dataCallback: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void
    searchResultsMode: boolean
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
    // todo early handling if the row is 
    if (cell[0] === 4) { setShowContextMenu(true) } else {

      const bookmark: chrome.bookmarks.BookmarkTreeNode = props.rows[cell[1]];
      if (isAFolder(bookmark)) {
        getPath(bookmark).then((path) => {
          console.log("path:", path);
          props.pathChangeHandler(path);
        });
      }
      // else {
      //   chrome.tabs.create({ url: bookmark.url });
      // }
    }
  };

  const contextMenuProps: ContextMenuProps = {
    thing: props.rows[lastInteractedItem[1]],
    position: position,
    closeCallback: () => setShowContextMenu(false),
    sortCallback: () => console.log("no sort here")
  };

  return (
    <div
      onClick={contextClickHandler}
      className="table-container flex flex-grow top-[68px]"
    >
      {showContextMenu && (
        <BookmarkContextMenu
          contextMenuProps={contextMenuProps}
          setRowsCallback={props.dataCallback}
          searchResults={props.searchResultsMode}
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
        theme={{ accentColor: '#CF9FFF' }}
      />
    </div>
  );
}
