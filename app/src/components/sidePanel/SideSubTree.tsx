import { usePath } from "../../contexts/PathContext";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { SideTreeElement } from "./SideTreeElement";

export function SideSubTree(props: {
  nodes: chrome.bookmarks.BookmarkTreeNode[];
  setRowsCallback: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void
}): JSX.Element {
  const path = usePath();
  return (
    <div id="sidesubtree" className="relative l-10 ml-5 p-1 " >
      {
        props.nodes
          ?
          props.nodes.filter(isAFolder).map((n) => {
            const unrolled: boolean = path.items.includes(n);
            return < SideTreeElement
              thing={n}
              unrolled={unrolled}
              setRowsCallback={props.setRowsCallback} />
          })
          : "unknown"
      }
    </div >
  );
}
