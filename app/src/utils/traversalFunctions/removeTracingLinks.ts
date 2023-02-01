

const removableLinks:RegExp[] = [
  /(\?ref=)/g,
  /(\?mtrref)/g,
  /(\~#text)/g,
  /(\?utm_medium)/g
];

export function removeTracingLinks(b:chrome.bookmarks.BookmarkTreeNode):number{
  // one of the removers mush match finally, that one is passed later
  if (b.url === undefined) return 0;
  const matchedExpression = removableLinks.find(re => b.url?.match(re));
  if (matchedExpression === undefined) return 0;
  const newUrl = detraceUrl(b.url, matchedExpression);
  chrome.bookmarks.update( b.id, { url: newUrl });
  return 1;
}


function detraceUrl(url: string, matchedString:RegExp): string{
  return url.replace(matchedString, "");
}