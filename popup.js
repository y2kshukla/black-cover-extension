const textarea = document.getElementById("urls");
const status = document.getElementById("status");
const saveBtn = document.getElementById("save");
const removeBtn = document.getElementById("remove-cover");
const goWiki = document.getElementById("go-wiki");
const closeTab = document.getElementById("close-tab");
const timeout = document.getElementById("timeout");

// Load saved settings
chrome.storage.sync.get(
	["blackUrls", "goWiki", "closeTab", "timeoutSec"],
	(data) => {
		textarea.value = (data.blackUrls || []).join("\n");
		goWiki.checked = !!data.goWiki;
		closeTab.checked = !!data.closeTab;
		timeout.value = data.timeoutSec || 10;
		console.log(timeout.value);
	}
);

// Save settings
saveBtn.addEventListener("click", () => {
	const urls = textarea.value
		.split("\n")
		.map((u) => u.trim())
		.filter(Boolean);

	const timeoutSec = parseInt(timeout.value, 10) || 10;

	chrome.storage.sync.set(
		{
			blackUrls: urls,
			goWiki: goWiki.checked,
			closeTab: closeTab.checked,
			timeoutSec: timeoutSec,
		},
		() => {
			showStatus("Settings saved successfully!");
		}
	);

	animateButton(saveBtn);
});

// Remove black cover
removeBtn.addEventListener("click", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, { action: "removeCover" });
	});

	animateButton(removeBtn);
});

// Animate click buttons
function animateButton(btn) {
	btn.style.transform = "scale(0.95)";
	setTimeout(() => {
		btn.style.transform = "";
	}, 100);
}

// Show status message
function showStatus(message) {
	status.textContent = message;
	status.classList.add("show");
	setTimeout(() => {
		status.textContent = "";
		status.classList.remove("show");
	}, 3000);
}

// Optional: click entire checkbox group (if styled for that)
document.querySelectorAll(".checkbox-group").forEach((group) => {
	group.addEventListener("click", (e) => {
		if (e.target.tagName !== "INPUT") {
			const checkbox = group.querySelector("input[type='checkbox']");
			checkbox.checked = !checkbox.checked;
		}
	});
});
