
import DataEditor from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import { columns } from "./columns";
import { getData } from "../dataProcessing/getData";


export function BookmarkTable(props: {}): JSX.Element {
  const numRows = 2;
  return <>
    <DataEditor getCellContent={getData} columns={columns} rows={numRows} />
  </>
}