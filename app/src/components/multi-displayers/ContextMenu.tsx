import { useContextMenu } from "../../contexts/ContextMenuContext";
import { ManySelectedContextMenu } from "../contextMenuComponents/ManySelectedContextMenu";
import { MiniContextMenu } from "../contextMenuComponents/MiniContextMenu";
import { PathDisplayContextMenu } from "../path/PathDisplayContextMenu";

// todo maybe all context menus in here? that'd be smart, wouldn't it be
// and the branches would be subsections of the whole component, not switch cases
export default function ContextMenu() {
  const contextMenu = useContextMenu();
  console.log("full context menu", contextMenu);
  if (contextMenu.componentId === "m") {
    return <MiniContextMenu />;
  }

  if (contextMenu.things && contextMenu.things.length > 0) {
    if (contextMenu.componentId === "b") {
      return <ManySelectedContextMenu things={contextMenu.things} />;
      // return <SingleItemContextMenu thing={contextMenu.things[0]} />;
    }
    if (contextMenu.componentId === "f") {
      return <ManySelectedContextMenu things={contextMenu.things} />;
      // return <SingleItemContextMenu thing={contextMenu.things[0]} />;
    }
    if (contextMenu.componentId === "s") {
      return <ManySelectedContextMenu things={contextMenu.things} />;
    }
    

    // path display is built different
    if (contextMenu.componentId === "p") {
      return <PathDisplayContextMenu thing={contextMenu.things[0]} />;
    }
  }
  return <></>;
}
