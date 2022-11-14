export { };

const ownUrl = 'https://testurl';
const defaultHost = 'http://localhost';

chrome.runtime.onInstalled.addListener((details) =>{
  if (details.reason === "install") {
    //handle a first install
    chrome.tabs.create({ url: `${ownUrl}/next.html` });
  } else if (details.reason === "update") {
    //handle an update
    chrome.tabs.create({ url: `${ownUrl}/updates.html` });
  }
  chrome.storage.sync.set({ownApi: { host: defaultHost, isURL: true } });
});

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener((text) => {
  // Encode user input for special characters , / ? : @ & = + $ #
  chrome.storage.sync.get("ownApi", function (data) {
    let newURL = `${ownUrl}/?q=${encodeURIComponent(text)}`;
    if (data.axapi.isURL) {
      newURL = `${data.axapi.host}?q=${encodeURIComponent(text)}`;
    }
    chrome.tabs.update({ url: newURL });
  });
});

chrome.runtime.onMessageExternal.addListener(
  function (request, sender, sendResponse) {
    chrome.storage.sync.get("ownApi", function (data) {
      if (data.axapi.isURL) {
        sendResponse({
          message: "No API key",
          success: false
        });
      } else {
        sendResponse({
          key: data.axapi.host,
          message: "Found API key",
          success: true
        });
      }
    });
  });

