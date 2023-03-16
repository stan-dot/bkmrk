import { FormEvent, useEffect, useReducer } from "react";
import { usePopupDispatch } from "../../contexts/PopupContext";
import { CancelSaveGroup } from "./groups/CancelSaveGroup";
import {
  defaultSettings,
  setSettingsToDefault,
  updateSettings,
} from "./Settings";
import { settingsReducer } from "./SettingsReducer";
import {
  AddNewTracingLink,
  TracingLinksContainer,
} from "./TracingLinksContainer";

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
