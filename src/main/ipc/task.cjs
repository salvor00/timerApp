const { ipcMain } = require("electron");

const TaskService = require("../services/TaskService");

function registerTaskIpc() {
  ipcMain.handle("create-task", async (_, name) => {
    return TaskService.createTask(name);
  });

  ipcMain.handle("get-tasks", async () => {
    return TaskService.getTasks();
  });
}

module.exports = {
  registerTaskIpc,
};
