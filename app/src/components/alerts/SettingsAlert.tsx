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
      z-60 inset-0 border-solid border-gray-500 h-[400rem] w-[400rem]  bg-slate-800 overflow-y-auto rounded  "
        id="editAlertForm"
        onSubmit={onSubmit}
      >
        <div>
          <h2 id="title" className="text-xl text-slate-50 m-1">
            Settings
          </h2>
          <div>
            <h3 className="text-lg text-white">Tracing link settings</h3>
            <div className="p-2 shadow-sm rounded-md m-1">
              {data.tracingLinksRegexes &&
                data.tracingLinksRegexes.map((regex, i) => {
                  return (
                    <div className="p-2 m-1 bg-slate-600 flex justify-between">
                      <input
                        type={"text"}
                        value={regex.toString()}
                        key={i}
                        className="w-fit"
                      />
                      <button className="text-white mx-2 px-2 bg-slate-700">
                        delete
                      </button>
                    </div>
                  );
                })}
            </div>
            <div id="createField" className="flex flex-row">
              <input
                type="text"
                onChange={(s) => setNewInput(s.target.value)}
              />
              <button
                className="text-white border-1 m-2 p-2 bg-slate-600"
                onClick={() => {
                  // todo here set new data based on the current new input and reset that input
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
                <span>
                  <a className="underline" href="https://regexr.com/">
                    regexr.com
                  </a>
                </span>
                or
                <span>
                  <a className="underline" href="https://regex101.com/">
                    regex101.com
                  </a>
                </span>

                to prepare exactly what you need
              </p>
            </div>
          </div>
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
        <CancelSaveGroup closeCallback={close} />
      </form>
    </div>
  );
}
