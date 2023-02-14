import { useContextMenu, useContextMenuDispatch } from "../contexts/ContextMenuContext";
import { usePopup } from "../contexts/PopupContext";
import { SortOptions } from "../utils/sortRows";
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
            thing: undefined,
            position: contextMenu.position,
            sortCallback: function (
              node: chrome.bookmarks.BookmarkTreeNode[],
              config: SortOptions,
            ): void {
              throw new Error("Function not implemented.");
            },
          }}
          visible={false}
        />
      )}
      {contextMenu.componentId === "b" && <BookmarkContextMenu />}
      {contextMenu.componentId === "p" && <PathDisplayContextMenu />}
    </div>
  );
}
