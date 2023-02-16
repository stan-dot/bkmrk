import { TraverseArgs, traverseTree } from "./traverseTree";

type CopyData = {
  sameTitles: chrome.bookmarks.BookmarkTreeNode[][],
  sameUrls: chrome.bookmarks.BookmarkTreeNode[][],
  sameBoth: chrome.bookmarks.BookmarkTreeNode[][],
}


// todo that is not finished, need to count each separately
export async function recognizeDuplicates(): Promise<number> {
  let count = 0;
  const uniqueUrlsSet = new Set();
  const addToCopiesCallback = (node: chrome.bookmarks.BookmarkTreeNode) => {
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
  await traverseTree(args)
  return count;
}


