import { toast } from "react-toastify";
import { BookmarkNode } from "../../../lib/typesFacade";
import CRUDBookmarkFacade from "../../../lib/CRUDBookmarkFacade";
import { useContextMenu } from "../../context-menu/ContextMenuContext";
import { EditDeleteSection } from "../../context-menu/EditDeleteSection";
import { OpenAllSection } from "../../context-menu/OpenAllSection";
import ClipboardFacade from "../../../lib/ClipboardFacade";
import { ContextMenuButton } from "../../context-menu/ContextMenuButton";

export function PathDisplayContextMenu(
  props: { thing: BookmarkNode },
): JSX.Element {
  const handleCopyStringPath = () => {
    CRUDBookmarkFacade.getPath(props.thing).then((nodes) => {
      ClipboardFacade.copyNodes(nodes);
    });
  };

  const contextMenu = useContextMenu();
  const position = contextMenu.position;

  return (
    <div
      id="tableContextMenu"
      className={`contextMenu absolute`}
      style={{
        position: "absolute",
        left: `${position[0]}px`,
        right: `${position[1]}px`,
      }}
    >
      <EditDeleteSection thing={props.thing} protected={false} />
      <div className="group2">
        <ContextMenuButton
          textNode={<p>copy path</p>}
          callback={ClipboardFacade.copyToClipboard([props.thing])}
        />
        <ContextMenuButton
          textNode={<p>paste buton</p>}
          callback={(e: any) =>
            ClipboardFacade.pasteFromClipboard(e, props.thing.id)}
        />
      </div>
      <OpenAllSection things={[props.thing]} />
      <ContextMenuButton
        textNode={<p>Copy path</p>}
        callback={handleCopyStringPath}
      />
    </div>
  );
}
