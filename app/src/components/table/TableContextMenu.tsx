import { basicNodes } from "../../dataProcessing/basicNodes";
import { ContextMenuProps } from "../../types/ContextMenuProps";
import { isAFolder } from "../../utils/ifHasChildrenFolders";
import { OpenAllSection } from "../contextMenuComponents/OpenAllSection";
import { EditDeleteSection } from "../EditDeleteSection";
import { contextMenuButtonClass } from "../sidePanel/SidePanelContextMenu";

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
      className={`contextMenu absolute z-50 text-l w-32 border-1 border-solid bg-slate-700 ]`}
      style={{
        position: "absolute",
        left: `${position[0]}px`,
        right: `${position[1]}px`,
      }}
    >
      <EditDeleteSection
        thing={props.contextMenuProps.thing}
        protected={isProtected}
      />
      <div className="group2 flex flex-col align-middle">
        <p className={contextMenuButtonClass}>Cut</p>
        <p className={contextMenuButtonClass}>Copy</p>
        <p className={contextMenuButtonClass}>Paste</p>
      </div>
      <div className="group-changing flex flex-col">
        <button className={`${!props.searchResults && 'hidden'} ${contextMenuButtonClass}`} onClick={handleShowInFolder} >
          <p>show in folder</p>
        </button>
        <button
          onClick={() =>
            props.contextMenuProps.sortCallback(props.contextMenuProps.thing, {
              key: "title",
              reverse: false,
            })}
          disabled={sortable}
          className={contextMenuButtonClass}
        >
          Sort A-Z
        </button>
        <button
          onClick={() =>
            props.contextMenuProps.sortCallback(props.contextMenuProps.thing, {
              key: "date",
              reverse: false,
            })}
          disabled={sortable}
          className={contextMenuButtonClass}
        >
          Sort by date
        </button>

      </div>
      <OpenAllSection thing={props.contextMenuProps.thing} />
    </div >
  );
}
