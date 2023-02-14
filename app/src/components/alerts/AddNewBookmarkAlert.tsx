import { FormEvent, useState } from "react";
import { usePath } from "../../contexts/PathContext";
import { CancelSaveGroup } from "./groups/CancelSaveGroup";
import { RenameGroup } from "./groups/RenameGroup";
import { UrlEditGroup } from "./groups/UrlEditGroup";

type AddNewBookmarkProps = {
  id: string;
  closeCallback: () => void;
  visible: boolean;
};

export default function AddNewBookmarkAlert(
  { id, closeCallback, visible }: AddNewBookmarkProps,
) {
  const path = usePath();
  const locationId = path.items.at(-1)!.id;
  console.log("created the add new bookmark alert");
  const [data, setData] = useState<chrome.bookmarks.BookmarkCreateArg>({
    title: "",
    url: "",
    parentId: locationId,
  });
  const onSubmit = (e: FormEvent) => {
    console.log("submitting the form");
    e.preventDefault();
    chrome.bookmarks.create(data)
    closeCallback();
  };

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
      <h2 id="title" className="text-xl text-slate-50 m-4">Add new bookmark</h2>
      <RenameGroup dataCallback={setData} />
      <UrlEditGroup dataCallback={setData} />
      <CancelSaveGroup closeCallback={closeCallback} />
    </form>
  </div >
}
