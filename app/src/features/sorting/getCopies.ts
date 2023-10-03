import { TraverseArgs, traverseTree } from "./traverseTree";

type CopyData = {
  sameTitles: BookmarkNode[][],
  sameUrls: BookmarkNode[][],
  sameBoth: BookmarkNode[][],
}

// todo that is not finished, need to count each separately
export async function recognizeDuplicates(): Promise<number> {
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
  await traverseTree(args)
  return count;
}


