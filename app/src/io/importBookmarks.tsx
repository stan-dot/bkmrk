
import { readFileSync } from 'fs';
import { useState } from 'react';

// <DL>
//     <DT><H3>Folder Name 1</H3></DT>
//     <DL>
//         <DT><A HREF="https://support.mozilla.org/en-US/products/firefox">Help and Tutorials</A></DT>
//         <DT><A HREF="https://support.mozilla.org/en-US/kb/customize-firefox-controls-buttons-and-toolbars">Customize Firefox</A></DT>
//     </DL>

//     <DT><H3>Folder Name B</H3></DT>
//     <DL>
//         <DT><A HREF="https://www.mozilla.org/en-US/contribute/">Get Involved</A></DT>
//         <DT><A HREF="https://www.mozilla.org/en-US/about/">About Us</A></DT>
//     </DL>
// </DL>
// https://support.mozilla.org/en-US/questions/1319392

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename: string): any[] {
  const contents: string = readFileSync(filename, 'utf-8');

  const parser: DOMParser = new DOMParser();
  const t2: Document = parser.parseFromString(contents, 'text/html');

  const arr = contents.split(/\r?\n/);

  console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

  return arr;
}



export function BookmarkImportWindow(props: { callback: Function }): JSX.Element {
  const EMPTY_NAME = "";
  const [open, setOpen] = useState(true);
  const [fileName, setFileName] = useState(EMPTY_NAME);
  // todo there's some inconsistency, but it should be fine, the function above is for Node

  const handleClick = (name: string) => {
    const bookmarks: chrome.bookmarks.BookmarkTreeNode[] = syncReadFile(fileName)
    props.callback(bookmarks);
    setOpen(false);
  }

  return <dialog open={open }>
    <p>
      test
    </p>
    <input type='file' onInput={v=>setFileName('testname')}>your file: {fileName}</input>
    <button disabled={fileName === EMPTY_NAME} onClick={v=>handleClick(fileName)}>
      OK
    </button>
  </dialog>
}
