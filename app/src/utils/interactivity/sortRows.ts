// INSTRUCTIONS HOW TO SORT GIVEN A NODE AND PROPS
// boils down to deleting all children of a node,
// then doing a quicksort algorithm by the given index to get the monoid,
// then pasting into the children,
// then reloading the current path

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
):void {
  const { key, reverse } = sortOptions ?? DEFAULT_SORT_OPTIONS;
  const sorted = sorting(key, rows, reverse);
  console.log('before sorting:', rows, ' after sorting: ', sorted);
    callToBookmarksApi(sorted);
}

function callToBookmarksApi(sorted: chrome.bookmarks.BookmarkTreeNode[]) {
  sorted.forEach((v, i) => {
    const args: chrome.bookmarks.BookmarkCreateArg = {
      parentId: v.parentId,
      index: v.index,
      title: v.title,
      url: v.url,
    };
    chrome.bookmarks.create(args);
  });
}

function sorting(key:PossibleKeys,  rows: chrome.bookmarks.BookmarkTreeNode[], reverse: boolean): chrome.bookmarks.BookmarkTreeNode[] {
  if (key === "title") {
    return rows.sort((a, b) => ("" + a.title).localeCompare(b.title) * (reverse ? -1 : 1)
    );
  }

  if (key === "date") {
    return rows.sort((a, b) => (a.dateAdded ?? 0 - (b.dateAdded ?? 0)) * (reverse ? -1 : 1)
    );
  }
  throw Error('unknown sorting key');
  // return rows;
}
