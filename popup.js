document.addEventListener("DOMContentLoaded", async () => {
  const commandForm = document.getElementById("command-form");
  const commandsList = document.getElementById("commands-list");

  // Load commands
  const loadCommands = async () => {
    const { commands } = await chrome.storage.sync.get("commands");
    commandsList.innerHTML = "";

    for (const [key, value] of Object.entries(commands || {})) {
      const listItem = document.createElement("li");
      listItem.textContent = `${key}: ${value}`;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", async () => {
        delete commands[key];
        await chrome.storage.sync.set({ commands });
        loadCommands();
      });
      listItem.appendChild(deleteButton);
      commandsList.appendChild(listItem);
    }
  };

  // Save command
  commandForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const commandName = document.getElementById("command-name").value.trim();
    const commandText = document.getElementById("command-text").value.trim();

    if (commandName && commandText) {
      const { commands } = await chrome.storage.sync.get("commands");
      await chrome.storage.sync.set({
        commands: { ...commands, [commandName]: commandText }
      });
      commandForm.reset();
      loadCommands();
    }
  });

  loadCommands();
});
