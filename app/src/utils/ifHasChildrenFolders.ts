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

// todo make another function to this support many items

export function getChildrenLinks(item: chrome.bookmarks.BookmarkTreeNode): chrome.bookmarks.BookmarkTreeNode[] {
  if (!item.children) {
    return [];
  }
  return item.children.filter(v => !isAFolder(v));
}

export type OpenAllOptions = {
  newWindow: boolean;
  incognito: boolean;
}

const defaultOptions:OpenAllOptions = {
  newWindow: false,
  incognito: false
};

export async function openAllChildren(parent: chrome.bookmarks.BookmarkTreeNode | chrome.bookmarks.BookmarkTreeNode[], options?:OpenAllOptions): Promise<void> {
  const { newWindow, incognito } = options || defaultOptions;
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