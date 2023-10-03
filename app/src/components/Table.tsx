import "@glideapps/glide-data-grid/dist/index.css";
import { useCallback, useEffect, useState } from "react";
import { useLocationDispatch } from "../contexts/LocationContext";
import { CornerMenu } from "../features/corner-menu/CornerMenu";
import { usePath, usePathDispatch } from "../features/path/PathContext";
import { PathDisplay } from "../features/path/PathDisplay";
import { SearchField } from "../features/search/components/SearchField";
import { SideTree } from "../features/sidetree/components/SideTree";
import MenuContextHook from "../features/test-contextmenu/MenuContextHook";
import { TestContextMenu } from "../features/test-contextmenu/TestContextMenu";
import { BookmarkTable } from "../features/table/BookmarkTable";
import CRUDBookmarkFacade from "../lib/CRUDBookmarkFacade";
import { LowerPanelContainer } from "./styled-components/LowerPanelContainer";
import { LoadingScreen } from "./styled-components/LoadingScreen";
import { MainContainer } from "./styled-components/MainContainer";
import { BookmarkNode } from "../lib/typesFacade";

type MainDisplayStates =
  | "LOADING"
  | "LOADED"
  | "RESULT_EMPTY"
  | "SEARCH_RESULT";

type DataTest = {
  id: number;
  title: string;
};

const data: DataTest[] = [
  { id: 1, title: "message1" },
  { id: 2, title: "message2" },
  { id: 3, title: "message3" },
  { id: 4, title: "message4" },
];

export function TableLoader(): JSX.Element {
  const [loaded, setLoaded] = useState<MainDisplayStates>("LOADING");
  const [rows, setRows] = useState<BookmarkNode[]>([]);
  const [globalTree, setGlobalTree] = useState<
    BookmarkNode[]
  >([]);

  const path = usePath();
  const pathDispatch = usePathDispatch();

  const rootNodesDispatch = useLocationDispatch();

  const lastPathItem: () => BookmarkNode = useCallback(
    () => path.items.at(-1) ?? globalTree[0],
    [globalTree, path.items],
  );

  const reloadWithNode = useCallback(
    (root: BookmarkNode[]) => {
      setLoaded("LOADED");
      const bookmarksBar: BookmarkNode = root[0].children![0];

      // setRows(bookmarksBar.children ?? []);
      pathDispatch({
        type: "full",
        nodes: [...root, bookmarksBar],
      });
    },
    [pathDispatch],
  );

  if (loaded === "LOADING") {
    // reloadWithNode(path.items);
    chrome.bookmarks.getTree().then(
      (root: BookmarkNode[]) => {
        console.debug("loaded!");
        // todo here might be an error
        setGlobalTree(root[0].children!);
        reloadWithNode(root);
        const names = root[0].children?.map((b) => b.title);
        if (names) {
          rootNodesDispatch({
            type: "replace",
            nodeNames: names,
          });
        }
      },
    );
  }

  const deltaListener = useCallback((e?: string): void => {
    console.debug("the bookmarks have changed...", e);
    reloadWithNode(path.items);
  }, [path.items, reloadWithNode]);

  useEffect(() => {
    chrome.bookmarks.onChanged.addListener(deltaListener);
    chrome.bookmarks.onMoved.addListener(deltaListener);
    chrome.bookmarks.onRemoved.addListener(deltaListener);
    chrome.bookmarks.onImportEnded.addListener(deltaListener);
    return () => {
      chrome.bookmarks.onChanged.removeListener(deltaListener);
      chrome.bookmarks.onMoved.removeListener(deltaListener);
      chrome.bookmarks.onRemoved.removeListener(deltaListener);
      chrome.bookmarks.onImportEnded.removeListener(deltaListener);
    };
  }, [deltaListener]);

  // todo make this into a custom hook
  useEffect(() => {
    const currentLast = lastPathItem();
    // console.debug("current last:", currentLast);
    if (currentLast) {
      chrome.bookmarks.getChildren(currentLast.id).then((children) => {
        setRows(children);
      });
    }
  }, [path, lastPathItem]);

  const dataCallback = (nodes: BookmarkNode[]): void => {
    setRows(nodes);
  };

  const pathDisplayPasteHandler = (e: React.ClipboardEvent<Element>) => {
    const parentId = lastPathItem().id;
    e.preventDefault();
    console.debug(e);
    CRUDBookmarkFacade.createBookmarksFromPaste(e, parentId);
  };

  return (
    <>
      <Navbar
        dataCallback={dataCallback}
        lastPathItem={lastPathItem}
        rows={rows}
      />
      <PathDisplay
        onPasteHandler={pathDisplayPasteHandler}
      />
      <LowerPanelContainer>
        <LoadingScreen loading={loaded === "LOADING"} />
        <SideTree nodes={globalTree} setRowsCallback={dataCallback} />
        <MainContainer>
          <TestContextMenu />
          <MenuContextHook data={data} />
          <BookmarkTable
            rows={rows}
            setRowsCallback={dataCallback}
            searchResultsMode={loaded === "SEARCH_RESULT"}
          />
        </MainContainer>
      </LowerPanelContainer>
    </>
  );
}

type NavbarProps = {
  dataCallback: (nodes: BookmarkNode[]) => void;
  lastPathItem: () => BookmarkNode;
  rows: BookmarkNode[];
};

export function Navbar(
  {
    dataCallback,
    lastPathItem,
    rows,
  }: NavbarProps,
) {
  return (
    <nav className="fixed w-full h-16 top-0 flex justify-between bg-slate-700 z-10">
      <div className="flex align-middle" id="brandingBit">
        <p className="text-2xl mt-2 ml-2 text-white">
          &#128366; BKMRK
        </p>
      </div>
      <SearchField setDataCallback={dataCallback} />
      <CornerMenu
        dataCallback={dataCallback}
        rows={rows}
      />
    </nav>
  );
}
