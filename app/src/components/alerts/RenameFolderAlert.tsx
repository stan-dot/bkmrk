import { FormEvent, useState } from "react";
import { CancelSaveGroup } from "./groups/CancelSaveGroup";
import { UrlEditGroup } from "./groups/UrlEditGroup";

type RenameFolderAlertProps = {
  submitCallback: (data: chrome.bookmarks.BookmarkChangesArg) => void;
  closeCallback: () => void;
  visible: boolean
};

const initialData: chrome.bookmarks.BookmarkChangesArg = {
  title: "",
};


export default function RenameFolderAlert(
  { submitCallback, closeCallback, visible }: RenameFolderAlertProps,
) {
  const [data, setData] = useState(initialData);
  const onSubmit = (e: FormEvent) => {
    console.log('submitting the form');
    e.preventDefault();
    submitCallback(data);
    closeCallback();
  };

  return (
    <div className="fixed backdrop-blur-md w-full h-full grid grid-cols-2 gap-4 place-content-center z-50" id="alertBackground" style={{ display: `${visible ? 'absolute' : 'none'}` }}>
      <form className="
      fixed top-1/3 left-1/3
      flex flex-col px-6 py-2
      m-auto
      z-60 inset-0 border-solid border-gray-500 h-60 w-96  bg-slate-800 overflow-y-auto rounded  " id="editAlertForm" onSubmit={onSubmit}
      // onBlur={closeCallback}
      >
        <h2 id="title" className="text-xl text-slate-50 m-4">Rename folder</h2>

        <UrlEditGroup dataCallback={setData} />
        <CancelSaveGroup closeCallback={closeCallback} />
      </form>
    </div>
  );
}


