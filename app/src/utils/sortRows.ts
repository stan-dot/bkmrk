export type SortOptions = {
  key: PossibleKeys;
  reverse: boolean;
};

type PossibleKeys = "date" | "title"; //| 'childrenNum';

const DEFAULT_SORT_OPTIONS: SortOptions = {
  key: "title",
  reverse: false,
};

export function sortRows(
  rows: chrome.bookmarks.BookmarkTreeNode[],
  sortOptions?: SortOptions,
): void {
  // console.debug("sort options", sortOptions);
  const { key, reverse } = sortOptions ?? DEFAULT_SORT_OPTIONS;
  const sorted = sorting(key, rows, reverse);
  // console.debug("before sorting:", rows, " after sorting: ", sorted);
  callToBookmarksApi(sorted);
}

function callToBookmarksApi(sorted: chrome.bookmarks.BookmarkTreeNode[]): void {
  sorted.forEach((v, i) => {
    const args: chrome.bookmarks.BookmarkDestinationArg = {
      parentId: v.parentId,
      index: i,
    };
    chrome.bookmarks.move(v.id, args);
  });
}

function sorting(
  key: PossibleKeys,
  rows: chrome.bookmarks.BookmarkTreeNode[],
  reverse: boolean,
): chrome.bookmarks.BookmarkTreeNode[] {
  if (key === "title") {
    const multiplier = reverse ? -1 : 1;
    return rows.sort((a, b) =>
      ("" + a.title).localeCompare(b.title) * multiplier
    );
  }

  if (key === "date") {
      const multiplier = reverse ? -1 : 1;
    return rows.sort((a, b) => {
      const value = (a.dateAdded! - b.dateAdded!) * multiplier;
      return value;
    });
  }
  throw Error("unknown sorting key");
}
