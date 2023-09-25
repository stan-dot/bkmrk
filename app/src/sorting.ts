
export const defaultSorterOptions:SorterOptions = {
autosort: false,
reverseSort: false,
foldersBeforeBookmarks: true,
deleteEmptyFolders: false,
mergeNeighboringFolders: true,
deleteDuplicatesInTheSameFolder: true,
useCaseSensitiveNameComparisons: false,
ignoreBookmarksBar: false,
donNotStartSortingIfBookmarkManagerIsActive: true,
treatHttpAndHttpsAsEquivalent: false,
identifyDuplicatesByURLOnly: false,
}; 

type SorterOptions = {
autosort: boolean,
reverseSort: boolean,
foldersBeforeBookmarks: boolean,
deleteEmptyFolders: boolean,
mergeNeighboringFolders: boolean,
deleteDuplicatesInTheSameFolder: boolean,
useCaseSensitiveNameComparisons: boolean,
ignoreBookmarksBar: boolean,
donNotStartSortingIfBookmarkManagerIsActive: boolean,
treatHttpAndHttpsAsEquivalent: boolean,
identifyDuplicatesByURLOnly: boolean,
}