import { useState } from "react";
import { BookmarkNode } from "../../lib/typesFacade";
import { CornerMenuButtons } from "./CornerMenuButtons";

interface CornerMenuProps {
  rows: BookmarkNode[];
  dataCallback: (bookmarks: BookmarkNode[]) => void;
  searchResultsMode?: boolean;
}

export function CornerMenu(
  { rows, dataCallback, searchResultsMode }: CornerMenuProps,
): JSX.Element {
  console.log("rows", rows);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div className={"conrner-menu-button z-40 relative"}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        id="dropdownDefaultButton"
        className="text-white hover:bg-slate-400 focus:outline-none rounded-lg text-3xl p-4 text-center border-red-600"
        type="button"
      >
        &#8942;
      </button>
      <div
        id="dropdown"
        onBlur={() => setShowMenu(false)}
        className={`absolute right-1/3 top-1/10 z-10 ${
          !showMenu && "hidden"
        } bg-white divide-y divide-gray-100 rounded-md shadow w-44 dark:bg-gray-700`}
      >
        {rows.length !== 0 &&
          (
            <CornerMenuButtons
              rows={rows}
              dataCallback={dataCallback}
              searchResultsMode={searchResultsMode}
            />
          )}
      </div>
    </div>
  );
}
