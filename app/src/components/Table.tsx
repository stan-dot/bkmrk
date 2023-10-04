import "@glideapps/glide-data-grid/dist/index.css";
import { useCallback, useEffect, useState } from "react";
import { useLocationDispatch } from "../features/path/LocationContext";
import { CornerMenu } from "../features/corner-menu/CornerMenu";
import { usePath, usePathDispatch } from "../features/path/PathContext";
import { PathDisplay } from "../features/path/components/PathDisplay";
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
import useBookmarkChange from "../lib/hooks/ChangeListener";
import useChildren from "../lib/hooks/useChildren";
import { useRoot } from "../lib/hooks/useRoot";

type MainDisplayStates =
  | "LOADING"
  | "LOADED"
  | "RESULT_EMPTY"
  | "SEARCH_RESULT";

export function TableLoader(): JSX.Element {
  const [loaded, setLoaded] = useState<MainDisplayStates>("LOADING");
  const [rows, setRows] = useState<BookmarkNode[]>([]);
  const [globalTree, setGlobalTree] = useState<
    BookmarkNode[]
  >([]);

  const path = usePath();
  const pathDispatch = usePathDispatch();
  const locationDispatch = useLocationDispatch();

  const lastPathItem: () => BookmarkNode = useCallback(
    () => path.items.at(-1) ?? globalTree[0],
    [globalTree, path.items],
  );

  const reloadWithNode = useCallback(
    (root: BookmarkNode[]) => {
      setLoaded("LOADED");
      const bookmarksBar: BookmarkNode = root[0].children![0];
      pathDispatch({
        type: "full",
        nodes: [...root, bookmarksBar],
      });
    },
    [pathDispatch],
  );

  if (loaded === "LOADING") {
    // reloadWithNode(path.items);
    const root = useRoot();
    const children = useChildren(root.id);
    locationDispatch({type:'replace', nodeNames:children.map(c=>c.id)})
    setGlobalTree(children);
    reloadWithNode(root);
  }

  const handleBookmarkChange = (id: string, changeInfo: any) => {
    console.log("Handling in component:", id, changeInfo);
    // Handle the change event within your component...
    reloadWithNode(path.items);
  };

  useBookmarkChange(handleBookmarkChange);
  const currentLast = lastPathItem();
  const children = useChildren(currentLast.id);
  // todo change this, not sure. maybe all should be through a context, not like this

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
          <MenuContextHook  />
          <BookmarkTable
            rows={rows}
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
