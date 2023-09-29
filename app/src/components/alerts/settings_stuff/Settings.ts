import { SorterOptions } from '../../../sorting';

export type Settings = {
  tracingLinksRegexes: RegExp[];
  sortingSettings: SorterOptions;
};

// todo possibly join these by OR. that would also help settings processing
export const defaultTracingRegexes: RegExp[] = [
  /((&|\?)ref=)/ig,
  /((&|\?)mtrref)/ig,
  /((&|\?)utm_medium=)+/gi,
  /(~#text)/ig,
  /((&|\?)utm_source)/ig,
  /((&|\?)utm_campaign)/ig,
];

export const defaultSettings: Settings = {
  tracingLinksRegexes: defaultTracingRegexes,
};

export async function setSettingsToDefault(): Promise<void> {
  chrome.storage.sync.set({ settingsKeyName: defaultSettings });
}

export const settingsKeyName: string = "bkmrkSettings";

export async function getSettings(): Promise<Settings> {
  setSettingsToDefault();
  const settings: Settings | undefined = await chrome.storage.sync.get(
    settingsKeyName,
  ) as Settings | undefined;
  if (settings !== undefined) {
    console.debug("getting the settings successful", settings);
    return settings;
  }
  console.debug("settings unavailable, resetting");
  setSettingsToDefault();
  return defaultSettings;
}

export async function updateSettings(newSettings: Settings): Promise<void> {
  chrome.storage.sync.set({ settingsKeyName: newSettings });
}
