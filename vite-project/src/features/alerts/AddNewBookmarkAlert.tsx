import { FormEvent, useState } from "react";
import CRUDBookmarkFacade from "../../lib/CRUDBookmarkFacade";
import { BookmarkCreateArg, BookmarkNode } from "../../lib/typesFacade";
import { usePopupDispatch } from "./PopupContext";
import { CancelSaveGroup } from "./button-groups/CancelSaveGroup";
import { NameEditField } from "./button-groups/EditField";
import { UrlEditField } from "./button-groups/UrlEditGroup";

type AddNewBookmarkProps = {
  parentId: string;
  path: BookmarkNode[];
};

export default function AddNewBookmarkAlert(
  { parentId, path }: AddNewBookmarkProps,
) {
  const locationId = path.at(-1)!.id;
  console.debug("created the add new bookmark alert");

  const dispatch = usePopupDispatch();
  const [error, setError] = useState<boolean>(false);

  const defaultFormData: BookmarkCreateArg = {
    title: "",
    url: "",
    parentId: locationId,
  };

  const [data, setData] = useState<BookmarkCreateArg>(defaultFormData);

  const onSubmit = (e: FormEvent) => {
    console.debug("submitting the form");
    e.preventDefault();
    CRUDBookmarkFacade.createBookmark(data).then(() => {
      close();
    });
  };

  const close = () => {
    dispatch({
      type: "add-new-bookmark",
      direction: "close",
    });
  };

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
        <h2 id="title" className="text-xl text-slate-50 m-4">
          Add new bookmark
        </h2>
        <NameEditField dataCallback={setData} />
        <UrlEditField dataCallback={setData} error={error} />
        <CancelSaveGroup closeCallback={close} submitDisabled={error} />
      </form>
    </div>
  );
}
