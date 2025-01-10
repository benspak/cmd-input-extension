document.addEventListener("DOMContentLoaded", () => {
  const addCommandForm = document.getElementById("addCommandForm");
  const commandList = document.getElementById("commandList");

  const refreshCommands = () => {
    chrome.storage.sync.get(null, (items) => {
      commandList.innerHTML = "";
      for (const [cmd, text] of Object.entries(items)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${cmd}: ${text}`;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          chrome.storage.sync.remove(cmd, refreshCommands);
        });
        listItem.appendChild(deleteButton);
        commandList.appendChild(listItem);
      }
    });
  };

  addCommandForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const command = document.getElementById("command").value.trim();
    const text = document.getElementById("text").value.trim();
    chrome.storage.sync.set({ [command]: text }, refreshCommands);
    addCommandForm.reset();
  });

  refreshCommands();
});
