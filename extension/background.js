console.log(`RUNNING BACKGROUND.JS`);

// BASIC CODE FOR EVENT LISTENING AND LOGGING PICKED FROM GOOGLE EXTENSION API FOR DEVELOPERS

// Correct Base URL
const baseURL = "http://localhost:4000";

// Function to send data to backend
const backend = (url, title) => {
  fetch(`${baseURL}/api/logged-visit/log-visit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, title }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// chrome.tabs.onUpdated(()=>)  FOR URL CHANGES OF ACTIVE TAB
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("onUpdated fired", changeInfo, tab);
  if (changeInfo.url) {
    // URL CHANGED
    console.log("Visited URL:", changeInfo.url);
    backend(changeInfo.url, tab.title || "No Title");
  }
});

// chrome.tabs.onActivated(()=>)  FOR TAB SWITCHES
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  console.log("onActivated fired", activeInfo);
  let tab = await chrome.tabs.get(activeInfo.tabId);
  console.log("Switched to URL:", tab.url);
  backend(tab.url, tab.title || "No Title");
});

// SOME BASIC CHROME EXTENSION API FUNCTIONS
// chrome.tabs.get(()=>)  FETCH INFO
