# 🕶️ Black Cover Extension

**Hide your screen in front of others.**  
A privacy-focused Chrome extension that reacts to inactivity by **hiding your browser activity** in one of three ways:

- ✅ Adds a full black overlay on the screen *(default)*
- 🔁 Redirects to a random Wikipedia page
- ❌ Closes the tab entirely

Perfect for students, professionals, or anyone who needs to hide distracting or sensitive tabs quickly when someone walks by.

---

## 🔧 Features

- ⏱ Customizable inactivity timeout
- 🔲 Full-screen black cover overlay
- 🌐 Option to redirect to a random Wikipedia page
- 🛑 Option to close the tab completely
- ⌨️ Quick shortcut: `Ctrl + '` to remove the overlay
- 📋 Block specific sites using wildcards

---

## 🚀 Getting Started

1. Clone or download the repository
2. Go to `chrome://extensions` in your browser
3. Enable **Developer Mode**
4. Click **Load Unpacked** and select the project folder
5. Configure the extension from the popup

---

## 🛠 Usage

- Use the popup to:
  - ✅ Select behavior (black overlay, Wikipedia redirect, or tab close)
  - ⏱ Set timeout duration (in seconds)
  - 📝 Define which sites should activate the feature (supports `*` wildcards)

- Once set, the extension will monitor your activity on matching sites and respond accordingly after the set time of inactivity.

---

## 🔒 Permissions

This extension requests:

- `tabs`: To close the current tab on inactivity  
- `scripting`: To inject the overlay dynamically  
- `storage`: To save your settings  
- `<all_urls>`: To work on any site you specify  

---

## ⚠️ Known Limitations

- Wikipedia redirect or tab close only happens if the current URL matches your input rules.
- Make sure your match rules are correct (e.g., `https://example.com/*`).

---

## 📄 License

This project is open source and free to use under the [MIT License](https://opensource.org/licenses/MIT).