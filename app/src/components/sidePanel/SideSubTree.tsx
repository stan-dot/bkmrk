import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { SideTreeElement } from "./SideTreeElement";

export function SideSubTree(props: {
  nodes: chrome.bookmarks.BookmarkTreeNode[];
  pathSetter: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
  path: chrome.bookmarks.BookmarkTreeNode[];
  styles?: React.CSSProperties
}): JSX.Element {
  const overrideStyles: React.CSSProperties = { position: 'relative', left: '5%' };
  return (
    <div id="sidesubtree" style={props.styles ?? overrideStyles}>
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
