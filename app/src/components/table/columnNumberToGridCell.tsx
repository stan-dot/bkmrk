import {
  GridCell, GridCellKind, GridColumn, LoadingCell,
  TextCell,
  UriCell
} from "@glideapps/glide-data-grid";
import { ButtonCell } from "@glideapps/glide-data-grid-cells/dist/ts/cells/button-cell";
import { LinksCell } from "@glideapps/glide-data-grid-cells/dist/ts/cells/links-cell";

type CellGetter = (v: chrome.bookmarks.BookmarkTreeNode) => TextCell | UriCell | ButtonCell | LinksCell;

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
  {
    // url unified with number of children, like in Safari
    // todo might need to cancel the links cell after all https://glideapps.github.io/glide-data-grid/?path=/story/extra-packages-cells--custom-cells
    static: { title: "URL", width: 250 },
    columnGetter: (v) => {
      if (v === undefined) return ErrorCell;
      const isRealLink = v.url !== undefined;
      const display: string = (isRealLink ? v.url : v.children?.length.toString()) ?? 'folder';
      console.log('display:', display);

      // todo or maybe just a button cell?
      const d: TextCell = {
        kind: GridCellKind.Text,
        displayData: display,
        data: "",
        allowOverlay: false
      };
      // const d: LinksCell = {
      //   kind: GridCellKind.Custom,
      //   allowOverlay: true,
      //   copyData: "4",
      //   data: {
      //     kind: "links-cell",
      //     underlineOffset: 1,
      //     links: [
      //       {
      //         title: display,
      //         href: isRealLink ? display : undefined,
      //         onClick: () => {
      //           console.log(' if want to do soemthing else')
      //           // if (isRealLink) window.open(display);
      //           // alert("Click 1");
      //           // todo should redirect to the children
      //         },
      //       },
      //       // {
      //       //   title: "Click the linky dinky",
      //       //   onClick: () => alert("Click 2"),
      //       // },
      //     ],
      //   },
      // };

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
    static: { title: "", width: 50 },
    columnGetter: (v) => {
      const d: ButtonCell = {
        kind: GridCellKind.Custom,
        cursor: "pointer",
        allowOverlay: false,
        copyData: "4",
        readonly: true,
        data: {
          kind: "button-cell",
          backgroundColor: ["transparent", "#6572ffee"],
          color: ["accentColor", "accentFg"],
          borderColor: "#6572ffa0",
          borderRadius: 9,
          title: "View Details",
          onClick: () => {
            window.alert("Button clicked");
            console.log('should show context here')
          },
        },
        themeOverride: {
          baseFontStyle: "700 12px",
        },
      };
      return d;
    },
  },
];


export const columnNumberToGridCell: Map<number, CellGetter> = new Map(myCols.map((v, i) => [i, v.columnGetter]));

export const DEFAULT_GRID_CELL: LoadingCell = {
  kind: GridCellKind.Loading,
  allowOverlay: false,
};

export const columns: GridColumn[] = myCols.map((c) => c.static);
