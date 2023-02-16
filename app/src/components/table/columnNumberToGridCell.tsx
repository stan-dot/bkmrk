import {
  GridCell, GridCellKind, GridColumn, Item, LoadingCell,
  TextCell,
  UriCell
} from "@glideapps/glide-data-grid";
import { ButtonCell } from "@glideapps/glide-data-grid-cells/dist/ts/cells/button-cell";
import { LinksCell } from "@glideapps/glide-data-grid-cells/dist/ts/cells/links-cell";
import { TagsCell } from "@glideapps/glide-data-grid-cells/dist/ts/cells/tags-cell";
import "@glideapps/glide-data-grid/dist/index.css";
import "@toast-ui/editor/dist/toastui-editor.css";

type CellGetter = (v: chrome.bookmarks.BookmarkTreeNode) => TextCell | UriCell | ButtonCell | LinksCell | TagsCell;

type ComprehensiveColDef = {
  static: GridColumn;
  columnGetter: CellGetter;
};

function getDisplayDate(d: Date): string {
  const mins = d.getMinutes();

  const hour: string = `${d.getHours()}:${mins < 10 ? `0${mins}` : mins}`;
  const day: string = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  return `${day} ${hour}`;
}

const ErrorCell: TextCell = {
  kind: GridCellKind.Text,
  data: "error",
  allowOverlay: false,
  displayData: "error",
};

const myCols: ComprehensiveColDef[] = [
  {
    static: { title: "Date Added", width: 130 },
    columnGetter: (v) => {
      const date: Date = new Date(v.dateAdded || 0);
      const cell: GridCell = {
        kind: GridCellKind.Text,
        data: v.dateAdded?.toString() ?? "-1",
        allowOverlay: false,
        displayData: getDisplayDate(date),
      };
      return cell;
    },
  },
  // {
  //   static: { title: "Tags", width: 130 },
  //   columnGetter: (v) => {
  //     const cell: TagsCell = {
  //       kind: GridCellKind.Custom,
  //       data: {},
  //       copyData: "",
  //       allowOverlay: false
  //     };
  //     return cell;
  //   },
  // },
  {
    // url unified with number of children, like in Safari
    // LinksCell does not quite work as expected https://glideapps.github.io/glide-data-grid/?path=/story/extra-packages-cells--custom-cells
    static: { title: "URL", width: 250 },
    columnGetter: (v) => {
      if (v === undefined) return ErrorCell;
      const isRealLink = v.url !== undefined;
      const display: string = (isRealLink ? v.url : v.children?.length.toString()) ?? 'folder';
      const d: TextCell = {
        kind: GridCellKind.Text,
        displayData: display,
        data: "",
        allowOverlay: false,
      };

      return d;
    },
  },
  {
    static: { title: "Title", width: 600 },
    columnGetter: (v) => {
      const cell: TextCell = {
        kind: GridCellKind.Text,
        data: v?.title ?? "empty",
        allowOverlay: false,
        displayData: v?.title ?? 'empty',
      };
      return cell;
    },
  },
  {
    static: { title: "buttonCol", width: 50 },
    columnGetter: (v) => {
      const cell: TextCell = {
        kind: GridCellKind.Text,
        // data: v?.title ?? "empty",
        data: 'View details',
        allowOverlay: false,
        displayData: 'View details',
      };
      return cell;
      // const d: ButtonCell = {
      //   kind: GridCellKind.Custom,
      //   cursor: "pointer",
      //   allowOverlay: false,
      //   copyData: "4",
      //   readonly: true,
      //   data: {
      //     kind: "button-cell",
      //     backgroundColor: ["transparent", "#6572ffee"],
      //     // color: ["accentColor", "accentFg"],
      //     // borderColor: "#6572ffa0",
      //     // borderRadius: 9,
      //     title: "View Details",
      //     onClick: () => {
      //       window.alert("Button clicked");
      //       console.log('should show context here')
      //     },
      //   },
      //   // themeOverride: {
      //   //   baseFontStyle: "700 12px",
      //   // },
      // };
      // return d;
    },
  },
];


const columnNumberToGridCell: Map<number, CellGetter> = new Map(myCols.map((v, i) => [i, v.columnGetter]));

const DEFAULT_GRID_CELL: LoadingCell = {
  kind: GridCellKind.Loading,
  allowOverlay: false,
};


// If fetching data is slow you can use the DataEditor ref to send updates for cells
// once data is loaded.
export function getData(
  bookmarksArr: chrome.bookmarks.BookmarkTreeNode[],
): ([col, row]: Item) => GridCell {

  const curriedFunction: ([col, row]: Item) => GridCell = (
    coordinates: Item,
  ) => {
    const col = coordinates[0];
    const row = coordinates[1];

    const columnSpecificFunction = columnNumberToGridCell.get(col);

    if (columnSpecificFunction === undefined) {
      return DEFAULT_GRID_CELL as GridCell;
    }
    const bookmark: chrome.bookmarks.BookmarkTreeNode = bookmarksArr[row];
    return columnSpecificFunction(bookmark);
  };
  return curriedFunction;
}

export const columns: GridColumn[] = myCols.map((c) => c.static);
