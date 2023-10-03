import { useEffect, useState } from "react";
import { BookmarkNode } from "../typesFacade";

export default function useParent(
  id: string,
): BookmarkNode | null {
  const [node, setNode] = useState<BookmarkNode | null>(null);
  useEffect(() => {
    async function doNode() {
      const n = (await chrome.bookmarks.get(id))[0];
      if (n.parentId) {
        const parent = (await chrome.bookmarks.get(n.parentId))[0];
        setNode(parent);
      }
    }
    doNode();
  }, []);
  return node;
}
