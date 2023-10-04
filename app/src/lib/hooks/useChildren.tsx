import { useEffect, useState } from "react";
import { BookmarkNode } from "../typesFacade";

export default function useChildren(
  id: string,
): BookmarkNode[] {
  const [nodes, setNodes] = useState<BookmarkNode[]>([]);
  useEffect(() => {
    async function doNode() {
      const n: BookmarkNode[] = await chrome.bookmarks.getChildren(id);
      setNodes(n);
    }
    doNode();
  }, []);
  return nodes;
}
