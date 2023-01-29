export type SortOptions = {
  key: PossibleKeys;
  reverse: boolean;
};

export type PossibleKeys = "date" | "title"; //| 'childrenNum';

const DEFAULT_SORT_OPTIONS: SortOptions = {
  key: "title",
  reverse: false,
};

export function rowSorter(
  rows: chrome.bookmarks.BookmarkTreeNode[],
  sortOptions?: SortOptions,
): chrome.bookmarks.BookmarkTreeNode[] {
  const { key, reverse } = sortOptions ?? DEFAULT_SORT_OPTIONS;
  if (key === "title") {
    return rows.sort((a, b) =>
      ("" + a.title).localeCompare(b.title) * (reverse ? -1 : 1)
    );
  }

  if (key === "date") {
    return rows.sort((a, b) =>
      (a.dateAdded ?? 0 - (b.dateAdded ?? 0)) * (reverse ? -1 : 1)
    );
  }
  console.error("unknown sort key", key);
  return rows;
}
