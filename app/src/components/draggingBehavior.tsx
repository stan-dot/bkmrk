/**
 *
 */
export function draggingBehavior() {
  // if from main panel into side ponel - changes place
  // if from side panel into main panel - changes place too
  // if from main panel AND is a bookmark, dragging onto the search panel, a new tab is opened - that's tablet behavior
}
// todo internal memory location 1 - paste bin - could be quite long
// todo internal memory location 2 - things under the mouse when draggin
function handleCut(things: chrome.bookmarks.BookmarkTreeNode[]) {
  things.forEach(b => {
    chrome.bookmarks.remove(b.id);
  });
  handleCopy(things);
}
// if CUT OR COPY
// copy it to the app memory, with url and title - then holding in the memory the array of last deleted - this could be also a cookie
function handleCopy(things: chrome.bookmarks.BookmarkTreeNode[]) {
  const strings: string[] = things.map(v => v.url ?? v.title);
  const textWithNewLines: string = strings.reduce((prev, curr) => prev.concat(`\n ${curr}`), "");
  window.navigator.clipboard.writeText(textWithNewLines);
}
// if PASTE
// if detected same url as the meemory one, add with the old name in the new location
// if a fresh install, have the same name as url
// todo index should be found form the last clicked element, or selected one +1. always under, never into the folder. that could be changed

function handlePaste() {
  const arg: chrome.bookmarks.BookmarkCreateArg = {
    // parentId: string | undefined,
    // index: number | undefined,
    // title: string | undefined,
    // url: string | undefined
  };
  chrome.bookmarks.create(arg);
}
