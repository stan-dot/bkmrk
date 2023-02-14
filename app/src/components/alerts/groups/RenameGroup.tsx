export function RenameGroup(props: { dataCallback: Function }) {
  return (
    <div id="editGroup" className="group/edit flex flex-col ">
      <label
        htmlFor="name"
        className={`text-slate-50 group/edit group-focus/edit:text-cyan-400 m-2`}
      >
        Edit
      </label>
      <input
        type="text"
        className={`w-3/5 text bg-slate-900 text-slate-50 border-cyan-400 focus:border-solid rounded group/edit group-focus/edit:border-b-4 `}
        onChange={(e) =>
          props.dataCallback(
            (previous: chrome.bookmarks.BookmarkChangesArg) => {
              return { ...previous, title: e.target.value };
            },
          )}
      />
    </div>
  );
}
