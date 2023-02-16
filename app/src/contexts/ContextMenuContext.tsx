import React, { createContext, useContext, useReducer } from "react";

const initialContextMenu: ContextMenuContextType = {
  position: [0, 0]
};

export type ContextMenuContextType = {
  position: [number, number],
  componentId?: string,
  args?: any
  things?: chrome.bookmarks.BookmarkTreeNode[]
}

type ContextMenuActionTypes = 'single-bookmark' | 'mixed' | 'folder' | 'general' | 'search-result' | 'none' | 'position-update';

export type ContextMenuContextAction = {
  type: ContextMenuActionTypes;
  direction: 'open' | 'close',
  position: [number, number],
  nodeId?: string;
  things?: chrome.bookmarks.BookmarkTreeNode[]
};

const ContextMenuContext = createContext<ContextMenuContextType>(initialContextMenu);
const ContextMenuDispatchContext = createContext<React.Dispatch<ContextMenuContextAction>>(null as unknown as React.Dispatch<ContextMenuContextAction>);

export function useContextMenu() {
  return useContext(ContextMenuContext);
}

export function useContextMenuDispatch() {
  return useContext(ContextMenuDispatchContext);
}

export function ContextMenuProvider({ children }: any) {
  const [contextMenu, dispatch] = useReducer(contextMenuReducer, initialContextMenu);
  return <ContextMenuContext.Provider value={contextMenu}>
    <ContextMenuDispatchContext.Provider value={dispatch}>
      {children}
    </ContextMenuDispatchContext.Provider>
  </ContextMenuContext.Provider>
}

export function contextMenuReducer(contextMenu: ContextMenuContextType, action: ContextMenuContextAction): ContextMenuContextType {
  console.log('action', action);
  if (action.direction === 'close') {
    return {
      componentId: 'none',
      position: [0, 0]
    }
  }
  switch (action.type) {
    case "single-bookmark": {
      console.log('inside edit bookmark reducer');
      return {
        componentId: "b",
        args: action.nodeId!,
        position: action.position,
        things: action.things!
      }
    }
    case "mixed": {
      console.log('inside edit bookmark reducer');
      return {
        componentId: "s",
        args: action.nodeId!,
        position: action.position,
        things: action.things!
      }
    }
    case "folder": {
      console.log('inside edit bookmark reducer');
      return {
        ...contextMenu,
        position: action.position,
        things: action.things!
      }
    }
    case "position-update": {
      console.log('inside edit bookmark reducer');
      return {
        ...contextMenu,
        position: action.position,
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
