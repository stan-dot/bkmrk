const page = document.getElementById('buttonDiv');
const selectedClassName = 'current';
const presetButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function handleButtonClick(event) {
  const current = event.target.parentElement.querySelector(`.${selectedClassName}`)
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }
  const color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  window.chrome.storage.sync.set({ color });
}


function constructOptions(buttonColors) {
  window.chrome.storage.sync.get('color', (data) => {
    const currentColor = data.color;
    for (const buttonColor of buttonColors) {
      const button = document.createElement('button');
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;

      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }
      button.addEventListener('click', handleButtonClick);
      page.appendChild(button);
    }
  })
}

constructOptions(presetButtonColors);
