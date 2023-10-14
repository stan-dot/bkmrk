import { PathDisplay } from "../features/path/components/PathDisplay";
import { SearchResultsTable } from "../features/search/SearchResultsTable";
import { SideTree } from "../features/sidetree/components/SideTree";
import { BookmarkTable } from "../features/table/BookmarkTable";
import { useBookmarks } from "../lib/GlobalReducer";
import { useBookmarkChange } from "../lib/hooks/useBookmarkChange";
import { Navbar } from "./Navbar";
import { LoadingScreen } from "./styled-components/LoadingScreen";
import { LowerPanelContainer } from "./styled-components/LowerPanelContainer";
import { MainContainer } from "./styled-components/MainContainer";

function Table() {
  const { state, dispatch } = useBookmarks();
  const { path, rows, search } = state;

  const callback = (eventType: string, id: string, info: string) => {
    console.log("Handling in component:", id, info);
    dispatch({ type: "SET_PATH", payload: path });
  };

  useBookmarkChange(callback);

  return (
    <>
      <Navbar rows={rows} />
      <PathDisplay />
      <LowerPanelContainer>
        <LoadingScreen loading={false} />
        <SideTree />
        <MainContainer>
          {search
            ? <SearchResultsTable rows={rows} />
            : <BookmarkTable rows={rows} />}
        </MainContainer>
      </LowerPanelContainer>
    </>
  );
}

export default Table;
