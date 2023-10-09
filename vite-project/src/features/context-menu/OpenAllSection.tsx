import { BookmarkNode } from "../../lib/typesFacade";
import { ContextMenuButton } from "./ContextMenuButton";
import { useChildLinks } from "./hooks/useChildLinks";

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

export function OpenAllSection(
  props: { things: BookmarkNode[] },
): JSX.Element {
  // console.debug("open all links", props.things, "all are folders", allFolders);
  const links: BookmarkNode[] = useChildLinks(props.things);

  const n = links.length;
  const haslinks: boolean = n > 0;

  return (
    <div className="group3  flex flex-col">
      <ContextMenuButton
        textNode={<p>Open all &#40;{n}&#41;</p>}
        callback={(e: any) => openAllSelected(links)}
        disabled={!haslinks}
      />
      <ContextMenuButton
        textNode={<p>Open all &#40;{n}&#41; in new window</p>}
        callback={(e: any) =>
          openAllSelected(links, { newWindow: true, incognito: false })}
        disabled={!haslinks}
      />
      <ContextMenuButton
        textNode={<p>Open all &#40;{n}&#41; in Incognito window</p>}
        callback={(e: any) =>
          openAllSelected(links, { newWindow: true, incognito: true })}
        disabled={!haslinks}
      />
      <ContextMenuButton
        disabled={!haslinks || n <= 1}
        textNode={<p>Open 1 random from &#40;{n}&#41; selected</p>}
        callback={() => openRandomTab(links)}
      />
    </div>
  );
}

function openRandomTab(links: chrome.bookmarks.BookmarkTreeNode[]) {
  return (e: any) => {
    const index: number = Math.floor(
      Math.random() * links.length,
    );
    chrome.tabs.create({ url: links[index].url });
  };
}
