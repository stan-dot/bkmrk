import { TraverseArgs, traverseTree } from "./traverseTree";

export async function deleteAllEmpty(): Promise<number> {
  const deleteCallback = (node: chrome.bookmarks.BookmarkTreeNode) =>
    chrome.bookmarks.remove(node.id);
  let count = 0;
  const countCallback = (n: number) => count += n;
  const args: TraverseArgs = {
    callbackOnNumber: countCallback,
    //@ts-ignore line because it's union type of 2 functions, should be fine
    callbackOnEachLeaf: deleteCallback,
  };
  await traverseTree(args)
  return count;
}
