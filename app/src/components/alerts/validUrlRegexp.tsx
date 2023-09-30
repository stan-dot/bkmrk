const validUrlRegexp: RegExp =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export function checkIfCreateBookmarkValid(
  data: chrome.bookmarks.BookmarkCreateArg,
): boolean {
  const url = data.url;
  return url !== undefined && url.length > 0 &&
    url.match(validUrlRegexp) !== undefined;
}
