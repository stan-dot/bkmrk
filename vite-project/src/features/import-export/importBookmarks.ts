import { BookmarkCreateArg } from "../../lib/typesFacade";

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

export const createBookmarkTree = (node:Node):BookmarkCreateArg[] => {
    const tree:BookmarkCreateArg[] = [];
    console.log('node:', node);

    // for (let child of node.childNodes) {
    //     if (child.nodeValue === 'DL') {
    //         // It's a folder since it contains other elements.
    //         const lastTreeItem = tree[tree.length - 1];  // Folders are always before their contents in the HTML structure
    //         lastTreeItem.childNodes = createBookmarkTree(child);  // Recursive call to process the folder's children
    //     } else if (child.nodeValue === 'DT') {
    //         if (child.childNodes[0].nodeValue === 'H3') {
    //             // It's a folder title
    //             tree.push({
    //                 title: child.childNodes[0].textContent,
    //             });
    //         } else if (child.childNodes[0].tagName === 'A') {
    //             // It's a bookmark
    //             tree.push({
    //                 title: child.childNodes[0].textContent,
    //                 url: child.childNodes[0].getAttribute('HREF')
    //             });
    //         }
    //     }
    // }

    return tree;
};


export  function processBookmarksFile(yourHtmlString: string): BookmarkCreateArg[] {
    const parser = new DOMParser();
    const parsedHtml: Document = parser.parseFromString(
      yourHtmlString,
      "text/html",
    );
    const createArgs: BookmarkCreateArg[] = createBookmarkTree(
      parsedHtml,
    );
    return createArgs;
  }


export function getMetadataForFileList(fileList: FileList): void {
  for (const file of fileList) {
    // Not supported in Safari for iOS.
    const name = file.name ? file.name : "NOT SUPPORTED";
    // Not supported in Firefox for Android or Opera for Android.
    const type = file.type ? file.type : "NOT SUPPORTED";
    // Unknown cross-browser support.
    const size = file.size ? file.size : "NOT SUPPORTED";
    console.log({ file, name, type, size });
  }
}
