

const removableLinks:RegExp[] = [
  /(\?ref=)/g,
  /(\?mtrref)/g,
  /(\~#text)/g,
  /(\?utm_medium)/g
];




// todo traverse the tree and change every item 
export async function removeTracingLinks(): Promise<number>{
  let count = 0;

  // regex match
  // here some loop
  // one of the removers mush match finally, that one is passed later
  let mkrk: chrome.bookmarks.BookmarkTreeNode = {
    title: "",
    id: "",
    url:''
  };
  removableLinks.forEach(re => {
    mkrk.url?.match(re);
    // todo early return search
    // if null, continue on
    // if found, should break the loop and go to the changing bit
  });

  const matchedExpression = removableLinks[0];

  chrome.bookmarks.update(
    mkrk.title,
    { url: detraceUrl(mkrk.url!, matchedExpression) }
  );

  return count;
  }


function detraceUrl(url: string, matchedString:RegExp): string{
  return url.replace(matchedString, "");

}