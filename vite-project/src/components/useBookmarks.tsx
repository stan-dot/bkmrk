import { useCallback, useState } from "react";
import { usePathDispatch } from "../features/path/PathContext";
import useRootAndChildren from "../lib/hooks/useRootAndChildren";
import { BookmarkNode } from "../lib/typesFacade";
import { MainDisplayStates } from "./NewTable";
import { useBookmarkChange } from "../lib/hooks/useBookmarkChange";

// Custom Hook for managing bookmark nodes
export function useBookmarks() {
  const [loaded, setLoaded] = useState<MainDisplayStates>("LOADING");
  const [rows, setRows] = useState<BookmarkNode[]>([]);
  const [globalTree, setGlobalTree] = useState<BookmarkNode[]>([]);
  const pathDispatch = usePathDispatch();

  const { rootArray, children } = useRootAndChildren();
  setGlobalTree(children);

  if (rootArray[0] && rootArray[0].children) {
    const bookmarksBar: BookmarkNode = rootArray[0].children[0];
    pathDispatch({
      type: "full",
      nodes: [rootArray[0], bookmarksBar],
    });
  }

  const handleBookmarkChange = useCallback(
    (id: string, changeInfo: any) => {
      console.log("handling in the component: ", id, changeInfo);
    },
    [],
  );
  useBookmarkChange(handleBookmarkChange);

  return {
    rootArray,
    loaded,
    rows,
    globalTree,
    setRows,
    setLoaded,
  };
}
