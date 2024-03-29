import { FormEvent, useReducer } from "react";
import { usePopupDispatch } from "../alerts/PopupContext";
import { CancelSaveGroup } from "../alerts/button-groups/CancelSaveGroup";
import {
  AddNewTracingLink,
  TracingLinksContainer,
} from "../tracing-links-deletion/components/TracingLinksContainer";
import {
  defaultSettings,
  setSettingsToDefault,
  updateSettings,
} from "./Settings";
import { settingsReducer } from "./SettingsReducer";

export default function SettingsAlert() {
  console.debug("created the add new folder alert");
  const dispatch = usePopupDispatch();
  const [localSettings, localSettingsDispatch] = useReducer(
    settingsReducer,
    defaultSettings,
  );

  const onSubmit = (e: FormEvent) => {
    console.debug("submitting the settings change form");
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
              localDispatch={localSettingsDispatch}
            />
            <AddNewTracingLink
              localDispatch={localSettingsDispatch}
            />
          </div>
          <button
            className="text-white m-2 p-2 bg-slate-700 rounded-sm  "
            onClick={() => {
              setSettingsToDefault().then((d) => {
                localSettingsDispatch({ type: "reset" });
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
