import CRUDBookmarkFacade from "../../../lib/CRUDBookmarkFacade";
import ClipboardFacade from "../../../lib/ClipboardFacade";
import { BookmarkNode } from "../../../lib/typesFacade";
import useContextMenu from "../../../test-contextmenu/hooks/useContextMenu";
import { ContextMenuButton } from "../../context-menu/ContextMenuButton";
import { EditDeleteSection } from "../../context-menu/EditDeleteSection";
import { OpenAllSection } from "../../context-menu/OpenAllSection";

export function PathDisplayContextMenu(
  props: { thing: BookmarkNode },
): JSX.Element {
  const handleCopyStringPath = () => {
    CRUDBookmarkFacade.getPathOfABookmark(props.thing).then((nodes) => {
      ClipboardFacade.copyNodes(nodes);
    });
  };

  const { clicked, setClicked, points, setPoints } = useContextMenu();

  return (
    <div
      id="tableContextMenu"
      className={`contextMenu absolute`}
      style={{
        position: "absolute",
        left: `${points.x}px`,
        top: `${points.y}px`,
      }}
    >
      <EditDeleteSection thing={props.thing} protected={false} />
      <div className="group2">
        <ContextMenuButton
          textNode={<p>Copy path</p>}
          callback={ClipboardFacade.copyToClipboard([props.thing])}
        />
        <ContextMenuButton
          textNode={<p>Paste buton</p>}
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
