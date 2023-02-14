import { BookmarkContextMenu } from "../contextMenuComponents/BookmarkContextMenu";
import { MiniContextMenu } from "../contextMenuComponents/MiniContextMenu";
import { PathDisplayContextMenu } from "../path/PathDisplayContextMenu";
import {
  useContextMenu,
  useContextMenuDispatch
} from "../../contexts/ContextMenuContext";

// todo maybe all context menus in here? that'd be smart, wouldn't it be
// and the branches would be subsections of the whole component, not switch cases
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
          }}
        />
      )}
      {contextMenu.componentId === "b" && (
        <BookmarkContextMenu
          contextMenuProps={{
            things: contextMenu.things!,
            // position: contextMenu.position,
          }}
        />
      )}
      {contextMenu.componentId === "s" && (
        <BookmarkContextMenu
          contextMenuProps={{
            things: contextMenu.things!,
            // position: contextMenu.position,
          }}
        />
      )}
      {contextMenu.componentId === "p" && (
        <PathDisplayContextMenu
          contextMenuProps={{
            things: contextMenu.things!,
          }}
        />
      )}
    </div>
  );
}
