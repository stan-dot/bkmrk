export function codeBookmarkToUriList(
  bookmarks: chrome.bookmarks.BookmarkTreeNode[],
  includeComments: boolean,
): string {
  let info = "";
  bookmarks.forEach((b) => {
    info += `#${b.title}\n`;
    if (includeComments) {
      info += `#${b.url}\n`;
    }
  });
  return info;
}

export function unpackBookmarks(
  dataTransfer: DataTransfer,
): chrome.bookmarks.BookmarkChangesArg[] {
  const data = dataTransfer.getData("text/uri-list");
  const lines: string[] = data.split("\n");

  let items: chrome.bookmarks.BookmarkChangesArg[] = [];
  for (let index = 0; index < lines.length; index += 2) {
    const title: string = lines[index];
    const url: string = lines[index + 1];
    const newObj: chrome.bookmarks.BookmarkChangesArg = {
      title: title,
      url: url,
    };
    items.push(newObj);
  }

  return items;
}

export function readRawTextAsBookmarks(
  dataTransfer: DataTransfer,
): chrome.bookmarks.BookmarkChangesArg[] {
  const data = dataTransfer.getData("text/plain");
  const lines: string[] = data.split("\n");

  let items: chrome.bookmarks.BookmarkChangesArg[] = [];
  for (let index = 0; index < lines.length; index += 1) {
    const url: string = lines[index];
    const newObj: chrome.bookmarks.BookmarkChangesArg = {
      title:url,
      url: url,
    };
    items.push(newObj);
  }

  return items;
}
