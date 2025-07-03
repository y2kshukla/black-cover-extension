const COVER_ID = "black-cover-extension";
const INACTIVITY_TIME = 10000;
let originalTitle = document.title;
let originalFaviconHref = null;

chrome.storage.sync.get(["blackUrls"], (data) => {
  const urlPatterns = data.blackUrls || [];
  const currentUrl = window.location.href;

  const matches = urlPatterns.some(pattern => {
    const regex = new RegExp("^" + pattern.replace(/\*/g, ".*").replace(/\?/g, ".") + "$");
    return regex.test(currentUrl);
  });

  if (matches) {
    setupInactivityOverlay();
    setupShortcutListener();
    setupMessageListener();
  }
});

function setupInactivityOverlay() {
  let timeoutId;

  const showCover = () => {
    if (!document.getElementById(COVER_ID)) {
      const div = document.createElement("div");
      div.id = COVER_ID;
      Object.assign(div.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        zIndex: "2147483647",
        pointerEvents: "none",
      });
      document.documentElement.appendChild(div);

      // Save and replace title
      originalTitle = document.title;
      document.title = "Black screen";

      // Save and remove favicon
      const favicon = document.querySelector("link[rel~='icon']");
      if (favicon) {
        originalFaviconHref = favicon.href;
        favicon.href = ""; // effectively removes it
      }
    }
  };

  const resetTimer = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(showCover, INACTIVITY_TIME);
  };

  document.addEventListener("mousemove", resetTimer);
  resetTimer();
}

function hideCover() {
  const existing = document.getElementById(COVER_ID);
  if (existing) {
    existing.remove();
    document.title = originalTitle;

    // Restore favicon
    if (originalFaviconHref) {
      let favicon = document.querySelector("link[rel~='icon']");
      if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }
      favicon.href = originalFaviconHref;
    }
  }
}

function setupShortcutListener() {
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "'") {
      hideCover();
    }
  });
}

function setupMessageListener() {
  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "removeCover") {
      hideCover();
    }
  });
}
