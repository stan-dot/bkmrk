import React, { createContext, useContext, useReducer } from "react";
import EditBookmarkAlert from "../components/alerts/EditBookmarkAlert";

const emptyComponent = <></>;
const initialPopup: PopupContext = {
  component: emptyComponent
};

export type PopupContext = {
  component: JSX.Element
  componentId?: string,
  args?: any
}

export type PopupAction = {
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
  console.log('action', action);
  switch (action.type) {
    case "edit-bookmark": {
      console.log('inside edit bookmark reducer');
      return {
        component: <EditBookmarkAlert id={action.nodeId!} />,
        componentId: 'eba',
        args: action.nodeId!
      }
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
