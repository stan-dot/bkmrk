import React from "react";
import CRUDBookmarkFacade from "../../../lib/CRUDBookmarkFacade";
import ClipboardFacade from "../../../lib/ClipboardFacade";
import { BookmarkNode } from "../../../lib/typesFacade";
import useContextMenu, {
  Points,
} from "../../../test-contextmenu/hooks/useContextMenu";
import { ContextMenuButton } from "../../context-menu/ContextMenuButton";
import { EditDeleteSection } from "../../context-menu/EditDeleteSection";
import { OpenAllSection } from "../../context-menu/OpenAllSection";

type PathDisplayContextMenu = {
  thing: BookmarkNode;
  points: Points;
  close: () => void;
};

export function PathDisplayContextMenu(
  { thing, points, close }: PathDisplayContextMenu,
): JSX.Element {
  const handleCopyStringPath = () => {
    CRUDBookmarkFacade.getPathOfABookmark(thing).then((nodes) => {
      ClipboardFacade.copyNodes(nodes);
    });
  };

  return (
    <div
      id="tableContextMenu"
      style={{
        position: "absolute",
        left: `${points.x}px`,
        top: `${points.y}px`,
      }}
    >
      <EditDeleteSection thing={thing} protected={false} />
      <div className="group2">
        <ContextMenuButton
          textNode={<p>Copy path</p>}
          callback={() => {
            ClipboardFacade.copyToClipboard([thing]);
            close();
          }}
        />
        <ContextMenuButton
          textNode={<p>Paste buton</p>}
          callback={(e: React.ClipboardEvent<HTMLDivElement>) => {
            ClipboardFacade.pasteFromClipboard(e, thing.id);
            close();
          }}
        />
      </div>
      <OpenAllSection things={[thing]} />
      <ContextMenuButton
        textNode={<p>Copy path</p>}
        callback={handleCopyStringPath}
      />
    </div>
  );
}
