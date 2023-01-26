import { useState } from "react";
import { presetButtonColors } from "./presetButtonColors";

function setPageBackgroundColor(): any {
  console.log("trying to get the color");
  chrome.storage.sync.get('color', ({ color }) => {
    console.log(color);
    document.body.style.backgroundColor = color;
  })
}

export function PopupField(): JSX.Element {
  const [buttonColor, setButtonColor] = useState(presetButtonColors[0]);

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
    <button id="changeColor" className={`${buttonColor}`} onClick={handleButtonClick} >
    </button>
    < script src="popup.js" > </script>
  </>
}