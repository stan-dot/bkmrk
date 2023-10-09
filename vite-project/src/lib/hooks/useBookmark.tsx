import { useEffect, useState } from "react";
import { BookmarkNode } from "../typesFacade";

export default function useBookmark(
  id: string,
): BookmarkNode | null {
  const [node, setNode] = useState<BookmarkNode | null>(null);
  useEffect(() => {
    async function doNode() {
      const n = (await chrome.bookmarks.get(id))[0];
      setNode(n);
    }
    doNode();
  }, []);
  return node;
}
