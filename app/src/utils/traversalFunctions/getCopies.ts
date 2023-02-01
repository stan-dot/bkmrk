import { TraverseArgs, traverseTree } from "./traverseTree";

type CopyData = {
  sameTitles: chrome.bookmarks.BookmarkTreeNode[][],
  sameUrls: chrome.bookmarks.BookmarkTreeNode[][],
  sameBoth: chrome.bookmarks.BookmarkTreeNode[][],
}


export async function getCopies(): Promise<number> {
  const uniqueUrlsSet = new Set();
  const addToCopiesCallback = (node: chrome.bookmarks.BookmarkTreeNode) => {
    const url = node.url;
    // todo complete this
  };

  let count = 0;

  const countCallback = (n: number) => count += n;
  const args: TraverseArgs = {
    //@ts-ignore line because it's union type of 2 functions, should be fine
    callbackOnEachNode: addToCopiesCallback,
  };
  await traverseTree(args)
  return count;
}


