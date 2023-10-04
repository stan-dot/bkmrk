import { useEffect, useState } from "react";
import { BookmarkNode } from "../typesFacade";

export  function useRoot():BookmarkNode| null {
  const [n, setN] = useState<BookmarkNode|null>(null);
  useEffect(() => {
    chrome.bookmarks.getTree().then(r => {
      setN(r[0]);
 })

  }, [])
  return n
}
