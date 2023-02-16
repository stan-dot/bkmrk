import {
  useContextMenu
} from "../../contexts/ContextMenuContext";
import { ManySelectedContextMenu } from "../contextMenuComponents/ManySelectedContextMenu";
import { MiniContextMenu } from "../contextMenuComponents/MiniContextMenu";
import { SingleItemContextMenu } from "../contextMenuComponents/SingleItemContextMenu";
import { PathDisplayContextMenu } from "../path/PathDisplayContextMenu";

// todo maybe all context menus in here? that'd be smart, wouldn't it be
// and the branches would be subsections of the whole component, not switch cases
export default function ContextMenu() {
  const contextMenu = useContextMenu();
  console.log("current componentId", contextMenu.componentId);
  return (
    <div>
      {/* {popup.component} */}
      {contextMenu.componentId === "m" && (
        <MiniContextMenu />
      )}
      {contextMenu.componentId === "b" && (
        <SingleItemContextMenu thing={contextMenu.things![0]!} />
      )}
      {contextMenu.componentId === "s" && (
        <ManySelectedContextMenu things={contextMenu.things!} />
      )}
      {contextMenu.componentId === "p" && (
        <PathDisplayContextMenu thing={contextMenu.things![0]} />
      )}
    </div>
  );
}
