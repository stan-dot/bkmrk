import React, { createContext, useContext, useReducer } from "react";

const basicNodesEN: string[] = [
  "Bookmarks bar",
  "Mobile bookmarks",
  "Other bookmarks",
];

const initialLocation: LocationContextType = {
  nodeNames: basicNodesEN,
};

export type LocationContextType = {
  nodeNames: string[];
  componentId?: string;
  args?: any;
};

export type LocationAction = {
  type: "add" | "replace";
  nodeNames: string[];
};

const LocationContext = createContext<LocationContextType>(initialLocation);
const LocationDispatchContext = createContext<React.Dispatch<LocationAction>>(
  null as unknown as React.Dispatch<LocationAction>,
);

export function useLocation() {
  return useContext(LocationContext);
}

export function useLocationDispatch() {
  return useContext(LocationDispatchContext);
}

export function LocationProvider({ children }: any) {
  const [location, dispatch] = useReducer(locationReducer, initialLocation);
  return (
    <LocationContext.Provider value={location}>
      <LocationDispatchContext.Provider value={dispatch}>
        {children}
      </LocationDispatchContext.Provider>
    </LocationContext.Provider>
  );
}

export function locationReducer(
  root: LocationContextType,
  action: LocationAction,
): LocationContextType {
  switch (action.type) {
    case "add": {
      console.debug("inside root context handler add");
      return {
        nodeNames: [...root.nodeNames, ...action.nodeNames],
      };
    }

    case "replace": {
      console.debug("inside root context handler replace");
      return {
        nodeNames: action.nodeNames,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
