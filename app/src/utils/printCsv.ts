import Papa from 'papaparse';

export function printCsv(list: chrome.bookmarks.BookmarkTreeNode[]): void{
    const csv = Papa.unparse(list);
    const csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const tempLink = document.createElement('a');
    tempLink.href = window.URL.createObjectURL(csvData);
    tempLink.setAttribute('download', 'download.csv');
    tempLink.click();
}