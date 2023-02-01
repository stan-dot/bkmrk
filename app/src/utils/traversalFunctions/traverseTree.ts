// todo also callback on each if not final
// maybe a separate increase callback?

type TraverseOptions = {
  callbackOnEachLeaf?: (node: chrome.bookmarks.BookmarkTreeNode) => void;
  callbackOnEachNode?: (node: chrome.bookmarks.BookmarkTreeNode) => void;
  callbackOnNumber?: (n: number) => void;
};

export function traverseTree(
  root: chrome.bookmarks.BookmarkTreeNode,
  options: TraverseOptions,
): void {
  

}

function createBookmarkNodes(
  parentid: string,
  bookmarks: chrome.bookmarks.BookmarkTreeNode[],
) {
  bookmarks.forEach(function (bm) {
    chrome.bookmarks.create({
      parentId: parentid,
      title: bm.title,
      url: bm.url,
    }, function (result) {
      if (bm.submenu && bm.submenu.length > 0) {
        createBookmarkNodes(result.id, bm.submenu);
      }
    });
  });
}
