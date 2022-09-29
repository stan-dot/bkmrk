import { useState } from "react";


function setPageBackgroundColor(): any {
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color;
  })
}

export function PopupField(): JSX.Element {
  const defaultColor = 'green';
  const [buttonColor, setButtonColor] = useState(defaultColor);

  const handleButtonClick = async () => {
    const [tab]: chrome.tabs.Tab[] = await chrome.tabs.query({ active: true, currentWindow: true });
    // todo here tab might not exist
    if (tab) {
      const target: chrome.scripting.InjectionTarget = { tabId: tab.id! };
      const script: chrome.scripting.ScriptInjection<any, any> = {
        target: target,
        func: setPageBackgroundColor,
      };
      chrome.scripting.executeScript(script);
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