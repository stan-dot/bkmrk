import { SortOptions } from "../../utils/sortRows";

export type ContextMenuProps = {
    things: chrome.bookmarks.BookmarkTreeNode[];
    // position: number[];
    // closeCallback: () => void;
    sortCallback: (node: chrome.bookmarks.BookmarkTreeNode[], config:SortOptions)=> void
}