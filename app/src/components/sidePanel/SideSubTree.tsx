import React, { Dispatch } from "react";
import { isAFolder } from "../../functions/ifHasChildrenFolders";
import { SideTreeElement } from "./SideTreeElement";

export function SideSubTree(props: {
  nodes: chrome.bookmarks.BookmarkTreeNode[];
  pathSetter: Dispatch<
    React.SetStateAction<chrome.bookmarks.BookmarkTreeNode[]>
  >;
  path: chrome.bookmarks.BookmarkTreeNode[];
}): JSX.Element {

  return (
    <div style={{ position: 'relative', left: '5%' }}>
      {
        props.nodes.filter(isAFolder).map((n) => {
          const unrolled: boolean = props.path.includes(n);
          return < SideTreeElement
            thing={n}
            pathSetter={props.pathSetter}
            unrolled={unrolled}
            path={props.path} />
        })
      }
    </div >
  );
}
