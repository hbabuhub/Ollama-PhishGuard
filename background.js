chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed and service worker activated");

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "checkUrlRisk" && message.url) {
            console.log("Received URL check request for:", message.url);

            checkUrlRisk(message.url)
                .then((isRisky) => {
                    chrome.storage.local.set({ urlStatus: isRisky });
                    console.log("URL status saved:", isRisky);
                })
                .catch((error) => {
                    console.error("Error checking URL risk:", error);
                });
        }
    });
});

async function checkUrlRisk(url) {
    console.log("Initiating risk check for URL:", url); // Log when a URL check starts

    try {
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: `Determine if the given URL is a phishing site. Respond with a single word: 'True' for phishing, 'False' for legitimate. Do not provide explanations or additional details. URL: ${url}`,
                model: "llama3.1:8b",
            }),
        });

        console.log("Response received from the API:", response.status, response.statusText); // Log the response status

        // Log the response headers for debugging
        console.log("Response headers:", [...response.headers.entries()]);

        const responseText = await response.text();
        console.log("Raw response text: ", responseText);

        // Process only the first line of the response
        const [firstLine] = responseText.split("\n").filter(Boolean);

        if (firstLine.startsWith("{") || firstLine.startsWith("[")) {
            const data = JSON.parse(firstLine); // Parse only the first line
            console.log("Parsed response data:", data); // Log the parsed JSON response

            const message = data.response.trim();
            if (message === "True") {
                console.log("URL is determined as risky");
                return "risky";
            } else if (message === "False") {
                console.log("URL is determined as healthy");
                return "healthy";
            } else {
                console.warn("Unexpected response format:", message); // Log a warning for unexpected responses
                return "unknown";
            }
        } else {
            console.error("Response is not valid JSON:", responseText);
            return "unknown";
        }
    } catch (error) {
        console.error("Error during fetch or JSON parsing:", error); // Log any fetch or JSON parsing errors
        return "unknown"; // Return "unknown" if an error occurs
    }
}
