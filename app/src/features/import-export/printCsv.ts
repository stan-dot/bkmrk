import Papa from "papaparse";

export function printCsv(list: chrome.bookmarks.BookmarkTreeNode[]): void {
  const uniformized = list.map((b) =>
    b.url === undefined ? { ...b, url: "" } : b
  );
  const csv = Papa.unparse(uniformized);
  const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const tempLink = document.createElement("a");
  tempLink.href = window.URL.createObjectURL(csvData);
  tempLink.setAttribute("download", "download.csv");
  tempLink.click();
}
