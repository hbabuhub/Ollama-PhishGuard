

document.addEventListener("DOMContentLoaded", function () {
    const statusElement = document.getElementById("status");
    const checkUrlButton = document.getElementById("checkUrlButton");
    const loadingBar = document.getElementById("loadingBar");

    // Set the status to "Ready" when the popup is opened
    statusElement.textContent = "Ready";
    statusElement.style.color = "black";
    loadingBar.style.display = "none"; // Hide loading bar initially

    // Clear the stored URL status when the popup is opened
    chrome.storage.local.remove("urlStatus");

    // Listen for storage changes to update status dynamically
    chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName === "local" && changes.urlStatus) {
            updateStatusDisplay(changes.urlStatus.newValue);
            loadingBar.style.display = "none"; // Hide loading bar when result is displayed
        }
    });

    // Attach a click event to the button to fetch the URL status when clicked
    checkUrlButton.addEventListener("click", () => {
        // Display "Checking..." and show loading bar only when button is clicked
        statusElement.textContent = "Checking...";
        statusElement.style.color = "black";
        loadingBar.style.display = "block"; // Show loading bar

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab && activeTab.url) {
                chrome.runtime.sendMessage({ action: "checkUrlRisk", url: activeTab.url });
                console.log("URL check triggered for:", activeTab.url);
            } else {
                console.warn("No active URL found to check.");
                statusElement.textContent = "No active URL found.";
                statusElement.style.color = "black";
                loadingBar.style.display = "none"; // Hide loading bar if no URL found
            }
        });
    });
});

// Function to update the status display based on the URL risk status
function updateStatusDisplay(urlStatus) {
    const statusElement = document.getElementById("status");
    if (urlStatus === "risky") {
        statusElement.textContent = "This URL is risky!";
        statusElement.style.color = "red";
    } else if (urlStatus === "healthy") {
        statusElement.textContent = "This URL is safe!";
        statusElement.style.color = "green";
    } else {
        statusElement.textContent = "Ready";
        statusElement.style.color = "black";
    }
}
