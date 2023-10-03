import React, { useEffect } from "react";

function useBookmarkChange(callback:any) {
  useEffect(() => {
    const deltaListener = (id:string, changeInfo:any) => {
      console.log(`Bookmark ${id} changed`, changeInfo);
      callback(id, changeInfo); // Call the provided callback
    };

    chrome.bookmarks.onChanged.addListener(deltaListener);
    chrome.bookmarks.onMoved.addListener(deltaListener);
    chrome.bookmarks.onRemoved.addListener(deltaListener);
    // chrome.bookmarks.onImportEnded.addListener(deltaListener);

    return () => {
      chrome.bookmarks.onChanged.removeListener(deltaListener);
      chrome.bookmarks.onMoved.removeListener(deltaListener);
      chrome.bookmarks.onRemoved.removeListener(deltaListener);
      // chrome.bookmarks.onImportEnded.removeListener(deltaListener);
    };
  }, [callback]); // If the callback changes, the effect will re-run
}

export default useBookmarkChange;
