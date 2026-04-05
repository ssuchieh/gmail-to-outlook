// options.js

document.addEventListener("DOMContentLoaded", () => {
  const geminiKeyInput = document.getElementById("gemini-key");
  const saveBtn = document.getElementById("save-btn");
  const statusDiv = document.getElementById("status");

  // Load existing options
  chrome.storage.local.get(["geminiApiKey"], (items) => {
    if (items.geminiApiKey) {
      geminiKeyInput.value = items.geminiApiKey;
    }
  });

  // Save functionality
  saveBtn.addEventListener("click", async () => {
    const key = geminiKeyInput.value.trim();
    if (!key) {
      statusDiv.style.color = "red";
      statusDiv.innerText = "Please enter a key.";
      statusDiv.style.display = "block";
      return;
    }

    saveBtn.innerText = "Validating...";
    saveBtn.disabled = true;

    try {
      // Test the key
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
      if (!response.ok) {
        throw new Error("Invalid API Key");
      }
      
      chrome.storage.local.set({ geminiApiKey: key }, () => {
        statusDiv.style.color = "green";
        statusDiv.innerText = "API Key validated and saved successfully!";
        statusDiv.style.display = "block";
        saveBtn.innerText = "Save Key";
        saveBtn.disabled = false;
        setTimeout(() => statusDiv.style.display = "none", 4000);
      });
    } catch (err) {
      statusDiv.style.color = "red";
      statusDiv.innerText = "Error: Invalid API Key. Please check and try again.";
      statusDiv.style.display = "block";
      saveBtn.innerText = "Save Key";
      saveBtn.disabled = false;
    }
  });


});
