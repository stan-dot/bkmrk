import React, { createContext, useContext, useReducer } from "react";
import EditBookmarkAlert from "./EditBookmarkAlert";
import EditFolderAlert from "./EditFolderAlert";

const emptyComponent = <></>;
const initialPopup: PopupContext = {
  component: emptyComponent,
};

export type PopupContext = {
  component?: JSX.Element;
  componentId?: string;
  args?: any;
};

export type PopupAction = {
  type:
    | "add-new-bookmark"
    | "add-new-folder"
    | "edit-bookmark"
    | "edit-folder"
    | "settings"
    | "open-15-plus"
    | "none"
    | "bookmarks-import";
  direction: "open" | "close";
  nodeId?: string;
};

const PopupContect = createContext<PopupContext>(initialPopup);
const PopupDispatchContext = createContext<React.Dispatch<PopupAction>>(
  null as unknown as React.Dispatch<PopupAction>,
);

export function usePopup() {
  return useContext(PopupContect);
}

export function usePopupDispatch() {
  return useContext(PopupDispatchContext);
}

export function PopupProvider(
  { children }: { children: React.ReactElement | React.ReactElement[] },
) {
  const [popup, dispatch] = useReducer(popupReducer, initialPopup);
  return (
    <PopupContect.Provider value={popup}>
      <PopupDispatchContext.Provider value={dispatch}>
        {children}
      </PopupDispatchContext.Provider>
    </PopupContect.Provider>
  );
}

export function popupReducer(
  popup: PopupContext,
  action: PopupAction,
): PopupContext {
  console.log("popup", popup);
  console.debug("action", action);
  if (action.direction === "close") {
    return {
      component: emptyComponent,
      componentId: "none",
    };
  }
  switch (action.type) {
    case "add-new-bookmark": {
      console.debug("inside edit folder reducer");
      return {
        component: <EditBookmarkAlert id={action.nodeId!} />,
        componentId: "anb",
        args: action.nodeId!,
      };
    }

    case "add-new-folder": {
      console.debug("inside edit folder reducer");
      return {
        componentId: "anf",
        args: action.nodeId!,
      };
    }
    case "edit-bookmark": {
      console.debug("inside edit bookmark reducer");
      return {
        component: <EditBookmarkAlert id={action.nodeId!} />,
        componentId: "eba",
        args: action.nodeId!,
      };
    }

    case "edit-folder": {
      console.debug("inside edit folder reducer");
      return {
        component: <EditFolderAlert id={action.nodeId!} />,
        componentId: "efa",
        args: action.nodeId!,
      };
    }
    case "settings": {
      return {
        componentId: "s",
      };
    }
    case "open-15-plus": {
      return {
        componentId: "os",
      };
    }
    case "bookmarks-import": {
      return {
        componentId: "bi",
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
