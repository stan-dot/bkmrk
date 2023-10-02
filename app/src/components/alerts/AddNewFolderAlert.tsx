import { FormEvent, useEffect, useState } from "react";
import { usePath } from "../../contexts/PathContext";
import { usePopupDispatch } from "../../contexts/PopupContext";
import { CancelSaveGroup } from "./button-groups/CancelSaveGroup";
import { RenameGroup } from "./button-groups/RenameGroup";

type AddNewFolderProps = {
  parent: chrome.bookmarks.BookmarkTreeNode;
};

// can do an empty one
export default function AddNewFolderAlert(
  { parent }: AddNewFolderProps,
) {
  const path = usePath();
  const locationId = path.items.at(-1)!.id;

  const dispatch = usePopupDispatch();
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<chrome.bookmarks.BookmarkCreateArg>({
    title: "",
    parentId: locationId,
  });

  useEffect(() => {
    setError(false);
  }, [data, setError]);

  const onSubmit = (e: FormEvent) => {
    console.debug("submitting the form");
    e.preventDefault();
    chrome.bookmarks.create(data).then((r) => {
      console.debug("new bookmark", r);
      close();
    });
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
        <RenameGroup dataCallback={setData} />
        <CancelSaveGroup closeCallback={close} />
      </form>
    </div>
  );
}
