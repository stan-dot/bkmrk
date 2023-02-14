import {
  useContextMenu,
  useContextMenuDispatch
} from "../contexts/ContextMenuContext";
import { SortOptions, sortRows } from "../utils/sortRows";
import { BookmarkContextMenu } from "./contextMenuComponents/BookmarkContextMenu";
import { MiniContextMenu } from "./contextMenuComponents/MiniContextMenu";
import { PathDisplayContextMenu } from "./path/PathDisplayContextMenu";

export default function ContextMenu() {
  const contextMenu = useContextMenu();
  const dispatch = useContextMenuDispatch();
  console.log("current componentId", contextMenu.componentId);
  return (
    <div>
      {/* {popup.component} */}
      {contextMenu.componentId === "m" && (
        <MiniContextMenu
          contextMenuProps={{
            things: contextMenu.things!,
            sortCallback: function (
              node: chrome.bookmarks.BookmarkTreeNode[],
              config: SortOptions,
            ): void {
              throw new Error("Function not implemented.");
            },
          }}
        />
      )}
      {contextMenu.componentId === "b" && (
        <BookmarkContextMenu
          contextMenuProps={{
            things: contextMenu.things!,
            // position: contextMenu.position,
            sortCallback: sortRows
          }}
        />
      )}
      {contextMenu.componentId === "p" && (
        <PathDisplayContextMenu
          contextMenuProps={{
            things: contextMenu.things!,
            sortCallback: function (
              node: chrome.bookmarks.BookmarkTreeNode[],
              config: SortOptions,
            ): void {
              throw new Error("Function not implemented.");
            },
          }}
        />
      )}
    </div>
  );
}
