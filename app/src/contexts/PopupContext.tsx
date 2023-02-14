import React, { createContext, useContext, useReducer } from "react";
import EditBookmarkAlert from "../components/alerts/EditAlert";

const emptyComponent = <></>;
const initialPopup: PopupContext = {
  component: emptyComponent
};

type PopupContext = {
  component: JSX.Element
}

type PopupAction = {
  type: 'add-new-bookmark' | 'add-new-folder' | 'edit-bookmark' | 'edit-folder' | 'open-15-plus' | 'full';
  direction: 'open' | 'close',
  nodeId?: string;
};

const PopupContect = createContext<PopupContext>(initialPopup);
const PopupDispatchContext = createContext<React.Dispatch<PopupAction>>(null as unknown as React.Dispatch<PopupAction>);

export function usePopup() {
  return useContext(PopupContect);
}

export function usePopupDispatch() {
  return useContext(PopupDispatchContext);
}

export function PopupProvider({ children }: any) {
  const [popup, dispatch] = useReducer(popupReducer, initialPopup);
  return <PopupContect.Provider value={popup}>
    <PopupDispatchContext.Provider value={dispatch}>
      {children}
    </PopupDispatchContext.Provider>
  </PopupContect.Provider>
}

export function popupReducer(popup: PopupContext, action: PopupAction): PopupContext {
  switch (action.type) {
    case "edit-folder": {
      return {
        component: <EditBookmarkAlert id={action.nodeId!}  />
      }
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
