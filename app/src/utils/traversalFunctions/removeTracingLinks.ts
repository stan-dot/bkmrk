import { TraverseArgs, traverseTree } from "./traverseTree";


const removableLinks:RegExp[] = [
  /(\?ref=)/g,
  /(\?mtrref)/g,
  /(\~#text)/g,
  /(\?utm_medium)/g
];

// todo integrate this, should be fairly easy
// the list of removable links as a thing from storage, with the option to restore defaults
export async function removeAllTracingLinks(): Promise<number> {

  const sanitizeCallback = (node: chrome.bookmarks.BookmarkTreeNode) => removeTracingLinks(node);

  let count = 0;

  const countCallback = (n: number) => count += n;
  const args: TraverseArgs = {
    callbackOnNumber: countCallback,
    //@ts-ignore line because it's union type of 2 functions, should be fine
    callbackOnEachLeaf: sanitizeCallback,
  };
  await traverseTree(args)
  return count;
}


function removeTracingLinks(b:chrome.bookmarks.BookmarkTreeNode):number{
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