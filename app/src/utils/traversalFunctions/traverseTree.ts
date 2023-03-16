export type TraverseArgs = {
  callbackOnEachLeaf?: (
    node: chrome.bookmarks.BookmarkTreeNode,
  ) => void | ((node: chrome.bookmarks.BookmarkTreeNode) => Promise<void>);
  callbackOnEachNode?: (
    node: chrome.bookmarks.BookmarkTreeNode,
  ) => void | ((node: chrome.bookmarks.BookmarkTreeNode) => Promise<void>);
  callbackOnNumber?: (n: number) => void;
};

export async function traverseTree(
  args: TraverseArgs,
  root?: chrome.bookmarks.BookmarkTreeNode,
): Promise<void> {
  console.log("traversing the tree", args, " root: ", root);
  if (root === undefined) {
    globalTraverse(args);
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

async function globalTraverse(args: TraverseArgs): Promise<void> {
  const root: chrome.bookmarks.BookmarkTreeNode[] = await chrome.bookmarks
    .getTree();
  root.forEach((folder) => {
    traverseTree(args, folder);
  });
}
