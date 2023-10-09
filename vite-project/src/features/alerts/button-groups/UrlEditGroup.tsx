import { BookmarkChangesArg } from "../../../lib/typesFacade";

export function UrlEditField(
  props: { dataCallback: Function; error?: boolean },
) {
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
        style={{ borderColor: props.error ? "red" : "white" }}
        onChange={(e) =>
          props.dataCallback(
            (previous: BookmarkChangesArg) => {
              return { ...previous, url: e.target.value };
            },
          )}
      />
      {props.error && <p style={{ color: "red" }}>invalid URL</p>}
    </div>
  );
}
