import React, { useCallback } from "react";
import { useBookmarks } from "../lib/GlobalReducer";
import { BookmarkNode } from "../lib/typesFacade";
import { Navbar } from "./Navbar";
import { PathDisplay } from "../features/path/components/PathDisplay";
import { LowerPanelContainer } from "./styled-components/LowerPanelContainer";
import { MainContainer } from "./styled-components/MainContainer";
import { BookmarkTable } from "../features/table/BookmarkTable";
import { SideTree } from "../features/sidetree/components/SideTree";
import { useBookmarkChange } from "../lib/hooks/useBookmarkChange";
import { SearchResultsTable } from "../features/search/SearchResultsTable";
import { LoadingScreen } from "./styled-components/LoadingScreen";

function New2Table() {
  const { state, dispatch } = useBookmarks();
  const { tree, path, rows, loading, error, search } = state;

  const callback = (eventType: string, id: string, info: string) => {
    console.log("Handling in component:", id, info);
    dispatch({ type: "SET_PATH", payload: path });
    // todo hopefully not infinite reloads
  };

  useBookmarkChange(callback);

  return (
    <>
      <Navbar rows={rows} />
      <PathDisplay />
      <LowerPanelContainer>
        <LoadingScreen loading={false} />
        <SideTree tree={tree} />
        <MainContainer>
          {search
            ? <SearchResultsTable rows={rows} />
            : <BookmarkTable rows={rows} />}
        </MainContainer>
      </LowerPanelContainer>
    </>
  );
}

export default New2Table;
