export { };
// export function editPopup(edit: any, anchor: any, bookmarkNode: chrome.bookmarks.BookmarkTreeNode, options: any) {
//   $('#editlink').click(function () {
//     edit.val(anchor.text());
//     $('#editdialog').empty().append(edit).dialog({
//       autoOpen: false,
//       closeOnEscape: true, title: 'Edit Title', modal: true,
//       show: 'slide', buttons: {
//         'Save': function () {
//           chrome.bookmarks.update(String(bookmarkNode.id), {
//             title: edit.val()
//           });
//           anchor.text(edit.val());
//           options.show();
//           $(this).dialog('destroy');
//         },
//         'Cancel': function () {
//           $(this).dialog('destroy');
//         }
//       }
//     }).dialog('open');
//   });
// }
// export function addPopup(edit: any, bookmarkNode: chrome.bookmarks.BookmarkTreeNode) {
//   $('#addlink').click(function () {
//     $('#adddialog').empty().append(edit).dialog({
//       autoOpen: false,
//       closeOnEscape: true, title: 'Add New Bookmark', modal: true,
//       buttons: {
//         'Add': function () {
//           chrome.bookmarks.create({
//             parentId: bookmarkNode.id,
//             title: $('#title').val(), url: $('#url').val()
//           });
//           $('#bookmarks').empty();
//           $(this).dialog('destroy');
//           window.dumpBookmarks();
//         },
//         'Cancel': function () {
//           $(this).dialog('destroy');
//         }
//       }
//     }).dialog('open');
//   });
// }
// // const dialogue: HTMLDialogElement = {};
// export function deletePopup(bookmarkNode: chrome.bookmarks.BookmarkTreeNode, span: any) {
//   $('#deletelink').click(function () {
//     $('#deletedialog').empty().dialog({
//       autoOpen: false,
//       title: 'Confirm Deletion',
//       resizable: false,
//       height: 140,
//       modal: true,
//       overlay: {
//         backgroundColor: '#000',
//         opacity: 0.5
//       },
//       buttons: {
//         'Yes, Delete It!': function () {
//           chrome.bookmarks.remove(String(bookmarkNode.id));
//           span.parent().remove();
//           $(this).dialog('destroy');
//         },
//         Cancel: function () {
//           $(this).dialog('destroy');
//         }
//       }
//     }).dialog('open');
//   });
// }
