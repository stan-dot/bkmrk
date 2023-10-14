import { BookmarkNode } from "../lib/typesFacade";

export function isAFolder(item: BookmarkNode): boolean {
  return !item.url;
}

// todo make another function to this support many items

export function getChildrenLinksMany(
  items: BookmarkNode[],
): BookmarkNode[] {
  return items.map(getChildrenLinks).flat();
}

function getChildrenLinks(
  item: BookmarkNode,
): BookmarkNode[] {
  if (!item.children) return []; 
  return item.children.filter((v) => !isAFolder(v));
}

