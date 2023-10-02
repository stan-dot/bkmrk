import { useState } from "react";
import { syncReadFile } from "../importBookmarks";

export function BookmarkImportAlert(
  props: { callback: Function },
): JSX.Element {
  const EMPTY_NAME = "";
  const [open, setOpen] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string>(EMPTY_NAME);
  // todo there's some inconsistency, but it should be fine, the function above is for Node
  const handleClick = (name: string) => {
    const bookmarks: chrome.bookmarks.BookmarkTreeNode[] = syncReadFile(
      fileName,
    );
    props.callback(bookmarks);
    setOpen(false);
  };

  return (
    <dialog open={open}>
      <p>
        test bookmark import window
      </p>
      <input
        type="file"
        onInput={(v) => setFileName("testname")}
        value={`your file: ${fileName}`}
      />
      <button
        disabled={fileName === EMPTY_NAME}
        onClick={(v) => handleClick(fileName)}
      >
        OK
      </button>
    </dialog>
  );
}
