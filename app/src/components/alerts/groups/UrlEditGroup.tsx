export function UrlEditGroup(props: { dataCallback: Function }) {
  return (
    <div id="urlGroup" className="group/url flex flex-col ">
      <label
        htmlFor="name"
        className="text-slate-50 url-group group/focus:url:text-cyan-400 m-2"
      >
        URL
      </label>
      <input
        type="text"
        className={`w-3/5 text bg-slate-900 text-slate-50 border-cyan-400 focus:border-solid rounded group/url group-focus/url:border-b-4 `}
        onChange={(e) =>
          props.dataCallback(
            (previous: chrome.bookmarks.BookmarkChangesArg) => {
              return { ...previous, url: e.target.value };
            },
          )}
      />
    </div>
  );
}
