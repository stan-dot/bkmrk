import React, { Dispatch } from "react";
import { isAFolder } from "../../functions/ifHasChildrenFolders";
import { SideTreeElement } from "./SideTreeElement";

const styles: React.CSSProperties = {
  position: "fixed",
  left: "20px",
};

/**
 * todo use this link for horizontal scrolling, also vertical scrolling
 * todo also resizable
 * https://codesandbox.io/s/lpjol1opmq
 * @param props
 * @returns
 */
export function SideTree(
  props: {
    tree: chrome.bookmarks.BookmarkTreeNode[];
    pathSetter: Dispatch<
      React.SetStateAction<chrome.bookmarks.BookmarkTreeNode[]>
    >;
    path: chrome.bookmarks.BookmarkTreeNode[];
  },
): JSX.Element {
  return (
    <div
      id="vericalHoriontalScrollArea"
      style={styles}
      className="dev-test-outline"
    >
      <div id="mainStyledSideTreeBox">
        {props.tree.filter(isAFolder).map(
          (node: chrome.bookmarks.BookmarkTreeNode) => {
            const unrolled = props.path.includes(node);
            return <SideTreeElement thing={node} pathSetter={props.pathSetter} unrolled={unrolled} />;
          },
        )}
      </div>
    </div>
  );
}
