// Open selected items
// Are you sure you want to open 24 tabs?
// NOTE the critical number is 16
import { FormEvent } from "react";
import { CancelSaveGroup } from "./groups/CancelSaveGroup";

type OpenSelectedAlertProps = {
  submitCallback: () => void;
  closeCallback: () => void;
  visible: boolean;
  num: number;
};

export default function OpenSelectedAlert(
  { submitCallback: openThemCallback, closeCallback, visible, num }:
    OpenSelectedAlertProps,
) {
  const onSubmit = (e: FormEvent) => {
    console.log("submitting the form");
    e.preventDefault();
    openThemCallback();
    closeCallback();
  };

  return (
    <div
      className="fixed backdrop-blur-md w-full h-full grid grid-cols-2 gap-4 place-content-center z-50"
      id="alertBackground"
      style={{ display: `${visible ? "absolute" : "none"}` }}
    >
      <form
        className="
      fixed top-1/3 left-1/3
      flex flex-col px-6 py-2
      m-auto
      z-60 inset-0 border-solid border-gray-500 h-40 w-96  bg-slate-800 overflow-y-auto rounded  "
        id="editAlertForm"
        onSubmit={onSubmit}
      // onBlur={closeCallback}
      >
        <h2 id="title" className="text-xl text-slate-50 m-4">Open selected items</h2>
        <p
          className={`w-3/5 text  text-slate-50 `}
        > Are you sure you want to open {num}tabs?
        </p>
        <CancelSaveGroup closeCallback={closeCallback} altSubmitName="Open" />
      </form>
    </div>
  );
}
