import {
  createContext,
  Dispatch,
  ReactElement,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { BookmarkNode } from "./typesFacade";

type State = {
  tree: BookmarkNode[];
  path: BookmarkNode[];
  rows: BookmarkNode[];
  loading: boolean;
  search: boolean;
  error: string | null;
};

type Action =
  | { type: "SET_TREE"; payload: BookmarkNode[] }
  | { type: "SET_PATH"; payload: BookmarkNode[] }
  | { type: "SET_ROWS"; payload: BookmarkNode[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_SEARCH"; payload: BookmarkNode[] };

const bookmarksReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TREE":
      return { ...state, tree: action.payload };
    case "SET_PATH":
      return { ...state, path: action.payload };
    case "SET_ROWS":
      return { ...state, rows: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SEARCH":
      return { ...state, rows: action.payload, search: true };
    default:
      return state;
  }
};

type BookmarkContextProps = {
  state: State;
  dispatch: Dispatch<Action>;
};

const BookmarkContext = createContext<BookmarkContextProps | undefined>(
  undefined,
);

export function BookmarksProvider(
  { children }: { children: ReactElement | ReactElement[] },
) {
  const initialState: State = {
    tree: [],
    path: [],
    rows: [],
    loading: true,
    search: false,
    error: null,
  };

  const [state, dispatch] = useReducer(bookmarksReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTree: BookmarkNode[] = await chrome.bookmarks.getTree();
        const trueRoot = await chrome.bookmarks.getChildren(fetchedTree[0]!.id);
        dispatch({ type: "SET_TREE", payload: trueRoot });
        dispatch({ type: "SET_ROWS", payload: trueRoot });
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (e: any) {
        dispatch({ type: "SET_ERROR", payload: e });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchData();
  }, []);

  return (
    <BookmarkContext.Provider value={{ state, dispatch }}>
      {state.loading
        ? <p>Loading...</p>
        : state.error
        ? <p>Error: {state.error}</p>
        : (
          children
        )}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
};
