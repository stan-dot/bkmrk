
import {readFileSync, promises as fsPromises} from 'fs';

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
function syncReadFile(filename: string):any[]{
  const contents:string = readFileSync(filename, 'utf-8');
  
  const parser: DOMParser = new DOMParser();
  const t2:Document = parser.parseFromString(contents, 'text/html');

  const arr = contents.split(/\r?\n/);

  console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

  return arr;
}

syncReadFile('./example.txt');
