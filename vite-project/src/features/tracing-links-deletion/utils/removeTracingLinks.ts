import { useRoot } from "../../../lib/hooks/useRoot";
import { BookmarkNode } from "../../../lib/typesFacade";
import {
  defaultTracingRegexes,
  getSettings,
} from "../../settings/Settings";

export async function getLinks(): Promise<RegExp[]> {
  const settings = await getSettings();
  return settings.tracingLinksRegexes;
}

export async function removeTracingLinksFromChildren(
  parent: BookmarkNode,
): Promise<number> {
  console.log("removing links from parent:", parent);

  // const links = await getLinks();
  const regexes = defaultTracingRegexes;
  console.log("regexes here", regexes);

  const sanitizeCallback = (node: BookmarkNode) => {
    console.log("inside the sanitize callback");
    removeTracingLinks(node, regexes);
  };
  
  let count = 0;
    const children: BookmarkNode[] = await chrome.bookmarks.getChildren(parent.id);
  children.forEach((c) => {
    sanitizeCallback(c);
    count++;
  });

  return count;
}

async function removeAllTracingLinks(root:BookmarkNode): Promise<number> {
  if(root) return removeTracingLinksFromChildren(root);
  return 0;
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
  b: BookmarkNode,
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
