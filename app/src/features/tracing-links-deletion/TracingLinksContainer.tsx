import { useState } from "react";

type TracingRowProps = {
  regex: RegExp;
  i: number;
  localDispatch: Function;
};

type TracingLinksContainerProps = {
  rows: RegExp[] | undefined;
  localDispatch: Function;
};

type AddNewTracingLinkBoxProps = {
  localDispatch: Function;
};

export function AddNewTracingLink(
  { localDispatch }: AddNewTracingLinkBoxProps,
) {
  const [newInput, setNewInput] = useState<string>("");
  return (
    <div id="createField" className="flex flex-row">
      <input
        type="text"
        onChange={(s) => setNewInput(s.target.value)}
      />
      <button
        className="text-white border-1 m-2 p-2 bg-slate-600"
        onClick={() => {
          localDispatch({
            type: "add",
            newContent: newInput,
          });
        }}
      >
        Add new
      </button>
      <button
        onClick={() => {
          setNewInput("");
        }}
        className="text-white border-1 m-2 p-2 bg-slate-600"
      >
        Clear
      </button>
      <p className="text-white">
        use websites like
        <span className="mx-1">
          <a className="underline" href="https://regexr.com/">
            regexr.com
          </a>
        </span>
        or
        <span className="mx-1">
          <a className="underline" href="https://regex101.com/">
            regex101.com
          </a>
        </span>
        to prepare exactly what you need
      </p>
    </div>
  );
}
export function TracingLinksContainer(
  { rows, localDispatch }: TracingLinksContainerProps,
): JSX.Element {
  if (rows === undefined) {
    return <></>;
  }
  return (
    <div className="p-2 shadow-sm rounded-md m-1">
      {rows.map((regex, i) => {
        return (
          <TracingLinkItem
            regex={regex}
            localDispatch={localDispatch}
            i={i}
          />
        );
      })}
    </div>
  );
}
function TracingLinkItem(
  { regex, i, localDispatch }: TracingRowProps,
): JSX.Element {
  return (
    <div className="p-2 m-1 bg-slate-600 flex justify-between">
      <input
        type={"text"}
        value={regex.toString()}
        key={i}
        className="w-50"
      />
      <button
        className="text-white mx-2 px-2 bg-slate-700"
        onClick={() => {
          localDispatch({
            type: "delete",
            removeOrChangeId: i,
          });
        }}
      >
        Delete
      </button>
    </div>
  );
}
