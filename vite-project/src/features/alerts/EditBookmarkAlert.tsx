import { FormEvent, useState } from "react";
import CRUDBookmarkFacade from "../../lib/CRUDBookmarkFacade";
import useBookmark from "../../lib/hooks/useBookmark";
import { usePopupDispatch } from "./PopupContext";
import { CancelSaveGroup } from "./button-groups/CancelSaveGroup";
import { NameEditField } from "./button-groups/EditField";
import { UrlEditField } from "./button-groups/UrlEditGroup";
import { BookmarkChangesArg } from "../../lib/typesFacade";

type EditAlertProps = {
  id: string;
};

export default function EditBookmarkAlert(
  { id }: EditAlertProps,
) {
  const dispatch = usePopupDispatch();
  console.debug("created the edit alert");
  const currentBookmark = useBookmark(id);

  const [data, setData] = useState<BookmarkChangesArg>(
    { title: currentBookmark?.title ?? "", url: currentBookmark?.url ?? "" },
  );
  const [error, setError] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent) => {
    console.debug("submitting the form");
    e.preventDefault();
    const response = await CRUDBookmarkFacade.update(id, data);
    response === null ? setError(true) : close();
  };

  const close = () => {
    dispatch({
      type: "edit-bookmark",
      direction: "close",
    });
  };

  return (
    <div
      className="fixed backdrop-blur-md w-full h-full z-50"
      id="alertBackground"
      // style={{ display: `${visible ? "absolute" : "none"}` }}
      style={{ display: "absolute" }}
    >
      <form
        className="
      fixed 
      flex flex-col px-6 py-2
      m-auto
      z-60 inset-0 border-solid border-gray-500 h-60 w-96  bg-slate-800 overflow-y-auto rounded"
        id="editAlertForm"
        onSubmit={onSubmit}
      >
        <h2 id="title" className="text-xl text-slate-50 m-4">Edit bookmark</h2>
        <NameEditField dataCallback={setData} />
        <UrlEditField dataCallback={setData} error={error} />
        <CancelSaveGroup closeCallback={close} submitDisabled={error} />
      </form>
    </div>
  );
}
