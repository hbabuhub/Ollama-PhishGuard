# Ollama-PhishGuard

![Ollama-PhishGuard Logo](icons/icon128.png)

**Ollama-PhishGuard** is a Chrome extension that checks the current tab's URL for phishing risks using the `llama3.1` model from Ollama's API. This extension analyzes URLs and provides a simple risk assessment to alert users if the current page appears suspicious.

## Project Overview

**Ollama-PhishGuard** leverages the `llama3.1` model provided by the Ollama API to evaluate URLs. By inspecting domain names, subdomains, and common phishing indicators, it categorizes URLs as either "safe" or "risky." The extension displays the status for the active tab's URL when prompted.

## Features

- **URL Phishing Detection**: Checks URLs for characteristics commonly associated with phishing attacks.
- **Simple Risk Assessment**: Displays results as "This URL is risky!" or "This URL is safe!".
- **Easy-to-Use Chrome Extension**: Runs within the Chrome browser, providing on-demand URL checks.

---

## Setup Instructions

### Prerequisites

- **Node.js** (for package installations if needed for Ollama)
- **Ollama** installed on your system
- **Chrome Browser** (for the extension)

### Ollama API Setup

1. **Install and Configure the `llama3.1` Model**:
   Ensure that you have the `llama3.1` model installed and accessible via the Ollama API. Refer to [Ollama's documentation](https://ollama.com/docs) for model installation instructions.

2. **Enable CORS for Ollama**:
   To allow the Chrome extension to access the Ollama API locally, you need to configure CORS. Run the following command in your terminal:

   ```bash
   launchctl setenv OLLAMA_ORIGINS "*"
   ```

   This command sets the `OLLAMA_ORIGINS` environment variable to accept requests from any origin, which is essential for local development.

3. **Start the Ollama API**:
   Start the Ollama API server to make the `llama3.1` model accessible for requests. Follow Ollama's documentation to run the server, ensuring it listens on `localhost:11434`.

### Chrome Extension Setup

1. **Clone this repository**:

   ```bash
   git clone https://github.com/yourusername/Ollama-PhishGuard.git
   cd Ollama-PhishGuard
   ```

2. **Configure Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** in the top right corner.
   - Click **Load unpacked** and select the cloned `Ollama-PhishGuard` project directory.
   - The extension will now appear in your extension list with the configured icon and popup.

3. **Verify Permissions**:
   Ensure that you grant the necessary permissions for the extension to access URLs, tabs, and storage.

---

## Usage

1. **Launch the Ollama-PhishGuard Extension**:
   Click the extension icon in the Chrome toolbar to open the popup.

2. **Check URL Status**:
   - The popup will initially display "Ready."
   - Click **Check URL** to assess the current tab's URL. The status will update to "Checking..." as it communicates with the Ollama API.
   - Once the API responds, the status will display either "This URL is risky!" in red if the URL is suspicious or "This URL is safe!" in green if the URL is legitimate.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork this repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Open a pull request.
