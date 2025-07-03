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
      zIndex: '2147483647', // max z-index
      pointerEvents: 'none', // lets clicks pass through, remove if you want a true block
    });
    document.documentElement.appendChild(div); // append to root for top priority
  }
}
