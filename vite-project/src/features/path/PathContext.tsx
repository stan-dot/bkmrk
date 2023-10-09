import React, { createContext, useContext, useReducer } from "react";
import { useSearchParams } from 'react-router-dom';
import { BookmarkNode } from "../../lib/typesFacade";

const initialPath: Path = {
  items: [],
};

type Path = {
  items: BookmarkNode[];
};

export type PathAction = {
  type: "changed" | "added" | "up" | "branch" | "full";
  nodes?: BookmarkNode[];
  changeLevelsUp?: number;
};

const PathContext = createContext<Path>(initialPath);
const PathDispatchContext = createContext<React.Dispatch<PathAction>>(
  null as unknown as React.Dispatch<PathAction>,
);

export function usePath() {
  return useContext(PathContext);
}

export function usePathDispatch() {
  return useContext(PathDispatchContext);
}

export function PathProvider({ children }: any) {
  const [path, dispatch] = useReducer(pathReducer, initialPath);
  // const [searchParams, setSearchParams] = useSearchParams();
  // todo change this to only store IDs
  chrome.storage.local.set({ "path": path }).then(() => {
    console.debug("stored path value is set to:", path);
  });

  return (
    <PathContext.Provider value={path}>
      <PathDispatchContext.Provider value={dispatch}>
        {children}
      </PathDispatchContext.Provider>
    </PathContext.Provider>
  );
}

function pathReducer(path: Path, action: PathAction): Path {
  switch (action.type) {
    case "added": {
      return {
        items: [...path.items, ...action.nodes!],
      };
    }
    case "full": {
      if (!action.nodes) {
        throw Error(
          "this action should carry a node" + action.nodes ?? action.type,
        );
      }
      return {
        items: action.nodes,
      };
    }
    case "changed": {
      return {
        items: path.items.map((node) => {
          const newNode = action.nodes![0];
          if (!newNode) {
            throw Error(
              "this action should carry only 1 node" + action.nodes ??
                action.type,
            );
          }
          return node.id === newNode.id ? newNode : node;
        }),
      };
    }
    case "up": {
      const deletedNodes = action.nodes!;
      if (!deletedNodes) {
        throw Error(
          "this action should carry a node" + action.nodes ?? action.type,
        );
      }
      return {
        items: path.items.filter((t) => !deletedNodes.includes(t)),
      };
    }

    case "branch": {
      const change = action.changeLevelsUp!;
      const lastSameIndex = path.items.length - change;
      const newPathTrunk = path.items.slice(0, lastSameIndex);
      console.debug("change: ", change, " new trunk: ", newPathTrunk);
      return {
        items: [...newPathTrunk, action.nodes![0]],
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
