import { useEffect } from "react";

export function useBookmarkChange(callback: Function) {
  useEffect(() => {
    const createListener = (id: string, changeInfo: any) => {
      console.log(`Bookmark ${id} created`, changeInfo);
      callback("created", id, changeInfo);
    };

    const changeListener = (id: string, changeInfo: any) => {
      console.log(`Bookmark ${id} changed`, changeInfo);
      callback("changed", id, changeInfo);
    };

    const movedListener = (id: string, moveInfo: any) => {
      console.log(`Bookmark ${id} moved`, moveInfo);
      callback("moved", id, moveInfo);
    };

    const removedListener = (id: string, removeInfo: any) => {
      console.log(`Bookmark ${id} removed`, removeInfo);
      callback("removed", id, removeInfo);
    };

    chrome.bookmarks.onCreated.addListener(createListener);
    chrome.bookmarks.onChanged.addListener(changeListener);
    chrome.bookmarks.onMoved.addListener(movedListener);
    chrome.bookmarks.onRemoved.addListener(removedListener);

    return () => {
      chrome.bookmarks.onCreated.removeListener(createListener);
      chrome.bookmarks.onChanged.removeListener(changeListener);
      chrome.bookmarks.onMoved.removeListener(movedListener);
      chrome.bookmarks.onRemoved.removeListener(removedListener);
    };
  }, [callback]);
}
