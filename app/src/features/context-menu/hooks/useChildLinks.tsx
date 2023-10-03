import { useEffect, useState } from "react";
import { BookmarkNode } from "../../../lib/typesFacade";
import { isAFolder } from "../../../utils/ifHasChildrenFolders";
import { getChildenSimple } from "../OpenAllSection";

export function useChildLinks(
  things: BookmarkNode[],
): BookmarkNode[] {
  const [links, setLinks] = useState<BookmarkNode[]>(things);
  const allFolders = things.every(isAFolder);

  useEffect(() => {
    if (allFolders) {
      getChildenSimple(things).then((links) => {
        setLinks(links);
      });
    }
  }, [allFolders, things]);

  return links;
}
