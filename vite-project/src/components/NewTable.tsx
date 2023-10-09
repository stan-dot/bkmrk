import { useCallback } from "react";
import { usePath } from "../features/path/PathContext";
import { PathDisplay } from "../features/path/components/PathDisplay";
import { SideTree } from "../features/sidetree/components/SideTree";
import { BookmarkTable } from "../features/table/BookmarkTable";
import CRUDBookmarkFacade from "../lib/CRUDBookmarkFacade";
import { BookmarkNode } from "../lib/typesFacade";
import { LoadingScreen } from "./styled-components/LoadingScreen";
import { LowerPanelContainer } from "./styled-components/LowerPanelContainer";
import { MainContainer } from "./styled-components/MainContainer";
import { useBookmarks } from "./useBookmarks";
import { Navbar } from "./Navbar";
import MenuContextHook from "../test-contextmenu/MenuContextHook";

export type MainDisplayStates =
  | "LOADING"
  | "LOADED"
  | "RESULT_EMPTY"
  | "SEARCH_RESULT";

export function NewTableLoader(): JSX.Element {
  const {
    rootArray,
    loaded,
    rows,
    globalTree,
    setRows,
  } = useBookmarks();

  const path = usePath();

  const lastPathItem: () => BookmarkNode = useCallback(
    () => path.items.at(-1) ?? globalTree[0],
    [globalTree, path.items],
  );

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
          {/* <TestContextMenu />
          <MenuContextHook  /> */}
          <BookmarkTable rows={rows} />
        </MainContainer>
      </LowerPanelContainer>
    </>
  );
}
