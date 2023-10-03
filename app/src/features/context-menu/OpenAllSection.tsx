import { useEffect, useState } from "react";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { contextMenuButtonClass } from "./contextMenuButtonClass";

type OpenAllOptions = {
  newWindow: boolean;
  incognito: boolean;
};

const defaultOptions: OpenAllOptions = {
  newWindow: false,
  incognito: false,
};

async function openAllSelected(
  selected: BookmarkNode[],
  options?: OpenAllOptions,
): Promise<void> {
  const { newWindow, incognito } = options || defaultOptions;
  const urlsToSend: string[] = selected.filter((v) => v.url).map((v) => v.url!);

  if (incognito) {
    const createData: chrome.windows.CreateData = {
      incognito: true,
      url: urlsToSend,
    };
    await chrome.windows.create(createData);
    return;
  }

  if (newWindow) {
    const createData: chrome.windows.CreateData = { url: urlsToSend };
    await chrome.windows.create(createData);
    return;
  }

  urlsToSend.forEach((urlToSend: string) => {
    chrome.tabs.create({ url: urlToSend });
  });
}
async function getChildenSimple(
  things: BookmarkNode[],
): Promise<BookmarkNode[]> {
  const itemsPromise: Promise<BookmarkNode[]>[] = things
    .map((b) => chrome.bookmarks.getChildren(b.id));

  const resolved: BookmarkNode[][] = await Promise.all(
    itemsPromise,
  );

  return resolved.flat();
}

export function OpenAllSection(
  props: { things: BookmarkNode[] },
): JSX.Element {
  const allFolders = props.things.every(isAFolder);

  const [links, setLinks] = useState<BookmarkNode[]>(
    props.things,
  );
  // console.debug("open all links", props.things, "all are folders", allFolders);

  useEffect(() => {
    if (allFolders) {
      getChildenSimple(props.things).then((links) => {
        // console.debug("children links", links);
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
