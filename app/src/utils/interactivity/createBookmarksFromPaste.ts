import React from "react";
import { readRawTextAsBookmarks } from "./dragProcessing";

export function createBookmarksFromPaste(
  e: React.ClipboardEvent<Element> | React.DragEvent<Element>,
  parentId: string,
): void {
  // @ts-ignore line because it's union type of 2 functions, should be fine
  const data: DataTransfer = e.dataTransfer ?? e.clipboardData ?? null;
  if (!data) return;
  const bookmarkChangeArg: chrome.bookmarks.BookmarkChangesArg[] =
    readRawTextAsBookmarks(data);
  bookmarkChangeArg.forEach((args: chrome.bookmarks.BookmarkChangesArg) => {
    chrome.bookmarks.create({
      parentId: parentId,
      title: args.title,
      url: args.url,
    });
  });
}
