import { useEffect, useState } from "react";
import { BookmarkNode } from "../../../lib/typesFacade";

export function useSiblings(node: BookmarkNode) {
  const [siblings, setSiblings] = useState<BookmarkNode[]>(
    [],
  );

  useEffect(() => {
    if (node.parentId === undefined) {
      return;
    }
    chrome.bookmarks.getChildren(node.parentId).then(
      (children: BookmarkNode[]) => {
        setSiblings(children);
      },
    );
  }, [node.parentId]);

  return siblings;
}
