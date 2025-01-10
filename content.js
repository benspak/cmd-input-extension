// Listen for `Ctrl + Enter` or `Cmd + Enter` in input fields
document.addEventListener("keydown", async (event) => {
  if ((event.altKey) && event.key === "Space") {
    const activeElement = document.activeElement;

    // Ensure the active element is an input or textarea
    if (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA") {
      const inputValue = activeElement.value;

      // Check for the `;cmd;` prefix
      if (inputValue.startsWith(";cmd;")) {
        const command = inputValue.slice(5).trim();

        // Retrieve the saved commands from storage
        const { commands } = await chrome.storage.sync.get("commands");
        const replacementText = commands[command];

        if (replacementText) {
          // Replace the input with the saved text
          activeElement.value = replacementText;
        } else {
          // Notify the user if the command is not found
          alert(`Command "${command}" not recognized.`);
        }

        // Prevent default action
        event.preventDefault();
      }
    }
  }
});
