import React, { createContext, useContext, useReducer } from "react";

export const basicNodes: string[] = [
  "Bookmarks bar",
  "Mobile bookmarks",
  "Other bookmarks",
];

const initialRoot: RootContextType = {
  nodeNames: basicNodes,
};

export type RootContextType = {
  nodeNames: string[];
  componentId?: string;
  args?: any;
};

export type RootAction = {
  type: "add" | "replace";
  nodeNames: string[];
};

const RootContext = createContext<RootContextType>(initialRoot);
const RootDispatchContext = createContext<React.Dispatch<RootAction>>(
  null as unknown as React.Dispatch<RootAction>,
);

export function useRoot() {
  return useContext(RootContext);
}

export function useRootDispatch() {
  return useContext(RootDispatchContext);
}

export function RootProvider({ children }: any) {
  const [Root, dispatch] = useReducer(rootReducer, initialRoot);
  return (
    <RootContext.Provider value={Root}>
      <RootDispatchContext.Provider value={dispatch}>
        {children}
      </RootDispatchContext.Provider>
    </RootContext.Provider>
  );
}

export function rootReducer(
  root: RootContextType,
  action: RootAction,
): RootContextType {

  switch (action.type) {
    case "add": {
      console.log("inside root context handler add");
      return {
        nodeNames: [...root.nodeNames, ...action.nodeNames],
      };
    }

    case "replace": {
      console.log("inside root context handler replace");
      return {
        nodeNames: action.nodeNames,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
