import { BookmarkNode } from "../../../lib/typesFacade";

export async function useFirstLayerAllChildren(
  things: BookmarkNode[],
): Promise<BookmarkNode[]> {
  const itemsPromise: Promise<BookmarkNode[]>[] = things
    .map((b) => chrome.bookmarks.getChildren(b.id));

  const resolved: BookmarkNode[][] = await Promise.all(
    itemsPromise,
  );

  return resolved.flat();
}
