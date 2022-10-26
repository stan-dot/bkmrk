import { PathItem } from "./PathItem";

export function PathDisplay(props: {
  path: chrome.bookmarks.BookmarkTreeNode[];
  pathChangeHandler: (nodes: chrome.bookmarks.BookmarkTreeNode[]) => void;
}): JSX.Element {
  const handleClick = (index: number) => {
    if (index !== 0 && index !== props.path.length - 1) {
      const newPath: chrome.bookmarks.BookmarkTreeNode[] = props.path.slice(
        0,
        index,
      );
      console.log("new path: ", newPath);
      props.pathChangeHandler(newPath);
    }
  };

  const upButtonHandler = () => {
    const newPath: chrome.bookmarks.BookmarkTreeNode[] = props.path.slice(
      0,
      props.path.length - 1,
    );
    console.log("button up, new path: ", newPath);
    props.pathChangeHandler(newPath);
  };

  const handleContextMenuClick = (
    node: chrome.bookmarks.BookmarkTreeNode,
  ): void => {
    console.log("context menu click detected on the PathDisplay element");
  };

  return (
    <div
      id="taskbar"
      style={{
        display: "flex",
        justifyContent: "flex-start",
        minWidth: "200px",
        position: "fixed",
        left: "220px",
        top: "110px",
        border: "2px solid",
        borderColor: "#FF0000",
      }}
    >
      <div id="buttonArea" style={{ position: "relative" }}>
        <button disabled={true} onClick={upButtonHandler}>
          {"<-"}
        </button>
        <button disabled={true} onClick={upButtonHandler}>
          {"->"}
        </button>
        <button disabled={props.path.length < 2} onClick={upButtonHandler}>
          [..]
        </button>
      </div>
      <div
        style={{
          border: "2px solid",
          justifyContent: "space-between",
          borderColor: "#FF0000",
          display: "flex",
        }}
      >
        {props.path.map((n, i) => (
          <PathItem
            handleClick={handleClick}
            index={i}
            node={n}
            contextMenuHandler={handleContextMenuClick}
          />
        ))}
      </div>
    </div>
  );
}
