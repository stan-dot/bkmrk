import { FormEvent, useEffect, useState } from "react";
import { usePopupDispatch } from "../../contexts/PopupContext";
import { CancelSaveGroup } from "./groups/CancelSaveGroup";
import {
  defaultSettings,
  getSettings,
  setSettingsToDefault,
  Settings,
  updateSettings,
} from "./Settings";

// todo maybe use reducer
// todo a button to reset to defaults
// todo need to do the loading first
export default function SettingsAlert() {
  console.log("created the add new folder alert");

  const dispatch = usePopupDispatch();
  const [data, setData] = useState<Settings>(defaultSettings);
  const [newInput, setNewInput] = useState<string>("");

  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // todo that should be in the final version
    // getSettings().then((s) => {
    //   setData(s);
    // });
  }, []);

  useEffect(() => {
    setError(false);
  }, [data, setError]);

  const onSubmit = (e: FormEvent) => {
    console.log("submitting the settings change form");
    e.preventDefault();
    updateSettings(data);
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
      z-60 inset-0 border-solid border-gray-500 h-[400px] w-[400px]  bg-slate-800 overflow-y-auto rounded  "
        id="editAlertForm"
        onSubmit={onSubmit}
      >
        <div>
          <h2 id="title" className="text-xl text-slate-50 m-4">
            settings
          </h2>
          <div className="p-2 shadow-sm rounded-md m-2">
            {data.tracingLinksRegexes &&
              data.tracingLinksRegexes.map((regex, i) => {
                return (
                  <div className="p-1 m-1 bg-slate-600">
                    <input type={"text"} value={regex.toString()} key={i} />
                    <button className="text-white">delete</button>
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          <input type="text" onChange={(s) => setNewInput(s.target.value)} />
          <button
            className="text-white"
            onClick={() => {
              // todo here set new data based on the current new input and reset that input
            }}
          >
            Add new regular expression
          </button>
          <button
            onClick={() => {
              setNewInput("");
            }}
          >
            Clear
          </button>
        </div>

        <div
          onClick={() => {
            setSettingsToDefault().then((d) => {
              setData(defaultSettings);
            });
          }}
        >
          <button className="text-white border-1 border-slate-700">
            reset to defaults
          </button>
        </div>
        <div>
          <h2 className="text-white">help</h2>
          <p className="text-white">
            use websites like
            <a href="https://regexr.com/">regexr.com</a>
            to prepare exactly what you need
          </p>
        </div>
        <CancelSaveGroup closeCallback={close} />
      </form>
    </div>
  );
}
