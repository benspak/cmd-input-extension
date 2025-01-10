chrome.runtime.onInstalled.addListener(() => {
  // Initialize storage with an example command
  chrome.storage.sync.set({
    commands: {
      "example": "This is an example text."
    }
  });
});
