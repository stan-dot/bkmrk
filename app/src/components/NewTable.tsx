import { useCallback, useEffect, useState } from "react";
import { usePath, usePathDispatch } from "../features/path/PathContext";
import useBookmarkChange from "../lib/hooks/ChangeListener";
import useChildren from "../lib/hooks/useChildren";
import { useRoot } from "../lib/hooks/useRoot";
import { BookmarkNode } from "../lib/typesFacade";
import { CornerMenu } from "../features/corner-menu/CornerMenu";
import { PathDisplay } from "../features/path/components/PathDisplay";
import { SearchField } from "../features/search/components/SearchField";
import { SideTree } from "../features/sidetree/components/SideTree";
import { BookmarkTable } from "../features/table/BookmarkTable";
import { TestContextMenu } from "../features/test-contextmenu/TestContextMenu";
import { LoadingScreen } from "./styled-components/LoadingScreen";
import { LowerPanelContainer } from "./styled-components/LowerPanelContainer";
import { MainContainer } from "./styled-components/MainContainer";
import { useLocationDispatch } from "../features/path/LocationContext";
import CRUDBookmarkFacade from "../lib/CRUDBookmarkFacade";

type MainDisplayStates =
  | "LOADING"
  | "LOADED"
  | "RESULT_EMPTY"
  | "SEARCH_RESULT";

// Custom Hook for managing bookmark nodes
function useBookmarks() {
  const [loaded, setLoaded] = useState<MainDisplayStates>("LOADING");
  const [rows, setRows] = useState<BookmarkNode[]>([]);
  const [globalTree, setGlobalTree] = useState<BookmarkNode[]>([]);
  const path = usePath();
  const pathDispatch = usePathDispatch();

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

  const root = useRoot();
  useEffect(() => {
    if (!root) {
      throw (_e: any) => {
        console.error("error loading bookmark tree root");
      };
    }
    const children = useChildren(root!.id);
    setGlobalTree(children);
    reloadWithNode([root]);
  }, [loaded, reloadWithNode]);

  const handleBookmarkChange = useCallback(
    (id: string, changeInfo: any) => {
      console.log("handling in the component: ", id, changeInfo);
      reloadWithNode(path.items);
    },
    [reloadWithNode],
  );
  useBookmarkChange(handleBookmarkChange);

  return { root, loaded, rows, globalTree, reloadWithNode, setRows, setLoaded };
}

export function NewTableLoader(): JSX.Element {
  const {
    root,
    loaded,
    rows,
    globalTree,
    reloadWithNode,
    setRows,
  } = useBookmarks();

  const path = usePath();
  const pathDispatch = usePathDispatch();
  const locationDispatch = useLocationDispatch();

  const lastPathItem: () => BookmarkNode = useCallback(
    () => path.items.at(-1) ?? globalTree[0],
    [globalTree, path.items],
  );

  const currentLast = lastPathItem();
  // const children = useChildren(currentLast.id);

  const pathDisplayPasteHandler = (e: React.ClipboardEvent<Element>) => {
    const parentId = lastPathItem().id;
    e.preventDefault();
    console.debug(e);
    CRUDBookmarkFacade.createBookmarksFromPaste(e, parentId);
  };

  return (
    <>
      <Navbar
        dataCallback={setRows} // directly pass the setRows
        lastPathItem={lastPathItem}
        rows={rows}
      />
      <PathDisplay
        onPasteHandler={pathDisplayPasteHandler}
      />
      <LowerPanelContainer>
        <LoadingScreen loading={loaded === "LOADING"} />
        <SideTree nodes={globalTree} setRowsCallback={setRows} />
        <MainContainer>
          {/* <TestContextMenu /> */}
          {/* <MenuContextHook  /> */}
          <BookmarkTable rows={rows} />
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
