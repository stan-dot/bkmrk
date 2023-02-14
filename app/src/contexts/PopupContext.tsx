import React, { createContext, useContext, useReducer } from "react";
import EditAlert from "../components/alerts/EditAlert";

const initialPopup: PopupContext = {
  component: <></>
};

type PopupContext = {
  component: JSX.Element
}

type PopupAction = {
  type: 'add-new-bookmark' | 'add-new-folder' | 'edit-bookmark' | 'edit-folder' | 'open-15-plus' | 'full';
  direction: 'open' | 'close'
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
        component: <EditAlert id={""} closeCallback={function (): void {
          throw new Error("Function not implemented.");
        }} visible={false} />
      }
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
