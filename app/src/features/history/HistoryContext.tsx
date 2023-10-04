import React, { createContext, useContext, useReducer } from "react";

const initialHistory: HistoryContextType = {
  pastNodeIds: [],
  futureNodeIds: [],
};

export type HistoryContextType = {
  pastNodeIds: string[];
  futureNodeIds: string[];
};

export type HistoryAction = {
  type: "add" | "forward" | "back" | "goto-past-event" | "goto-future-event";
  nodeId?: string;
};

const HistoryContext = createContext<HistoryContextType>(initialHistory);
const HistoryDispatchContext = createContext<React.Dispatch<HistoryAction>>(
  null as unknown as React.Dispatch<HistoryAction>,
);

export function useHistoryIds() {
  return useContext(HistoryContext);
}

export function useHistoryIdsDispatch() {
  return useContext(HistoryDispatchContext);
}

export function HistoryProvider({ children }: any) {
  const [History, dispatch] = useReducer(historyReducer, initialHistory);
  return (
    <HistoryContext.Provider value={History}>
      <HistoryDispatchContext.Provider value={dispatch}>
        {children}
      </HistoryDispatchContext.Provider>
    </HistoryContext.Provider>
  );
}

export function historyReducer(
  history: HistoryContextType,
  action: HistoryAction,
): HistoryContextType {
  console.debug("history reducer", action);
  switch (action.type) {
    case "add": {
      if (action.nodeId === undefined) return history;
      return {
        ...history,
        pastNodeIds: [...history.pastNodeIds, action.nodeId],
      };
    }

    case "forward": {
      console.debug("inside history context handler add");
      const node = history.futureNodeIds[0];
      return {
        pastNodeIds: [...history.pastNodeIds, ...node],
        futureNodeIds: history.futureNodeIds.slice(1),
      };
    }

    case "back": {
      console.debug("inside history context handler replace");
      const last = history.pastNodeIds[history.pastNodeIds.length - 1];
      return {
        pastNodeIds: history.pastNodeIds.slice(
          0,
          history.pastNodeIds.length - 1,
        ),
        futureNodeIds: [...last, ...history.futureNodeIds],
      };
    }

    case "goto-past-event": {
      const pivot: number = history.pastNodeIds.findIndex((name) =>
        name === action.nodeId
      );
      if (pivot < 0) return history;
      return {
        pastNodeIds: [...history.pastNodeIds.slice(0, pivot)],
        futureNodeIds: [
          ...history.pastNodeIds.slice(pivot),
          ...history.futureNodeIds,
        ],
      };
    }

    case "goto-future-event": {
      const pivot: number = history.futureNodeIds.findIndex((name) =>
        name === action.nodeId
      );
      if (pivot < 0) return history;
      return {
        pastNodeIds: [
          ...history.pastNodeIds,
          ...history.futureNodeIds.slice(0, pivot),
        ],
        futureNodeIds: [...history.futureNodeIds.slice(pivot)],
      };
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
