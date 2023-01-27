import { basicNodes } from "../../dataProcessing/basicNodes";
import { ContextMenuProps } from "../../types/ContextMenuProps";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { OpenAllSection } from "../contextMenuComponents/OpenAllSection";
import { EditDeleteSection } from "../EditDeleteSection";
import { CloseSection } from "../sidePanel/CloseSection";

export function TableContextMenu(
  props: {
    contextMenuProps: ContextMenuProps;
    setRowsCallback: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
    searchResults: boolean;
  },
): JSX.Element {
  const isProtected: boolean = basicNodes.includes(
    props.contextMenuProps.thing.title,
  );

  const handleShowInFolder = async (_e: any) => {
    const parent: chrome.bookmarks.BookmarkTreeNode[] = await chrome.bookmarks
      .get(props.contextMenuProps.thing.parentId!);
    if (parent.length > 1) {
      console.error("there is more than one parent for this id");
      return;
    }
    const children: chrome.bookmarks.BookmarkTreeNode[] = parent[0].children!;
    props.setRowsCallback(children);
  };

  const sortable = isAFolder(props.contextMenuProps.thing) &&
    ((props.contextMenuProps.thing.children?.length ?? -1) > 0);
  const position = props.contextMenuProps.position;
  return (
    <div
      id="searchResultContextMenu"
      className={`contextMenu absolute z-50 text-l border-1 border-solid border-red-700 bg-cyan-600 l-[${position[0]}px] t-[${position[1]}px] w-fit]`}
    >
      <EditDeleteSection
        thing={props.contextMenuProps.thing}
        protected={isProtected}
      />
      <div className="group2">
        <p>cut button</p>
        <p>copy buton</p>
        <p>paste buton</p>
      </div>
      <button className={`${!props.searchResults && 'hidden'}`} onClick={handleShowInFolder} >
        <p>show in folder</p>
      </button>
      <button
        onClick={() =>
          props.contextMenuProps.sortCallback(props.contextMenuProps.thing, {
            key: "title",
            reverse: false,
          })}
        disabled={sortable}
      >
        sort A-Z
      </button>
      <button
        onClick={() =>
          props.contextMenuProps.sortCallback(props.contextMenuProps.thing, {
            key: "date",
            reverse: false,
          })}
        disabled={sortable}
      >
        sort by date
      </button>
      <OpenAllSection thing={props.contextMenuProps.thing} />
      <CloseSection closeCallback={props.contextMenuProps.closeCallback} />
    </div>
  );
}
