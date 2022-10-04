
export function makeFolder(parentId:string, title:string) {
  const args:chrome.bookmarks.BookmarkCreateArg= { parentId:parentId, title: title };
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