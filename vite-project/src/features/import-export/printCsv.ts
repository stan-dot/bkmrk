import Papa from "papaparse";
import { BookmarkNode } from "../../lib/typesFacade";

export function printCsv(list: BookmarkNode[]): void {
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
