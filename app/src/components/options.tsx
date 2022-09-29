import { useState } from "react";
import '../button.css';

const presetButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

export function OptionsField(): JSX.Element {
  const [currentColorNumber, setCurrentColorNumber] = useState(0);

  if (chrome.storage == null || chrome.storage === undefined) {
    console.log("storage doesn't exist")
  }

  chrome.storage.sync.get('colorNumber', data => setCurrentColorNumber(data.colorNumber));
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, colorNumber: number) => {
    if (colorNumber !== currentColorNumber) {
      setCurrentColorNumber(colorNumber);
      chrome.storage.sync.set({ colorNumber });
    }
  }

  return <div id="buttonDiv">
    <p>Choose a different background color!</p>
    {
      presetButtonColors.map((color: string, i: number) => {
        return <button color={color} style={{ backgroundColor: color }} id={i.toString()} onClick={e => handleClick(e, i)} />;
      })
    }
  </div>
}

