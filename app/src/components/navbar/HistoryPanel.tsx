import React from "react";

type HistoryPanelProps = {
  historyVisible: boolean;
  history: chrome.bookmarks.BookmarkTreeNode[];
};
export function HistoryPanel({ historyVisible, history }: HistoryPanelProps) {
  return <div
    id="rightPanel"
    className="bg-slate-700 w-44 z-10 rounded-md shadow"
    style={{ visibility: `${historyVisible ? "visible" : "hidden"}` }}
  >
    {history.length === 0
      ? <p>No history found</p>
      : history.map((b) => {
        // console.log('history: ', b);
        // return "some item"
        return (
          <p
            style={{
              // fontWeight: `${b?.title === lastPathItem().title ? "bold" : "normal" }`,
            }}
          >
            <p>nothing</p>
            {
              /* <a href={b.url} className="link">
          {b.title}
        </a> */
            }
          </p>
        );
      })}
  </div>;
}
