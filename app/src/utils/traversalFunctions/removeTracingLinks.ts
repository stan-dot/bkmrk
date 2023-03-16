import {
  defaultTracingRegexes,
  getSettings,
} from "../../components/alerts/Settings";
import { TraverseArgs, traverseTree } from "./traverseTree";

export async function getLinks(): Promise<RegExp[]> {
  const settings = await getSettings();
  return settings.tracingLinksRegexes;
}

export async function removeTracingLinksFromChildren(
  parent: chrome.bookmarks.BookmarkTreeNode,
): Promise<number> {
  console.log("removing links from parent:", parent);

  // const links = await getLinks();
  const regexes = defaultTracingRegexes;
  console.log("regexes here", regexes);

  const sanitizeCallback = (node: chrome.bookmarks.BookmarkTreeNode) => {
    console.log("inside the sanitize callback");
    removeTracingLinks(node, regexes);
  };

  // let count = 0;

  // const countCallback = (n: number) => count += n;
  // const args: TraverseArgs = {
  //   callbackOnNumber: countCallback,
  //   //@ts-ignore line because it's union type of 2 functions, should be fine
  //   callbackOnEachLeaf: sanitizeCallback,
  // };

  // todo refactor this
  const children = await chrome.bookmarks.getChildren(parent.id);
  children.forEach((c) => {
    sanitizeCallback(c);
  });

  // traverseTree(args, parent).then(
  //   () => {
  //     return count;
  //   },
  // );
  return 0;
}

async function removeAllTracingLinks(): Promise<number> {
  const root = (await chrome.bookmarks.getTree())[0];
  return removeTracingLinksFromChildren(root);
}

function truncateUrl(url: string): string {
  const parsedUrl = new URL(url);
  parsedUrl.search = "";
  parsedUrl.hash = "";
  const u = parsedUrl.toString();
  console.log("before:", url, "after: ", u);
  return u;
}

function removeTracingLinks(
  b: chrome.bookmarks.BookmarkTreeNode,
  links: RegExp[],
): number {
  console.log("re");
  // one of the removers mush match finally, that one is passed later
  if (b.url === undefined) return 0;
  truncateUrl(b.url);
  const matchedExpression = links.find((re) => b.url?.match(re));
  if (matchedExpression === undefined) {
    console.log("expression failed", matchedExpression);
    return 0;
  }
  const newUrl = detraceUrl(b.url, matchedExpression);
  chrome.bookmarks.update(b.id, { url: newUrl }).then((r) => {
    console.log("update result:", r);
  });

  return 1;
}

function detraceUrl(url: string, matchedString: RegExp): string {
  return url.replace(matchedString, "");
}
