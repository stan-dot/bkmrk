import { PathDisplayContextMenu } from "../path/components/PathDisplayContextMenu";
import { AddNewContextMenu } from "./AddNewContextMenu";
import { useContextMenu } from "./ContextMenuContext";
import { ManySelectedContextMenu } from "./ManySelectedContextMenu";

// and the branches would be subsections of the whole component, not switch cases
const manySelectedArray: string[] = ["b", "f", "s", "side"];

export default function ContextMenu() {
  const contextMenu = useContextMenu();
  // console.debug("full context menu", contextMenu);
  if (contextMenu.componentId === "m") {
    return <AddNewContextMenu />;
  }

  if (contextMenu.things && contextMenu.things.length > 0) {
    console.debug("figuring out the context menu for: ", contextMenu);
    if (manySelectedArray.includes(contextMenu.componentId as string)) {
      return <ManySelectedContextMenu things={contextMenu.things} />;
    }

    // path display is built different
    if (contextMenu.componentId === "p") {
      return <PathDisplayContextMenu thing={contextMenu.things[0]} />;
    }
  }
  return <></>;
}
