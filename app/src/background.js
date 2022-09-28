const color = '#3aa757';

window.chrome.runtime.onInstalled.addListener(() => {
  window.chrome.storage.sync.set({ color });
  console.log('default background color set to %cgreen', `color:${color}`)
})