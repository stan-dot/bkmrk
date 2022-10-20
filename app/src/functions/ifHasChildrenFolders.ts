export function ifIsALeafNode(item: chrome.bookmarks.BookmarkTreeNode): boolean {
  if (!item.children) {
    return true;
  }
  const existingChildFolder: chrome.bookmarks.BookmarkTreeNode | undefined = item.children.find(v => isAFolder(v));
  return existingChildFolder ? false:true;
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

  const standard: boolean = (!newWindow && !incognito);
  const currentWindow: chrome.windows.Window = await chrome.windows.getCurrent();
  // todo why is this possibly undefined?
  let finalId: number = currentWindow.id!;
  if (!standard) {
    const createData: chrome.windows.CreateData = { 'incognito': incognito ?? false };
    const openedNewWindow: chrome.windows.Window = await chrome.windows.create(createData);
    finalId = openedNewWindow.id!;
  }

  const newTabPropertiesGenerator: (url: string) => chrome.tabs.CreateProperties = (url: string) => {
    const props: chrome.tabs.CreateProperties = { windowId: finalId, url: url };
    return props;
  };

  children.forEach((b: chrome.bookmarks.BookmarkTreeNode) => {
    if (!isAFolder(b)) {
      chrome.tabs.create(newTabPropertiesGenerator(b.url!));
    }
  });
}