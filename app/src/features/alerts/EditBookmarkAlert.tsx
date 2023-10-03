import { FormEvent, useEffect, useState } from "react";
import { usePopupDispatch } from "./PopupContext";
import { CancelSaveGroup } from "./button-groups/CancelSaveGroup";
import { RenameGroup } from "./button-groups/RenameGroup";
import { UrlEditGroup } from "./button-groups/UrlEditGroup";
import { checkIfCreateBookmarkValid } from "../../lib/CRUDBookmarkFacade";

type EditAlertProps = {
  id: string;
};

const initialData: chrome.bookmarks.BookmarkChangesArg = {
  title: "",
  url: "",
};

export default function EditBookmarkAlert(
  { id }: EditAlertProps,
) {
  const dispatch = usePopupDispatch();
  console.debug("created the edit alert");
  const [data, setData] = useState<chrome.bookmarks.BookmarkChangesArg>(
    initialData,
  );

  // todo convert this to a custom hook
  useEffect(() => {
    chrome.bookmarks.get(id).then((l) => {
      const b = l[0];
      setData({ title: b.title, url: b.url });
    });
  }, []);

  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
  }, [data, setError]);

  const onSubmit = (e: FormEvent) => {
    console.debug("submitting the form");
    e.preventDefault();
    if (checkIfCreateBookmarkValid(data)) {
      chrome.bookmarks.update(id, data).then((r) => {
        close();
      });
    } else {
      setError(true);
    }
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
        <RenameGroup dataCallback={setData} />
        <UrlEditGroup dataCallback={setData} error={error} />
        <CancelSaveGroup closeCallback={close} submitDisabled={error} />
      </form>
    </div>
  );
}
