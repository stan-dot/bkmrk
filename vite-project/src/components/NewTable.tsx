import { useCallback } from "react";
import { usePath } from "../features/path/PathContext";
import { PathDisplay } from "../features/path/components/PathDisplay";
import { SideTree } from "../features/sidetree/components/SideTree";
import { BookmarkTable } from "../features/table/BookmarkTable";
import { BookmarkNode } from "../lib/typesFacade";
import { Navbar } from "./Navbar";
import { LoadingScreen } from "./styled-components/LoadingScreen";
import { LowerPanelContainer } from "./styled-components/LowerPanelContainer";
import { MainContainer } from "./styled-components/MainContainer";
import { useBookmarks } from "./useBookmarks";

export type MainDisplayStates =
  | "LOADING"
  | "LOADED"
  | "RESULT_EMPTY"
  | "SEARCH_RESULT";

export function NewTableLoader(): JSX.Element {
  const {
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

  return (
    <>
      <Navbar  rows={rows} />
      <PathDisplay />
      <LowerPanelContainer>
        <LoadingScreen loading={loaded === "LOADING"} />
        <SideTree tree={globalTree} />
        <MainContainer>
          <BookmarkTable rows={rows} />
        </MainContainer>
      </LowerPanelContainer>
    </>
  );
}
