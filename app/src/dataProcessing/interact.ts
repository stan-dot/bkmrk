
export interface BookmarkCreateArg {
  /** Optional. Defaults to the Other Bookmarks folder.  */
  parentId?: string | undefined;
  index?: number | undefined;
  title?: string | undefined;
  url?: string | undefined;
}

export function makeFolder(parentId:string, title:string) {
  const args:BookmarkCreateArg = { parentId:parentId, title: title };
  chrome.bookmarks.create(
    args,
    folderCallback
  );
}
const folderCallback = (result: chrome.bookmarks.BookmarkTreeNode) => {
console.log("added folder: " +result.title);
}


export function makeBookmark(folderId:string) {
  chrome.bookmarks.create({
    parentId: folderId,
    title: 'Extensions doc',
    url: 'https://developer.chrome.com/docs/extensions',
  });
}