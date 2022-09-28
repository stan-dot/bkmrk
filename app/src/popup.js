const changeColor = document.getElementById('changeColor');
window.chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});


changeColor.addEventListener('click', async () => {
  const [tab] = await window.chrome.tabs.query({ active: true, currentWindow: true });
  window.chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: setPageBackgroundColor,
  });
});


function setPageBackgroundColor() {
  window.chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color;
  })
}