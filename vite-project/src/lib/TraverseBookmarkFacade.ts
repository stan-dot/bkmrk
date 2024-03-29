import { BookmarkNode } from "./typesFacade";

type CopyData = {
  sameTitles: BookmarkNode[][];
  sameUrls: BookmarkNode[][];
  sameBoth: BookmarkNode[][];
};

export default class TraverseBookmarkFacade {
  private static async _globalTraverse(args: TraverseArgs): Promise<void> {
    const root: chrome.bookmarks.BookmarkTreeNode[] = await chrome.bookmarks
      .getTree();
    root.forEach((folder) => {
      this._traverseTree(args, folder);
    });
  }

  private static async _traverseTree(
    args: TraverseArgs,
    root?: chrome.bookmarks.BookmarkTreeNode,
  ): Promise<void> {
    console.log("traversing the tree", args, " root: ", root);
    if (root === undefined) {
      this._globalTraverse(args);
      return;
    }
    const children: chrome.bookmarks.BookmarkTreeNode[] = await chrome.bookmarks
      .getChildren(root.id);
    console.log("children in travserse: ", children);

    if (children.length === 0) {
      args.callbackOnEachNode && args.callbackOnEachNode(root);
      args.callbackOnEachLeaf && args.callbackOnEachLeaf(root);
      args.callbackOnNumber && args.callbackOnNumber(1);
    }

    children.forEach((node) => {
      args.callbackOnEachNode && args.callbackOnEachNode(node);
      args.callbackOnNumber && args.callbackOnNumber(1);
    });
  }

  static async deleteAllEmpty(): Promise<number> {
    const deleteCallback = (node: chrome.bookmarks.BookmarkTreeNode) =>
      chrome.bookmarks.remove(node.id);
    let count = 0;
    const countCallback = (n: number) => count += n;
    const args: TraverseArgs = {
      callbackOnNumber: countCallback,
      //@ts-ignore line because it's union type of 2 functions, should be fine
      callbackOnEachLeaf: deleteCallback,
    };
    await this._traverseTree(args);
    return count;
  }

  // todo that is not finished, need to count each separately
  static async recognizeDuplicates(): Promise<number> {
    let count = 0;
    const uniqueUrlsSet = new Set();
    const addToCopiesCallback = (node: BookmarkNode) => {
      const url = node.url;
      if (uniqueUrlsSet.has(url)) {
        count++;
      }
      uniqueUrlsSet.add(url);
    };

    const args: TraverseArgs = {
      //@ts-ignore line because it's union type of 2 functions, should be fine
      callbackOnEachNode: addToCopiesCallback,
    };
    await this._traverseTree(args);
    return count;
  }
}

export type TraverseArgs = {
  callbackOnEachLeaf?: (
    node: chrome.bookmarks.BookmarkTreeNode,
  ) => void | ((node: chrome.bookmarks.BookmarkTreeNode) => Promise<void>);
  callbackOnEachNode?: (
    node: chrome.bookmarks.BookmarkTreeNode,
  ) => void | ((node: chrome.bookmarks.BookmarkTreeNode) => Promise<void>);
  callbackOnNumber?: (n: number) => void;
};
