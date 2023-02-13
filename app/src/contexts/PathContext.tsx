import React, { createContext, useContext, useReducer } from "react";

const initialPath: Path = {
  items: []
};

type Path = {
  items: chrome.bookmarks.BookmarkTreeNode[]
}

type PathAction = {
  type: 'changed' | 'deleted' | 'added';
  node?: chrome.bookmarks.BookmarkTreeNode;
};

const PathContext = createContext<Path>(initialPath);
const PathDispatchContext = createContext<React.Dispatch<PathAction>>(null as unknown as React.Dispatch<PathAction>);


export function usePath() {
  return useContext(PathContext);
}

export function usePatchDispatch() {
  return useContext(PathDispatchContext);
}

export function PathProvider({ children }: any) {
  const [path, dispatch] = useReducer(pathReducer, initialPath);
  return <PathContext.Provider value={path}>
    <PathDispatchContext.Provider value={dispatch}>
      {children}
    </PathDispatchContext.Provider>
  </PathContext.Provider>
}


// todo add reset to higher up, as it's a stack
// todo also change all action
export function pathReducer(path: Path, action: PathAction): Path {
  switch (action.type) {
    case 'added': {
      return {
        items: [...path.items, action.node!]
      }
    }
    case 'changed': {
      return {
        items: path.items.map((node) => {
          const newNode = action.node!;
          if (!newNode) {
            throw Error('this action should carry a node' + action.node ?? action.type)
          }
          return node.id === newNode.id ? newNode : node;
        })
      }
    }
    case 'deleted': {
      const deletedNode = action.node!;
      if (!deletedNode) {
        throw Error('this action should carry a node' + action.node ?? action.type)
      }
      return {
        items: path.items.filter(t => t.id !== deletedNode.id)
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}