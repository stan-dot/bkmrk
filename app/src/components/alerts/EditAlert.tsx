import { FormEvent, useState } from "react";

type EditAlertProps = {
  submitCallback: (data: chrome.bookmarks.BookmarkChangesArg) => void;
  closeCallback: () => void;
  visible: boolean
};

const initialData: chrome.bookmarks.BookmarkChangesArg = {
  title: "",
  url: "",
};

const buttonClass = " w-12 h-8 m-2 rounded";

export default function EditAlert(
  { submitCallback, closeCallback, visible }: EditAlertProps,
) {
  const [data, setData] = useState(initialData);
  const onSubmit = (e: FormEvent) => {
    console.log('submitting the form');
    e.preventDefault();
    submitCallback(data);
    closeCallback();
  };

  return (
    <div className="fixed backdrop-blur-md w-full h-full grid grid-cols-2 gap-4 place-content-center" id="alertBackground" style={{ display: `${visible ? 'absolute' : 'none'}` }}>
      <form className="
      fixed top-1/3 left-1/3
      flex flex-col px-6 py-2
      m-auto
      z-40 inset-0 border-solid border-gray-500 h-60 w-96  bg-slate-800 overflow-y-auto rounded  " id="editAlertForm" onSubmit={onSubmit}
      // onBlur={closeCallback}
      >
        <h2 id="title" className="text-xl text-slate-50 m-4">Edit bookmark</h2>

        <div id="editGroup" className="group/edit flex flex-col ">
          <label htmlFor="name" className={`text-slate-50 group/edit group-focus/edit:text-cyan-400 m-2`} > Edit </label>
          <input
            type="text"
            className={`w-3/5 text bg-slate-900 text-slate-50 border-cyan-400 focus:border-solid rounded group/edit group-focus/edit:border-b-4 `}
            onChange={(e) =>
              setData((previous: chrome.bookmarks.BookmarkChangesArg) => {
                return { ...previous, title: e.target.value };
              })}
          />
        </div>

        <div id="urlGroup" className="group/url flex flex-col ">
          <label htmlFor="name" className="text-slate-50 url-group group/focus:url:text-cyan-400 m-2" > URL </label>
          <input
            type="text"
            className={`w-3/5 text bg-slate-900 text-slate-50 border-cyan-400 focus:border-solid rounded group/url group-focus/url:border-b-4 `}
            onChange={(e) =>
              setData((previous: chrome.bookmarks.BookmarkChangesArg) => {
                return { ...previous, url: e.target.value };
              })}
          />
        </div>

        <div id="bottomPanel" className="absolute justify-end inset-x-0 bottom-2">
          <div id="buttonArea" className="flex justify-end w-full m-b-4 m-r-4" >
            <button className={`${buttonClass} bg-slate-700 hover:bg-slate-600 text-cyan-400 border-slate-50 border-solid border-1`} id="cancel" onClick={closeCallback}>Cancel</button>
            <input className={`${buttonClass} bg-cyan-600 hover:bg-cyan-700 text-slate-50 cursor-pointer`} type="submit" title="Save" />
          </div>
        </div>
      </form>
    </div>
  );
}
