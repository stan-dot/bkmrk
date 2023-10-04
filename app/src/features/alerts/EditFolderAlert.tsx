import { FormEvent, useState } from "react";
import { BookmarkChangesArg } from "../../lib/typesFacade";
import { usePopupDispatch } from "./PopupContext";
import { CancelSaveGroup } from "./button-groups/CancelSaveGroup";
import { NameEditField } from "./button-groups/EditField";

type RenameFolderAlertProps = {
  id: string;
};

const initialData: BookmarkChangesArg = {
  title: "",
  url: undefined,
};

export default function EditFolderAlert({ id }: RenameFolderAlertProps) {
  const [data, setData] = useState<BookmarkChangesArg>(
    initialData,
  );
  const dispatch = usePopupDispatch();

  const onSubmit = (e: FormEvent) => {
    console.debug("submitting the form for edit folder", data, " id: ", id);
    e.preventDefault();
    chrome.bookmarks.update(id, data).then((r) => {
      close();
    });
  };

  const close = () => {
    dispatch({
      type: "edit-folder",
      direction: "close",
    });
  };

  return (
    <div
      className="fixed backdrop-blur-md w-full h-full grid grid-cols-2 gap-4 place-content-center z-50"
      id="alertBackground"
      // style={{ display: `${visible ? 'absolute' : 'none'}` }}
      style={{ display: "absolute" }}
    >
      <form
        className="
      fixed 
      flex flex-col px-6 py-2
      m-auto
      z-60 inset-0 border-solid border-gray-500 h-60 w-96  bg-slate-800 overflow-y-auto rounded  "
        id="editAlertForm"
        onSubmit={onSubmit}
        // onBlur={closeCallback}
      >
        <h2 id="title" className="text-xl text-slate-50 m-4">Rename folder</h2>
        <NameEditField dataCallback={setData} />
        <CancelSaveGroup closeCallback={close} />
      </form>
    </div>
  );
}
