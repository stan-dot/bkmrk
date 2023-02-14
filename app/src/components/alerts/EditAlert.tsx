import { FormEvent, useState } from "react";
import { usePopupDispatch } from "../../contexts/PopupContext";
import { CancelSaveGroup } from "./groups/CancelSaveGroup";
import { RenameGroup } from "./groups/RenameGroup";
import { UrlEditGroup } from "./groups/UrlEditGroup";

type EditAlertProps = {
  id: string;
  visible: boolean;
};

const initialData: chrome.bookmarks.BookmarkChangesArg = {
  title: "",
  url: "",
};

export default function EditBookmarkAlert(
  { id, visible }: EditAlertProps,
) {

  const dispatch = usePopupDispatch();
  console.log("created the edit alert");
  const [data, setData] = useState(initialData);

  const onSubmit = (e: FormEvent) => {
    console.log("submitting the form");
    e.preventDefault();
    chrome.bookmarks.update(id, data)
    close();
  };

  const close = () => {
    dispatch({
      type: 'edit-bookmark',
      direction: 'close'
    });
  }

  return <div
    className="fixed backdrop-blur-md w-full h-full grid grid-cols-2 gap-4 place-content-center z-50"
    id="alertBackground"
    style={{ display: `${visible ? "absolute" : "none"}` }}
  >
    <form
      className="
      fixed top-1/3 left-1/3
      flex flex-col px-6 py-2
      m-auto
      z-60 inset-0 border-solid border-gray-500 h-60 w-96  bg-slate-800 overflow-y-auto rounded  "
      id="editAlertForm"
      onSubmit={onSubmit}
    >
      <h2 id="title" className="text-xl text-slate-50 m-4">Edit bookmark</h2>
      <RenameGroup dataCallback={setData} />
      <UrlEditGroup dataCallback={setData} />
      <CancelSaveGroup closeCallback={close} />
    </form>
  </div >
}
