import { useEffect, useState } from "react";
import { BookmarkNode } from "../typesFacade";

type RACType = {
  rootArray: BookmarkNode[];
  children: BookmarkNode[];
};
const defaultRACType: RACType = {
  rootArray: [],
  children: [],
};

export default function useRootAndChildren(): RACType  {
  const [nodes, setNodes] = useState<RACType>(defaultRACType);
  useEffect(() => {
    async function doNode() {
      const rootArray = await chrome.bookmarks.getTree();
      const children: BookmarkNode[] = await chrome.bookmarks.getChildren(
        rootArray[0].id,
      );
      setNodes({ rootArray, children });
    }
    doNode();
  }, []);
  return nodes;
}
