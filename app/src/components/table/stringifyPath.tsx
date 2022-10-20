export function stringifyPath(nodes: chrome.bookmarks.BookmarkTreeNode[]): string {
  return nodes.map((b: chrome.bookmarks.BookmarkTreeNode) => b.title).join("/");
}
