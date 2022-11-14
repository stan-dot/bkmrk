
export type ContextMenuProps = {
    thing: chrome.bookmarks.BookmarkTreeNode;
    position: number[];
    closeCallback: () => void;
    sortCallback:()=>void
}