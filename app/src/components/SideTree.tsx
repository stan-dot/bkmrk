import React from "react";
import { isAFolder } from "./ifHasChildrenFolders";
import { SideTreeElement } from "./SideTreeElement";

/**
 * todo use this link for horizontal scrolling, also vertical scrolling
 * todo also resizable
 * https://codesandbox.io/s/lpjol1opmq
 * @param props
 * @returns
 */
export function SideTree(props: { tree: chrome.bookmarks.BookmarkTreeNode[]; }): JSX.Element {

  return <div id="vericalHoriontalScrollArea">
    <div id="mainStyledSideTreeBox">
      <h3>Side tree</h3>
      {
        props.tree.filter(isAFolder).map((node: chrome.bookmarks.BookmarkTreeNode) => {
          return <SideTreeElement thing={node} />
        })
      }
    </div>
  </div>
}



