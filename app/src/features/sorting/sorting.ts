import { TraverseArgs, globalTraverse } from "./utils/traversalFunctions/traverseTree";

export const defaultSorterOptions: SorterOptions = {
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

export type SorterOptions = {
  // general setting
  autosort: boolean;
  donNotStartSortingIfBookmarkManagerIsActive: boolean;

  // specific order sorting patterns
  reverseSort: boolean;
  foldersBeforeBookmarks: boolean;
  mergeNeighboringFolders: boolean;

  // deletion settings
  deleteDuplicatesInTheSameFolder: boolean;
  deleteEmptyFolders: boolean;

  // comparison conditions
  identifyDuplicatesByURLOnly: boolean;
  treatHttpAndHttpsAsEquivalent: boolean;
  useCaseSensitiveNameComparisons: boolean;

  // scope modifiers
  ignoreBookmarksBar: boolean;
  
  // FUTURE
  addSourceTag?:string;
};

function getLocalSortingOptions(): SorterOptions {
}

export default function sorting() {
  const options:SorterOptions = getLocalSortingOptions();
  const args:TraverseArgs={
    callbackOnEachLeaf:{},
    callbackOnEachNode:{}
  };
  // first ignore bookmarks mark
  globalTraverse(args);
  // delete empty
  // merge neighboring
  // use comparison operators and ordering options
}
