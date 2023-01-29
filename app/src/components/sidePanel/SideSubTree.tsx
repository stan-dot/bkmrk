import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { SideTreeElement } from "./SideTreeElement";

export function SideSubTree(props: {
  nodes: chrome.bookmarks.BookmarkTreeNode[];
  pathSetter: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
  path: chrome.bookmarks.BookmarkTreeNode[];
  setRowsCallback: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void
}): JSX.Element {
  return (
    <div id="sidesubtree" className="relative l-10 p-1 " >
      {
        // todo here filter is running on undefined
        props.nodes.filter(isAFolder).map((n) => {
          const unrolled: boolean = props.path.includes(n);
          return < SideTreeElement
            thing={n}
            pathSetter={props.pathSetter}
            unrolled={unrolled}
            path={props.path}
            setRowsCallback={props.setRowsCallback} />
        })
      }
    </div >
  );
}
