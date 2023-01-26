import { FormEvent, useState } from "react";

type EditAlertProps = {
  submitCallback: (data: chrome.bookmarks.BookmarkChangesArg) => void;
  closeCallback: () => void;
};

const initialData: chrome.bookmarks.BookmarkChangesArg = {
  title: "",
  url: "",
};

export default function EditAlert(
  { submitCallback, closeCallback }: EditAlertProps,
) {
  const [data, setData] = useState(initialData);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitCallback(data);
    closeCallback();
  };

  return (
    <div className="z-20 inset-0 border-solid border-gray-500  bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <form id="editform" action="" onSubmit={onSubmit}
      // onBlur={closeCallback}
      >
        <label htmlFor="name">
          Edit
          <input
            type="text"
            className="text"
            onChange={(e) =>
              setData((previous: chrome.bookmarks.BookmarkChangesArg) => {
                return { ...previous, title: e.target.value };
              })}
          />
        </label>
        <label htmlFor="name">
          URL
          <input
            type="text"
            className="text"
            onChange={(e) =>
              setData((previous: chrome.bookmarks.BookmarkChangesArg) => {
                return { ...previous, url: e.target.value };
              })}
          />
        </label>
        <button id="cancel" onClick={closeCallback}>Cancel</button>
        <input type="submit" title="Save" className="submit" />
      </form>
    </div>
  );
}
