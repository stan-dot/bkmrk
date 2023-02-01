export async function deleteAllEmpty(): Promise<number> {
  let count = 0;
  chrome.bookmarks.getTree(
    async (results: chrome.bookmarks.BookmarkTreeNode[]) => {
      count += results.reduce(async (prev, current) => {
        const newValue: number = await deleteAllInSubtree(current);
        return (newValue + prev);
      }, 0);
    },
  );
  return count;
}

async function deleteAllInSubtree(
  treeRoot: chrome.bookmarks.BookmarkTreeNode,
): Promise<number> {
  const children: chrome.bookmarks.BookmarkTreeNode[] = await chrome.bookmarks
    .getChildren(treeRoot.id);
  if (children === undefined || children.length === 0) {
    chrome.bookmarks.remove(treeRoot.id);
    return 1;
  }
  let count = 0;
  const reduced = children.reduce(
    async (prev, current) => {
      const num = cdeleteAllInSubtree(current);
      return (num + prev);
    },
    0,
  );
  return count;
}
