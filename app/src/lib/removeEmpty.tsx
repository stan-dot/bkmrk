import { toast } from "react-toastify";

export default class CurrentFolderActionsFacade {
  static async removeEmpty(
    rows: chrome.bookmarks.BookmarkTreeNode[],
    dataCallback: (bookmarks: chrome.bookmarks.BookmarkTreeNode[]) => void,
  ) {
    console.debug("all rows before partition", rows);
    const [folders, bkmrks] = await partition(rows, (b) => b.url === undefined);
    console.debug("just folders", folders);
    const [empty, nonEmptyFolders] = await partition(
      folders,
      async (b) => {
        const children = await chrome.bookmarks.getChildren(b.id);
        return children.length === 0;
      },
    );
    console.debug("empty: ", empty, "  nonempty: ", nonEmptyFolders);
    empty.forEach((b) => {
      chrome.bookmarks.remove(b.id);
    });
    dataCallback([...nonEmptyFolders, ...bkmrks]);
    toast(`filtered out ${empty.length} empty folders`);
    console.debug("diff: ", empty);
  }

  static async partition(
    array: chrome.bookmarks.BookmarkTreeNode[],
    isValid: (
      b: chrome.bookmarks.BookmarkTreeNode,
    ) => boolean | Promise<boolean>,
  ): Promise<TwoArrs> {
    const starter: TwoArrs = [[], []];
    array.forEach(async (e) => {
      await isValid(e) ? starter[0].push(e) : starter[1].push(e);
    });
    return starter;
  }
}

export type TwoArrs = [
  chrome.bookmarks.BookmarkTreeNode[],
  chrome.bookmarks.BookmarkTreeNode[],
];
