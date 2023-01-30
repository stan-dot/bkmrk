

export async function deleteAllEmpty():Promise<number> {
  let count = 0
  chrome.bookmarks.getTree((results:chrome.bookmarks.BookmarkTreeNode[]) => {
    count = results.reduce(async (prev, current) => (await deleteAllInSubtree(current)) + prev, 0);
  })
  return count;

}

async function deleteAllInSubtree(treeRoot: chrome.bookmarks.BookmarkTreeNode): Promise<number>{
  const children: chrome.bookmarks.BookmarkTreeNode[] = await chrome.bookmarks.getChildren(treeRoot.id);
  if (children.length === 0) {
    chrome.bookmarks.remove(treeRoot.id);
    return 1;
  }
return children.reduce(async (prev, current) => await deleteAllInSubtree(current) + prev, 0);
}
