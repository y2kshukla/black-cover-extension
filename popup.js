const textarea = document.getElementById("urls");
const status = document.getElementById("status");

chrome.storage.sync.get(["blackUrls"], (data) => {
  textarea.value = (data.blackUrls || []).join("\n");
});

document.getElementById("save").addEventListener("click", () => {
  const urls = textarea.value.split("\n").map(u => u.trim()).filter(Boolean);
  chrome.storage.sync.set({ blackUrls: urls }, () => {
    status.textContent = "Saved!";
    setTimeout(() => status.textContent = "", 1000);
  });
});

document.getElementById("remove-cover").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "removeCover" });
  });
});
