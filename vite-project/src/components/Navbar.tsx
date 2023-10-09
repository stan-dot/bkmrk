import { CornerMenu } from "../features/corner-menu/CornerMenu";
import { SearchField } from "../features/search/components/SearchField";
import { BookmarkNode } from "../lib/typesFacade";

type NavbarProps = {
  dataCallback: (nodes: BookmarkNode[]) => void;
  lastPathItem: () => BookmarkNode;
  rows: BookmarkNode[];
};

export function Navbar(
  {
    dataCallback,
    lastPathItem,
    rows,
  }: NavbarProps,
) {
  return (
    <nav className="fixed w-full h-16 top-0 flex justify-between bg-slate-700 z-10">
      <div className="flex align-middle" id="brandingBit">
        <p className="text-2xl mt-2 ml-2 text-white">
          &#128366; BKMRK
        </p>
      </div>
      <SearchField setDataCallback={dataCallback} />
      <CornerMenu
        dataCallback={dataCallback}
        rows={rows}
      />
    </nav>
  );
}
