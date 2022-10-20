import React from "react";

function stringifyPath(nodes: chrome.bookmarks.BookmarkTreeNode[]): string {
  return nodes.map((b: chrome.bookmarks.BookmarkTreeNode) => b.title).join("/");
}

const pathDisplayStyle: React.CSSProperties = {
  position: "fixed",
  display: "flex",
  justifyContent: "space-between",
  top: "120px",
  left: "200px",
  border: "2px solid",
  borderColor: "#FF0000",
};

export function PathDisplay(props: {
  path: chrome.bookmarks.BookmarkTreeNode[];
  setter: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
}): JSX.Element {
  // const [position, setPosition] = useState([0, 0]);
  // const [contextMenuVisibility, setContextMenuVisibility] = useState(false);

  /**
   * goes backs, changes the current location, the current path
   */
  const handleClick = (
    index: number,
  ) => {
    const slicedPath: chrome.bookmarks.BookmarkTreeNode[] = props.path.slice(
      0,
      index,
    );
    /**
     * cases when want to change to the root or to the last(current) element
     */
    if (index !== 0 && index !== props.path.length - 1) {
      const newPath: chrome.bookmarks.BookmarkTreeNode[] = slicedPath.splice(
        0,
        index,
      );
      props.setter(newPath);
    }
  };

  const handleContextMenuClick = () => {
  };

  const handleCopyOption = () => {
    const text: string = stringifyPath(props.path);
    window.navigator.clipboard.writeText(text);
    // todo some sweet alert to notify it's copied
  };

  return (
    <div style={pathDisplayStyle}>
      {/* {contextMenuVisibility ?? <PathDisplayContextMenu thing={ } position={position} />} */}
      <div style={{ display: "flex", justifyContent: "start" }}>
        {props.path.map(
          (node: chrome.bookmarks.BookmarkTreeNode, index: number) => {
            return (
              <div style={{ display: "flex", justifyContent: "start" }}>
                {"/"}
                <button onClick={(v) => handleClick(index)}>
                  {node.title}
                </button>
              </div>
            );
          },
        )}
      </div>
      <button onClick={() => handleClick(props.path.length - 1)}>
        [..]
      </button>
    </div>
  );
}
