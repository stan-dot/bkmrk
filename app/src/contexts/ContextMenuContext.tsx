import React, { createContext, useContext, useReducer } from "react";

const initialContextMenu: ContextMenuContext = {
  position: [0, 0]
};

export type ContextMenuContext = {
  position: [number, number],
  componentId?: string,
  args?: any
  things?: chrome.bookmarks.BookmarkTreeNode[]
}

export type ContextMenuContextAction = {
  type: 'bookmark' | 'folder' | 'general' | 'search-result' | 'none' | 'position-update';
  direction: 'open' | 'close',
  position: [number, number],
  nodeId?: string;
  things?: chrome.bookmarks.BookmarkTreeNode[]
};

const ContextMenuContext = createContext<ContextMenuContext>(initialContextMenu);
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

export function contextMenuReducer(popup: ContextMenuContext, action: ContextMenuContextAction): ContextMenuContext {
  console.log('action', action);
  if (action.direction === 'close') {
    return {
      componentId: 'none',
      position: [0, 0]
    }
  }
  switch (action.type) {
    case "bookmark": {
      console.log('inside edit bookmark reducer');
      return {
        componentId: "b",
        args: action.nodeId!,
        position: action.position,
        things: action.things!
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
