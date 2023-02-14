import React from "react";
import { readRawTextAsBookmarks } from "../utils/dragProcessing";

export function createBookmarksFromPaste(e: React.ClipboardEvent<Element>, parentId: string) {
  const bookmarkChangeArg: chrome.bookmarks.BookmarkChangesArg[] = readRawTextAsBookmarks(e.clipboardData);
  bookmarkChangeArg.forEach((args: chrome.bookmarks.BookmarkChangesArg) => {
    chrome.bookmarks.create({
      parentId: parentId,
      title: args.title,
      url: args.url,
    });
  });
}
