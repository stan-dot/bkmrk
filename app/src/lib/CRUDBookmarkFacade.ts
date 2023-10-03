import React from "react";
import { readRawTextAsBookmarks } from "./ClipboardFacade";
import { BookmarkNode } from "./typesFacade";

export default class CRUDBookmarkFacade {
  static async createBookmark(
    obj: chrome.bookmarks.BookmarkCreateArg,
  ): Promise<string> {
    const b = await chrome.bookmarks.create(obj);
    return b.id;
  }

  static createFolder() {
  }

  static async createManyBookmarks(
    objs: chrome.bookmarks.BookmarkCreateArg[],
  ): Promise<string[]> {
    let nodes: Promise<BookmarkNode>[] = [];
    objs.forEach((o) => {
      const node = chrome.bookmarks.create(o);
      nodes.push(node);
    });
    const ids: string[] = (await Promise.all(nodes)).map((n) => n.id);
    return ids;
  }

  static async createBookmarksFromPaste(
    e: React.ClipboardEvent<Element> | React.DragEvent<Element>,
    parentId: string,
  ): Promise<void> {
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

  static async getPath(
    node: BookmarkNode,
  ): Promise<BookmarkNode[]> {
    let output: BookmarkNode[] = [node];
    let lastNode: BookmarkNode = node;
    while (lastNode.parentId) {
      const parent = await chrome.bookmarks.get(lastNode.parentId);
      // console.log("getting parent of the clicked element", parent);
      output.unshift(parent[0]);
      lastNode = parent[0];
    }
    return output;
  }
}

const validUrlRegexp: RegExp =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export function checkIfCreateBookmarkValid(
  data: chrome.bookmarks.BookmarkCreateArg,
): boolean {
  const url = data.url;
  return url !== undefined && url.length > 0 &&
    url.match(validUrlRegexp) !== undefined;
}
