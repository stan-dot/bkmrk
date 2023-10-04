import {
  GridCell,
  GridCellKind,
  GridColumn,
  TextCell,
  UriCell,
} from "@glideapps/glide-data-grid";
import { ButtonCell } from "@glideapps/glide-data-grid-cells/dist/ts/cells/button-cell";
import { LinksCell } from "@glideapps/glide-data-grid-cells/dist/ts/cells/links-cell";
import { TagsCell } from "@glideapps/glide-data-grid-cells/dist/ts/cells/tags-cell";

export type CellGetter = (
  v: BookmarkNode,
) => TextCell | UriCell | ButtonCell | LinksCell | TagsCell;

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

export const myCols: ComprehensiveColDef[] = [
  {
    static: { title: "Date Added", width: 130 },
    columnGetter: (v) => {
      const date: Date = v.dateAdded === undefined
        ? new Date()
        : new Date(v.dateAdded);
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
      if (v === undefined) {
        return ErrorCell;
      }
      const isRealLink = v.url !== undefined;
      const display: string =
        (isRealLink ? v.url : v.children?.length.toString()) ?? "folder";
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
        displayData: v?.title ?? "empty",
      };
      return cell;
    },
  },
  {
    static: { title: "Actions", width: 150 },
    columnGetter: (v) => {
      const cell: TextCell = {
        kind: GridCellKind.Text,
        // data: v?.title ?? "empty",
        data: "View details",
        allowOverlay: false,
        displayData: "View details",
      };
      return cell;
      // todo solve this
      // const d: ButtonCell = {
      // kind: GridCellKind.Custom,
      // cursor: "pointer",
      // allowOverlay: true,
      // copyData: "4",
      // readonly: true,
      // data: {
      // kind: "button-cell",
      // backgroundColor: ["transparent", "#6572ffee"],
      // color: ["accentColor", "accentFg"],
      // borderColor: "#6572ffa0",
      // borderRadius: 9,
      // title: "View Details",
      // onClick: () => window.alert("Button clicked"),
      // },
      // themeOverride: {
      // baseFontStyle: "700 12px",
      // },
      // };
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
      //       console.debug('should show context here')
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
