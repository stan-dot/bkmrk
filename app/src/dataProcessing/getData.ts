import { Item, GridCell, GridCellKind } from "@glideapps/glide-data-grid";

type Person = {
  firstName: string;
  lastName: string;
};
function getPersonData(row: number): Person {
  const mockPerson: Person = {
    firstName: "John",
    lastName: "Smith"
  };
  return mockPerson;
}
// If fetching data is slow you can use the DataEditor ref to send updates for cells
// once data is loaded.
export function getData([col, row]: Item): GridCell {
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
