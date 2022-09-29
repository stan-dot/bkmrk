import { useState } from "react";
import { presetButtonColors } from "./presetButtonColors";

function setPageBackgroundColor(): any {
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color;
  })
}

export function PopupField(): JSX.Element {
  const defaultColor: string = presetButtonColors[0];
  const [buttonColor, setButtonColor] = useState(defaultColor);

  const handleButtonClick = async () => {
    console.log('handling button click');
    const [tab]: chrome.tabs.Tab[] = await chrome.tabs.query({ active: true, currentWindow: true });
    // todo here tab might not exist
    console.log('tab:', tab);
    if (tab) {
      const target: chrome.scripting.InjectionTarget = { tabId: tab.id! };
      const script: chrome.scripting.ScriptInjection<any, any> = {
        target: target,
        func: setPageBackgroundColor,
      };
      chrome.scripting.executeScript(script).then(r => {
        console.log(r);
      })
    }
  }

  chrome.storage.sync.get("color", ({ color }) => {
    setButtonColor(color);
  });
  return <>
    <button id="changeColor" style={{ backgroundColor: buttonColor }} onClick={handleButtonClick} >
    </button>
    < script src="popup.js" > </script>
  </>
}