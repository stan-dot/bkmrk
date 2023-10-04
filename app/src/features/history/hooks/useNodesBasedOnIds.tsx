import { useState } from "react";
import { BookmarkNode } from "../../../lib/typesFacade";

export function useNodesBasedOnIds(ids: string[]): BookmarkNode[] {
  const [nodes, setNodes] = useState<BookmarkNode[]>([]);
  Promise.all(ids.map(chrome.bookmarks.get)).then((all) => {
    const flat: BookmarkNode[] = all.flat();
    setNodes(flat);
  });
  return nodes;
}
