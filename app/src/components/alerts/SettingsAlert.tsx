import { FormEvent, useEffect, useState } from "react";
import { usePopupDispatch } from "../../contexts/PopupContext";
import { CancelSaveGroup } from "./groups/CancelSaveGroup";
import {
  defaultSettings,
  getSettings,
  setSettingsToDefault,
  Settings
} from "./Settings";

// todo maybe use reducer
// todo a button to reset to defaults
// todo need to do the loading first
export default function SettingsAlert() {
  console.log("created the add new folder alert");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getSettings().then((s) => {
      setData(s);
    });
  }, []);

  const [data, setData] = useState<Settings>(defaultSettings);
  const [newInput, setNewInput] = useState<string>("");

  const dispatch = usePopupDispatch();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
  }, [data, setError]);

  const onSubmit = (e: FormEvent) => {
    console.log("submitting the form");
    e.preventDefault();
    if (checkIfCreateBookmarkValid(data)) {
      chrome.bookmarks.create(data).then((r) => {
        console.debug("new bookmark", r);
        close();
      });
    } else {
      setError(true);
    }
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
      fixed top-1/3 left-1/3
      flex flex-col px-6 py-2
      m-auto
      z-60 inset-0 border-solid border-gray-500 h-60 w-96  bg-slate-800 overflow-y-auto rounded  "
        id="editAlertForm"
        onSubmit={onSubmit}
      >
        <div>
          <h2 id="title" className="text-xl text-slate-50 m-4">
            here some settings
          </h2>
          <div>
            {data.tracingLinksRegexes.map((regex, i) => {
              return (
                <div>
                  <input type={"text"} value={regex.toString()} key={i} />
                  <button>delete</button>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <input type="text" onChange={(s) => setNewInput(s.target.value)} />
          <button
            onClick={() => {
              // todo here set new data based on the current new input and reset that input
            }}
          >
            Add new regular expression
          </button>
        </div>

        <div
          onClick={() => {
            setSettingsToDefault().then((d) => {
              setData(defaultSettings);
            });
          }}
        >
          <button>reset to defaults</button>
        </div>
        <div>
          <h2>help</h2>
          <p>
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
