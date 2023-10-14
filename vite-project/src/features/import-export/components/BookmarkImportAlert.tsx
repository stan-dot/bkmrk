import React, { useState } from "react";
import CRUDBookmarkFacade from "../../../lib/CRUDBookmarkFacade";
import { BookmarkCreateArg } from "../../../lib/typesFacade";
import {
  getMetadataForFileList,
  processBookmarksFile,
} from "../importBookmarks";

export function BookmarkImportAlert(): JSX.Element {
  const EMPTY_NAME = "";
  const [open, setOpen] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string>(EMPTY_NAME);
  const [createArgs, setCreateArgs] = useState<BookmarkCreateArg[]>([]);

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) {
      console.log("No file selected.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      if (!e.target) return;
      const result = e.target.result;
      if (typeof result === "string") {
        const args = processBookmarksFile(result);
        setCreateArgs(args);
      }
    };
    reader.onerror = function () {
      console.log("Error reading file");
    };
    reader.readAsText(file);
  }

  const handleOk = () => {
    CRUDBookmarkFacade.createManyBookmarks(createArgs);
    setOpen(false);
  };

  return (
    <dialog open={open}>
      <h2>
        BOOKMARK IMPORT
      </h2>
      <label htmlFor="fileInput">
        your file: ${fileName}
      </label>
      <input
        type="file"
        id="fileInput"
        onInput={(v) => setFileName("testname")}
        accept=".html"
        onDrop={(event) => {
          event.stopPropagation();
          event.preventDefault();
          const fileList: FileList = event.dataTransfer.files;
          console.log(fileList);
          getMetadataForFileList(fileList);
        }}
        onChange={handleFileSelect}
        onDragOver={(event) => {
          event.stopPropagation();
          event.preventDefault();
          // Style the drag-and-drop as a "copy file" operation.
          event.dataTransfer.dropEffect = "copy";
        }}
        // todo work out different import strategies
      />
      <button
        disabled={fileName === EMPTY_NAME || createArgs.length === 0}
        onClick={handleOk}
      >
        OK
      </button>
    </dialog>
  );
}
