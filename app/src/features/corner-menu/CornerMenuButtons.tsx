import { toast } from "react-toastify";
import CurrentFolderActionsFacade from "../../lib/CurrentFolderActionsFacade";
import { exportBookmarks } from "../import-export/exportBookmarks";
import { printCsv } from "../import-export/printCsv";
import { recognizeDuplicates } from "../sorting/getCopies";
import { sortRows } from "../sorting/sortRows";
import { DropDownButton } from "./DropDownButton";
import { removeTracingLinksFromChildren } from "../tracing-links-deletion/utils/removeTracingLinks";
import { usePopupDispatch } from "../alerts/PopupContext";
import useParent from "../../lib/hooks/useParent";
import { BookmarkNode } from "../../lib/typesFacade";

export interface CornerMenuButtonsProps {
  rows: BookmarkNode[];
  dataCallback: (bookmarks: BookmarkNode[]) => void;
  searchResultsMode?: boolean;
}

export function CornerMenuButtons(
  {
    rows,
    dataCallback,
    searchResultsMode,
  }: CornerMenuButtonsProps,
) {
  const popupDispatch = usePopupDispatch();
  // note - should always have a parent
  const parent = useParent(rows[0].parentId!);
  const removeTracingLinks = async (_v: any) => {
    if (parent && parent.id) {
      const n = await removeTracingLinksFromChildren(parent);
      toast(
        <p>
          Removed {n} tracing links &#128373;
        </p>,
      );
    }
  };

  return (
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 justify-start">
      <DropDownButton
        textNode={
          <>
            <span className="italic text-l ">A-Z</span> Sort by name
          </>
        }
        callback={sortRows(
          rows,
          {
            key: "title",
            reverse: false,
          },
        )}
      />

      <DropDownButton
        textNode={
          <>
            &#128197; Sort by date
          </>
        }
        callback={sortRows(
          rows,
          {
            key: "date",
            reverse: false,
          },
        )}
      />
      <DropDownButton
        textNode={
          <>
            &#9734; Add new bookmark
          </>
        }
        callback={popupDispatch({
          type: "add-new-bookmark",
          direction: "open",
        })}
      />

      <DropDownButton
        callback={popupDispatch({
          type: "add-new-folder",
          direction: "open",
        })}
        textNode={
          <>
            &#128448; Add new folder
          </>
        }
      />
      <DropDownButton
        callback={popupDispatch({
          type: "none",
          direction: "open",
          // todo add the dispatch for the import window
        })}
        disabled
        textNode={
          <>
            (TBA) Import bookmarks
          </>
        }
      />

      <DropDownButton
        callback={exportBookmarks(rows)}
        disabled
        textNode={
          <>
            (TBA) Export bookmarks
          </>
        }
      />
      <DropDownButton
        callback={printCsv(rows)}
        textNode={
          <>
            <p>Download CSV</p>
          </>
        }
      />
      <DropDownButton
        textNode={
          <>
            &#128465; Delete empty folders in this folder
          </>
        }
        callback={() =>
          CurrentFolderActionsFacade.removeEmpty(
            rows,
            dataCallback,
          )}
      />
      <DropDownButton
        callback={async (_v: any) => {
          const copiesNumber = await recognizeDuplicates();
          toast(`copies number:  ${copiesNumber}`);
          console.debug(copiesNumber);
        }}
        textNode={
          <>
            &#129694; See the number of duplicates in this folder
          </>
        }
      />

      <DropDownButton
        disabled={searchResultsMode}
        callback={removeTracingLinks}
        textNode={
          <>
            &#129466; Remove tracing links in this folder
          </>
        }
      />

      <DropDownButton
        callback={popupDispatch({
          type: "settings",
          direction: "open",
        })}
        textNode={
          <>
            &#9881; Settings
          </>
        }
      />
      <DropDownButton
        callback={() => {}}
        textNode={
          <a
            className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/stan-dot/bkmrk"
          >
            <span id="help-question-mark" className="text-l">?</span>{" "}
            Help center
          </a>
        }
      />
    </ul>
  );
}
