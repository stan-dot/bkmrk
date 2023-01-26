export function ifIsALeafNode(item: chrome.bookmarks.BookmarkTreeNode): boolean {
  if (!item.children) {
    return true;
  }
  const existingChildFolder: chrome.bookmarks.BookmarkTreeNode | undefined = item.children.find(v => isAFolder(v));
  return existingChildFolder ? true : false;
}

export function isAFolder(item: chrome.bookmarks.BookmarkTreeNode): boolean {
  return !item.url;
}

export function getChildrenLinks(item: chrome.bookmarks.BookmarkTreeNode): chrome.bookmarks.BookmarkTreeNode[] {
  if (!item.children) {
    return [];
  }
  return item.children.filter(v => !isAFolder(v));
}

/**
 * 
 * this doesn't assume that children are present, but if no children, it shouldn't show as active when only folders
 * @param parent
 * @param newWindow
 * @param incognito
 */


export async function openAllChildren(parent: chrome.bookmarks.BookmarkTreeNode, newWindow?: boolean, incognito?: boolean): Promise<void> {
  const children: chrome.bookmarks.BookmarkTreeNode[] | undefined = parent.children;
  if (!children)
    return;
  const urlsToSend: string[] = children.filter(v => v.url).map(v => v.url!);

  if (incognito) {
    const createData: chrome.windows.CreateData = { incognito: true, url: urlsToSend };
    await chrome.windows.create(createData);
    return;
  }

  if (newWindow) {
    const createData: chrome.windows.CreateData = { url: urlsToSend };
    await chrome.windows.create(createData)
    return;
  }

  urlsToSend.forEach((urlToSend: string) => {
    chrome.tabs.create({ url: urlToSend });
  });
}