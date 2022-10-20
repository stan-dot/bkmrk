/**
 * todo this needs to find the easiest path for the final root
 * @param node
 */

export async function getPath(
  node: chrome.bookmarks.BookmarkTreeNode
): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
  let output: chrome.bookmarks.BookmarkTreeNode[] = [node];
  let lastNode: chrome.bookmarks.BookmarkTreeNode = node;
  while (lastNode.parentId) {
    const parent = await chrome.bookmarks.get(lastNode.parentId);
    console.log("getting parent of the clicked element", parent);
    output.unshift(parent[0]);
    lastNode = parent[0];
  }
  return output;
}
