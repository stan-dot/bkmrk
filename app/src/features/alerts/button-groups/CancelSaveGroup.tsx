const buttonClass = "w-12 h-8 m-2 rounded";

export function CancelSaveGroup(
  props: {
    closeCallback: () => void;
    submitDisabled?: boolean;
    altSubmitName?: string;
  },
) {
  return (
    <div id="bottomPanel" className=" justify-end  ">
      <div id="buttonArea" className="flex justify-end w-full m-b-4 m-r-4">
        <button
          className={`${buttonClass} bg-slate-700 hover:bg-slate-600 text-cyan-400 border-slate-50 border-solid border-1`}
          id="cancel"
          onClick={props.closeCallback}
        >
          {props.altSubmitName ?? "Cancel"}
        </button>
        <input
          className={`${buttonClass} bg-cyan-600 hover:bg-cyan-700 text-slate-50 cursor-pointer`}
          type="submit"
          title="Save"
          disabled={props.submitDisabled}
        />
      </div>
    </div>
  );
}
