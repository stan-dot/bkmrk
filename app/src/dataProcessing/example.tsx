export { };
// import { useEffect, useState } from "react";
// import { deletePopup, addPopup, editPopup } from "./dialogs";

// export function TreeDisplay(): JSX.Element {
//   const STARTING_PATH = [] as chrome.bookmarks.BookmarkTreeNode[];
//   const [path, setPath] = useState(STARTING_PATH)
//   const [searchTerm, setSearchTerm] = useState('search');
//   // todo the default is not empty
//   const [bookmarksList, setBookmarksList] = useState([] as chrome.bookmarks.BookmarkTreeNode[])

//   const handleSearch = () => {
//     setBookmarksList([]);

//   }
//   useEffect(() => {
//     first

//     return () => {
//       second
//     }
//   }, [])

//   // Traverse the bookmark tree, and print the folder and nodes.
//   // load these once content is loaded
//   const tree: Promise<chrome.bookmarks.BookmarkTreeNode[]> = chrome.bookmarks.getTree();
//   // another element in which I ccan assume all is loaded
//   // load all, get an array of the root loaction
//   // display all the children of the current location
//   // which is, put them into that table

//   return <div style={{ width: 400 }}>
//     <div>Search Bookmarks:
//       <input id="search" onChange={v => setSearchTerm(v.target.value)} />
//       {searchTerm}
//     </div>
//     <div id="bookmarks"></div>
//     <div id="editdialog"></div>
//     <div id="deletedialog"></div>
//     <div id="adddialog"></div>
//     <div id="test-frame"></div>
//     <script src="popup.js"></script>
//   </div>

// }

// function dumpTreeNodes(nodes: chrome.bookmarks.BookmarkTreeNode[], query: string): chrome.bookmarks.BookmarkTreeNode[] {
//   return nodes.map(node => dumpNode(node, query));
// }

// // https://stackoverflow.com/questions/35491425/double-click-and-click-on-reactjs-component
// // double click

// export function LineVisualized(node: chrome.bookmarks.BookmarkTreeNode): JSX.Element {
//   const [showOptions, setshowOptions] = useState(false);
//   // there was a 400 ms delay

//   const handleHover = () => {
//     deletePopup(node, span);
//     addPopup(edit, node);
//     editPopup(edit, anchor, node, options);
//   }

//   const clickHandler = () => {
//     // this only applies to non-folder types
//     chrome.tabs.create({ url: node.url });
//   }
//   // if children, add link, not edit link
//   const options = bookmarkNode.children ?
//     $('<span>[<a href="#" id="addlink">Add</a>]</span>') :
//     $('<span>[<a id="editlink" href="#">Edit</a> <a id="deletelink" ' +
//       'href="#">Delete</a>]</span>');
//   // edit if children as table, otherwise just input
//   var edit = bookmarkNode.children ? $('<table><tr><td>Name</td><td>' +
//     '<input id="title"></td></tr><tr><td>URL</td><td><input id="url">' +
//     '</td></tr></table>') : $('<input>');
//   // Show CRUD links when hover over.
//   return <div>
//     <p onTouchMove={e => setshowOptions(true)} onTouchEnd={e => setshowOptions(false)} onContextMenu={handleHover} onClick={clickHandler}>{node.title}</p>
//     {showOptions ?? <p>here options</p>}
//   </div>
// }


// function dumpNode(bookmarkNode: chrome.bookmarks.BookmarkTreeNode, query: string): JSX.Element {
//   // handles the empty folder case
//   if (query && !bookmarkNode.children) {
//     if (String(bookmarkNode.title).indexOf(query) === -1) {
//       // if the query is not present in the title
//       return <LineVisualized title={bookmarkNode.title} id={"-1"} />
//     }
//   }
//   var li = '<li>'.append(span);
//   if (bookmarkNode.children && bookmarkNode.children.length > 0) {
//     li.append(dumpTreeNodes(bookmarkNode.children, query));
//   }
//   return li;
// }


// function renderNoTitle(node: chrome.bookmarks.BookmarkTreeNode, query: string): JSX.Element {
//   let li = <div> append span</div>
//   if (node.children && node.children.length > 0) {
//     li.append(dumpTreeNodes(node.children, query));
//   }
//   return li;
// }


