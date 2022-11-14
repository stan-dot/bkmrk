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

const suggestion: chrome.omnibox.Suggestion = {
  description: "Let's try this!"
};
chrome.omnibox.setDefaultSuggestion(suggestion)


// here might need to get ready for the search operation
chrome.omnibox.onInputStarted.addListener(() => {

})

chrome.omnibox.onInputChanged.addListener((text: string ) => {
  const r1: chrome.omnibox.SuggestResult = {
    content: "",
    description: ""
  };
  const results: chrome.omnibox.SuggestResult[] = [r1];
  return results;
})


// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener((text:string) => {
  // todo read this as a path and start it
  // if special characters, might redirect to extension special page
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

