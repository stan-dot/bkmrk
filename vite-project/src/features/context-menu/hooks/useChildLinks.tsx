import { useEffect, useState } from "react";
import { BookmarkNode } from "../../../lib/typesFacade";
import { isAFolder } from "../../../utils/ifHasChildrenFolders";
import { useFirstLayerAllChildren } from "./useFirstLayerAllChildren";

export function useChildLinks(
  things: BookmarkNode[],
): BookmarkNode[] {
  const [links, setLinks] = useState<BookmarkNode[]>(things);
  const allFolders = things.every(isAFolder);

  useEffect(() => {
    if (allFolders) {
      useFirstLayerAllChildren(things).then((links) => {
        setLinks(links);
      });
    }
  }, [allFolders, things]);

  return links;
}
