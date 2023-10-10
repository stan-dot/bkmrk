import { useCallback, useState } from "react";
import { useLocationDispatch } from "../features/path/LocationContext";
import { usePath, usePathDispatch } from "../features/path/PathContext";
import { PathDisplay } from "../features/path/components/PathDisplay";
import { useBookmarkChange } from "../lib/hooks/useBookmarkChange";
import useRootAndChildren from "../lib/hooks/useRootAndChildren";
import { BookmarkNode } from "../lib/typesFacade";
import { Navbar } from "./Navbar";
import { LowerPanelContainer } from "./styled-components/LowerPanelContainer";
import { SideTree } from "../features/sidetree/components/SideTree";
import { BookmarkTable } from "../features/table/BookmarkTable";
import { LoadingScreen } from "./styled-components/LoadingScreen";
import { MainContainer } from "./styled-components/MainContainer";

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

   const reloadWithNode = useCallback(
    (root: BookmarkNode[]) => {
      if (root && root.length > 0) {
        const children = root[0].children;
        if (children && children.length > 0) {
          setLoaded("LOADED");
          const bookmarksBar: BookmarkNode = children[0];
          pathDispatch({
            type: "full",
            nodes: [...root, bookmarksBar],
          });
        }
      }
    },
    [pathDispatch],
  );

  const { rootArray, children } = useRootAndChildren();
  console.log("root: ", rootArray, " children: ", children);

  if (children) {
    setGlobalTree(children);
    locationDispatch({ type: "replace", nodeNames: children.map((c) => c.id) });
    reloadWithNode(rootArray);
  }

  const callback = (eventType: string, id: string, info: string) => {
    console.log("Handling in component:", id, info);
    reloadWithNode(path.items);
  };

  useBookmarkChange(callback);

  return (
    <>
      <Navbar
        dataCallback={setRows}
        rows={rows}
      />
      <PathDisplay />
      <LowerPanelContainer>
        <LoadingScreen loading={loaded === "LOADING"} />
        <SideTree nodes={globalTree} setRowsCallback={setRows} />
        <MainContainer>
          <BookmarkTable rows={rows} />
        </MainContainer>
      </LowerPanelContainer>
    </>
  );
}
