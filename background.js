// 1. Toggle black overlay when icon clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: toggleBlackCover
  });
});

function toggleBlackCover() {
  const existing = document.getElementById('black-cover-extension');
  if (existing) {
    existing.remove();
  } else {
    const div = document.createElement('div');
    div.id = 'black-cover-extension';
    Object.assign(div.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black',
      zIndex: '2147483647',
      pointerEvents: 'none',
    });
    document.documentElement.appendChild(div);
  }
}

// 2. Listen for "closeTab" message from content script
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "closeTab" && sender.tab && sender.tab.id) {
    chrome.tabs.remove(sender.tab.id);
  }
});
