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
    return rows.sort((a, b) =>
      ("" + a.title).localeCompare(b.title) * (reverse ? -1 : 1)
    );
  }

  if (key === "date") {
    // console.log('comparing dates');
    return rows.sort((a, b) => {
      // console.log('a date added ', a.dateAdded, 'b date added: ', b.dateAdded);
      // const value = (a.dateAdded ?? 0 - (b.dateAdded ?? 0)) * (reverse ? -1 : 1);
      const value = (a.dateAdded! - b.dateAdded!) * (reverse ? -1 : 1);
      // console.log(value);
      return value;
    });
  }
  throw Error("unknown sorting key");
  // return rows;
}
