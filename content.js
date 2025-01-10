document.addEventListener("keydown", async (e) => {
  if (e.altKey && e.key === "Enter") {
    const activeElement = document.activeElement;

    if (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable) {
      const commandText = activeElement.value || activeElement.innerText;
      const match = commandText.match(/^;cmd;(\w+)/);

      if (match) {
        const command = match[1];

        chrome.storage.sync.get(command, (result) => {
          if (result[command]) {
            const replacementText = result[command];
            const newText = commandText.replace(`;cmd;${command}`, replacementText);

            if (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA") {
              activeElement.value = newText;
            } else if (activeElement.isContentEditable) {
              activeElement.innerText = newText;
            }
          } else {
            alert(`Command '${command}' not found!`);
          }
        });
      }
    }
  }
});
