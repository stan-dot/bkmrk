import { toast } from "react-toastify";
import CurrentFolderActionsFacade from "../../lib/removeEmpty";
import { exportBookmarks } from "../import-export/exportBookmarks";
import { printCsv } from "../import-export/printCsv";
import { recognizeDuplicates } from "../sorting/getCopies";
import { sortRows } from "../sorting/sortRows";
import { DropDownButton } from "./DropDownButton";
import { removeTracingLinksFromChildren } from "../tracing-links-deletion/utils/removeTracingLinks";
import { usePopupDispatch } from "../alerts/PopupContext";

interface CornerMenuButtonsProps {
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
  const removeTracingLinks = async (v) => {
    const parentId = rows[0].parentId;
    if (parentId) {
      const parent = (await chrome.bookmarks.get(parentId))[0];
      removeTracingLinksFromChildren(parent).then(
        (n) =>
          toast(
            <p>
              Removed {n} tracing links &#128373;
            </p>,
          ),
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
        callback={setOpenVariant("IMPORT")}
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
        callback={async (v) => {
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
            className={linkClass}
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
