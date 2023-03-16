import { defaultSettings, Settings } from "./Settings";

export type SettingsReducerActionType = "add" | "delete" | "update" | "reset";

export type SettingsAction = {
  type: SettingsReducerActionType;
  newContent?: string;
  removeOrChangeId?: number;
};

export function settingsReducer(
  settings: Settings,
  action: SettingsAction,
): Settings {
  console.log("action", action);
  switch (action.type) {
    case "add": {
      return {
        ...settings,
        tracingLinksRegexes: [
          ...settings.tracingLinksRegexes,
          new RegExp(action.newContent!),
        ],
      };
    }
    case "delete": {
      return {
        ...settings,
        // todo that order-based solution might not preserve
        tracingLinksRegexes: settings.tracingLinksRegexes.filter((r, i) =>
          i !== action.removeOrChangeId
        ),
      };
    }

    case "update": {
      return {
        ...settings,
        tracingLinksRegexes: settings.tracingLinksRegexes.map((r, i) => {
          return i === action.removeOrChangeId
            ? new RegExp(action.newContent!)
            : r;
        }),
      };
    }
    case "reset": {
      return defaultSettings;
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
