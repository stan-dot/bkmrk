import { FormEvent, useEffect, useReducer, useState } from "react";
import { usePopupDispatch } from "../../contexts/PopupContext";
import { CancelSaveGroup } from "./groups/CancelSaveGroup";
import {
  defaultSettings,
  setSettingsToDefault,
  updateSettings,
} from "./Settings";
import { settingsReducer } from "./SettingsReducer";

export default function SettingsAlert() {
  console.log("created the add new folder alert");
  const dispatch = usePopupDispatch();
  const [localSettings, localDispatch] = useReducer(
    settingsReducer,
    defaultSettings,
  );

  useEffect(() => {
    // todo that should be in the final version
    // todo add loading support, maybe some fancy icon
    // getSettings().then((s) => {
    //   setData(s);
    // });
  }, []);

  const onSubmit = (e: FormEvent) => {
    console.log("submitting the settings change form");
    e.preventDefault();
    updateSettings(localSettings);
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
      z-60 inset-0 border-solid border-gray-500 w-11/12 h-11/12  bg-slate-800 overflow-y-auto rounded  "
        id="editAlertForm"
        onSubmit={onSubmit}
      >
        <div>
          <h2 id="title" className="text-xl text-slate-50 m-1">
            Settings
          </h2>
          <div>
            <h3 className="text-lg text-white">Tracing link settings</h3>
            <TracingLinksContainer
              rows={localSettings.tracingLinksRegexes}
              localDispatch={localDispatch}
            />
            <AddNewTracingLink
              localDispatch={localDispatch}
            />
          </div>
          <button
            className="text-white m-2 p-2 bg-slate-700 rounded-sm  "
            onClick={() => {
              setSettingsToDefault().then((d) => {
                localDispatch({ type: "reset" });
              });
            }}
          >
            Reset to defaults
          </button>
        </div>
        <CancelSaveGroup closeCallback={close} />
      </form>
    </div>
  );
}

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

function AddNewTracingLink(
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

function TracingLinksContainer(
  { rows, localDispatch }: TracingLinksContainerProps,
): JSX.Element {
  if (rows === undefined) return <></>;
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
