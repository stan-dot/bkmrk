import { useEffect, useState } from "react";
import { isAFolder, openAllSelected } from "../../utils/ifHasChildrenFolders";
import { contextMenuButtonClass } from "./contextMenuButtonClass";

async function getChildenSimple(
  things: chrome.bookmarks.BookmarkTreeNode[],
): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
  const itemsPromise: Promise<chrome.bookmarks.BookmarkTreeNode[]>[] = things
    .map((b) => chrome.bookmarks.getChildren(b.id));

  const resolved: chrome.bookmarks.BookmarkTreeNode[][] = await Promise.all(
    itemsPromise,
  );

  return resolved.flat();
}

export function OpenAllSection(
  props: { things: chrome.bookmarks.BookmarkTreeNode[] },
): JSX.Element {
  const allFolders = props.things.every(isAFolder);

  const [links, setLinks] = useState<chrome.bookmarks.BookmarkTreeNode[]>(
    props.things,
  );
  console.log("open all links", props.things, "all are folders", allFolders);

  useEffect(() => {
    if (allFolders) {
      getChildenSimple(props.things).then((links) => {
        console.log("children links", links);
        setLinks(links);
      });
    }
  }, [allFolders, props.things]);

  const haslinks: boolean = links.length > 0;

  return (
    <div className="group3  flex flex-col">
      <button
        onClick={(e) => openAllSelected(links)}
        disabled={!haslinks}
        className={contextMenuButtonClass}
      >
        <p>Open all &#40;{links.length}&#41;</p>
      </button>
      <button
        onClick={(e) =>
          openAllSelected(links, { newWindow: true, incognito: false })}
        disabled={!haslinks}
        className={contextMenuButtonClass}
      >
        <p>Open all &#40;{links.length}&#41; in new window</p>
      </button>
      <button
        onClick={(e) =>
          openAllSelected(links, { newWindow: true, incognito: true })}
        disabled={!haslinks}
        className={contextMenuButtonClass}
      >
        <p>Open all &#40;{links.length}&#41; in Incognito window</p>
      </button>
      {links.length > 1 &&
        (
          <button
            onClick={(e) => {
              const index: number = Math.floor(
                Math.random() * links.length,
              );
              chrome.tabs.create({ url: links[index].url });
            }}
            disabled={!haslinks}
            className={contextMenuButtonClass}
          >
            <p>Open 1 random from &#40;{links.length}&#41; selected</p>
          </button>
        )}
    </div>
  );
}
