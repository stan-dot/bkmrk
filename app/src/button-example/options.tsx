import { useState } from "react";
import '../button.css';
import { presetButtonColors } from "./presetButtonColors";

export function OptionsField(): JSX.Element {
  const [currentColor, setCurrentColor] = useState(presetButtonColors[0]);

  console.log('storage:', chrome.storage);
  if (chrome.storage == null || chrome.storage === undefined) {
    console.log("storage doesn't exist")
  }

  chrome.storage.sync.get('color', data => setCurrentColor(data.color));
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, colorNumber: number) => {
    const color: string = presetButtonColors[colorNumber];
    console.log('click registered at diff colors:', event, ' number: ', color);
    if (color !== currentColor) {
      setCurrentColor(color);
      chrome.storage.sync.set({ color });
    }
  }

  return <div id="buttonDiv">
    <p>Choose a different background color!</p>
    {
      presetButtonColors.map((color: string, i: number) => {
        return <button className={`${color}`} id={i.toString()} onClick={e => handleClick(e, i)} />;
      })
    }
  </div>
}

