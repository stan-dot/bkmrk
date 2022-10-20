import React, { Dispatch } from "react";
import { SideSubTree } from "./SideSubTree";

const styles: React.CSSProperties = {
  position: "absolute",
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
        <SideSubTree
          nodes={props.tree}
          pathSetter={props.pathSetter}
          path={props.tree}
        />
      </div>
    </div>
  );
}
