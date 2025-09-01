console.log(`RUNNING BACKGROUND.JS`);

// BASIC CODE FOR EVENT LISTENING AND LOGGING PICKED FROM GOOGLE EXTENSION API FOR DEVELOPERS

// Correct Base URL
const baseURL = "http://localhost:4000";
let activeTab = null;
let tabStart = Date.now();

// Function to send data to backend
const backend = (url, title, timeSpent = 0) => {
  fetch(`${baseURL}/api/logged-visit/log-visit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, title, timeSpent }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
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
  const now = Date.now();

  if (activeTab) {
    const timeSpent = now - tabStart;
    backend(activeTab.url, activeTab.title, timeSpent);
  }

  activeTab = await chrome.tabs.get(activeInfo.tabId);
  tabStart = Date.now();
});

chrome.idle.onStateChanged.addListener((state) => {
  if (state === "idle" || state === "locked") {
    tabStart = Date.now();  
  }
});

// SOME BASIC CHROME EXTENSION API FUNCTIONS
// chrome.tabs.get(()=>)  FETCH INFO
