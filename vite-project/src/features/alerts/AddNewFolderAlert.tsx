import { FormEvent, useState } from "react";
import CRUDBookmarkFacade from "../../lib/CRUDBookmarkFacade";
import { BookmarkCreateArg, BookmarkNode } from "../../lib/typesFacade";
import { usePath } from "../path/PathContext";
import { usePopupDispatch } from "./PopupContext";
import { CancelSaveGroup } from "./button-groups/CancelSaveGroup";
import { NameEditField } from "./button-groups/EditField";

type AddNewFolderProps = {
  parent: BookmarkNode;
};

// can do an empty one
export default function AddNewFolderAlert(
  { parent }: AddNewFolderProps,
) {
  const path = usePath();
  const locationId = path.items.at(-1)!.id;

  const dispatch = usePopupDispatch();
  const defaultData = {
    title: "",
    parentId: locationId,
  };

  const [data, setData] = useState<BookmarkCreateArg>(defaultData);
  const onSubmit = async (e: FormEvent) => {
    console.debug("submitting the form");
    e.preventDefault();
    await CRUDBookmarkFacade.createBookmark(data);
    close();
  };

  const close = () => {
    dispatch({
      type: "add-new-bookmark",
      direction: "close",
    });
  };
  console.debug("created the add new folder alert");

  return (
    <div
      className="fixed backdrop-blur-md w-full h-full grid grid-cols-2 gap-4 place-content-center z-50"
      id="alertBackground"
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
      >
        <h2 id="title" className="text-xl text-slate-50 m-4">Add new folder</h2>
        <NameEditField dataCallback={setData} />
        <CancelSaveGroup closeCallback={close} />
      </form>
    </div>
  );
}
