


export type SortOptions = {
  key: string,
  reverse: boolean
}

const DEFAULT_SORT_OPTIONS: SortOptions = {
  key: "",
  reverse: false
};

export function rowSorter(rows: chrome.bookmarks.BookmarkTreeNode[], sortOpts?:SortOptions): chrome.bookmarks.BookmarkTreeNode[] {
  const appliedOptions: SortOptions = {
    key: sortOpts?.key ?? DEFAULT_SORT_OPTIONS.key,
    reverse: sortOpts?.reverse ?? DEFAULT_SORT_OPTIONS.reverse,
  };

  return rows;

}