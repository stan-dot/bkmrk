import { SortOptions } from "../utils/rowSorter";

export type ContextMenuProps = {
    thing: chrome.bookmarks.BookmarkTreeNode;
    position: number[];
    closeCallback: () => void;
    sortCallback: (node: chrome.bookmarks.BookmarkTreeNode, config:SortOptions)=> void
}