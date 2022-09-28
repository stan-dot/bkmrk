import { DataEditor } from "@glideapps/glide-data-grid/dist/ts/data-editor/data-editor";
import "@glideapps/glide-data-grid/dist/index.css";
import { GridCell, GridCellKind, GridColumn, Item } from "@glideapps/glide-data-grid/dist/ts/data-grid/data-grid-types";

type Person = {
  firstName: string,
  lastName: string
}

function getPersonData(row: number): Person {
  const mockPerson: Person = {
    firstName: "John",
    lastName: "Smith"
  };
  return mockPerson;
}

// If fetching data is slow you can use the DataEditor ref to send updates for cells
// once data is loaded.
function getData([col, row]: Item): GridCell {
  const person = getPersonData(row);

  if (col === 0) {
    return {
      kind: GridCellKind.Text,
      data: person.firstName,
      allowOverlay: false,
      displayData: person.firstName,
    };
  } else if (col === 1) {
    return {
      kind: GridCellKind.Text,
      data: person.lastName,
      allowOverlay: false,
      displayData: person.lastName,
    };
  } else {
    throw new Error();
  }
}

// Grid columns may also provide icon, overlayIcon, menu, style, and theme overrides
const columns: GridColumn[] = [
  { title: "First Name", width: 100 },
  { title: "Last Name", width: 100 },
];

export function BookmarkTable(props: {}): JSX.Element {
  const numRows = 2;
  return <>
    <DataEditor getCellContent={getData} columns={columns} rows={numRows} />
  </>
}