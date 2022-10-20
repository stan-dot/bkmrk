import React, { Dispatch } from "react";
import { isAFolder } from "../../functions/ifHasChildrenFolders";
import { SideTreeElement } from "./SideTreeElement";

const subTreeStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column'
}

export function SideSubTree(props: {
  nodes: chrome.bookmarks.BookmarkTreeNode[];
  pathSetter: Dispatch<
    React.SetStateAction<chrome.bookmarks.BookmarkTreeNode[]>
  >;
  path: chrome.bookmarks.BookmarkTreeNode[];
}): JSX.Element {

  return (
    <div>
      {props.nodes.filter(isAFolder).map((n) => (
        <SideTreeElement
          thing={n}
          pathSetter={props.pathSetter}
          unrolled={props.path.includes(n)}
          path={props.path} />
      ))}
    </div>
  );
}
