import React from "react";
import { toast } from "react-toastify";
import { BookmarkChangesArg, BookmarkCreateArg, BookmarkNode } from "./typesFacade";
import CRUDBookmarkFacade from "./CRUDBookmarkFacade";
import { GridDragEventArgs } from "@glideapps/glide-data-grid";

export default class ClipboardFacade {
  static cutToClipboard(things: BookmarkNode[]) {
    const list: string = codeBookmarkToUriList(things, true);
    window.navigator.clipboard.writeText(list);
    toast(
      `all ${list.length} bookmarks are in your clipboard now. Proceed carefully. There is no going back right now.`,
    );
    things.forEach((bookmark) => {
      chrome.bookmarks.remove(bookmark.id);
    });
  }

  static copyToClipboard(things: BookmarkNode[]) {
    const list: string = codeBookmarkToUriList(things, true);
    window.navigator.clipboard.writeText(list);
    toast(
      `all ${list.length} bookmarks are in your clipboard now.`,
    );
  }
  static pasteFromClipboard(e: any, parentId: string) {
    const output = window.navigator.clipboard.read();
    console.debug(output);
    CRUDBookmarkFacade.createBookmarksFromPaste(e, parentId);
  }

  static createDragHandler(
    thing: BookmarkNode,
  ): (e: React.DragEvent<HTMLDivElement>) => void {
    const handler = (e: React.DragEvent<HTMLDivElement>) => {
      const stringified: string = codeBookmarkToUriList([thing], true);
      e.dataTransfer.setData("text/uri-list", stringified);
      e.dataTransfer.setData(
        "text/plain",
        codeBookmarkToUriList([thing], false),
      );
      e.dataTransfer.dropEffect = "move";
      console.debug("dragging the side element", e);
    };
    return handler;
  }

  static createDropHandlerInParent(
    parentId: string,
  ): (e: React.DragEvent<HTMLDivElement>) => void {
    const handler = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      console.debug("ondrop triggered");
      const data: DataTransfer = e.dataTransfer;
      const items: chrome.bookmarks.BookmarkChangesArg[] =
        readRawTextAsBookmarks(
          data,
        );

      const withParent = items.map((i) => {
        return { ...i, parentId: parentId };
      });
      withParent.forEach((i) => chrome.bookmarks.create(i));
    };
    return handler;
  }

  static copyNodes(nodes: BookmarkNode[]) {
    const text: string = stringifyPath(nodes);
    window.navigator.clipboard.writeText(text);
    const content = `copied to clipboard ${text}`;
    toast(content);
  }

  static dragHandler(e: GridDragEventArgs, thing:BookmarkNode) {
    e.preventDefault();
    const x = e.location[0];
    // const y = e.location[1];
    const data: BookmarkChangesArg = {
      title: thing.title,
      url: thing.url,
    };
    const stringified = JSON.stringify(data);
    e.setData("text/uri-list", stringified);
  };

}

export function codeBookmarkToUriList(
  bookmarks: BookmarkNode[],
  includeComments: boolean,
): string {
  let info = "";
  bookmarks.forEach((b) => {
    info += `#${b.title}\n`;
    if (includeComments) {
      info += `#${b.url}\n`;
    }
  });
  return info;
}

export function unpackBookmarks(
  dataTransfer: DataTransfer,
): chrome.bookmarks.BookmarkChangesArg[] {
  const data = dataTransfer.getData("text/uri-list");
  const lines: string[] = data.split("\n");

  let items: chrome.bookmarks.BookmarkChangesArg[] = [];
  for (let index = 0; index < lines.length; index += 2) {
    const title: string = lines[index];
    const url: string = lines[index + 1];
    const newObj: chrome.bookmarks.BookmarkChangesArg = {
      title: title,
      url: url,
    };
    items.push(newObj);
  }

  return items;
}

export function readRawTextAsBookmarks(
  dataTransfer: DataTransfer,
): chrome.bookmarks.BookmarkChangesArg[] {
  const data = dataTransfer.getData("text/plain");
  const lines: string[] = data.split("\n");

  let items: chrome.bookmarks.BookmarkChangesArg[] = [];
  for (let index = 0; index < lines.length; index += 1) {
    const url: string = lines[index];
    const newObj: chrome.bookmarks.BookmarkChangesArg = {
      title: url,
      url: url,
    };
    items.push(newObj);
  }

  return items;
}

function stringifyPath(nodes: BookmarkNode[]): string {
  return nodes.map((b: BookmarkNode) => b.title).join("/");
}
