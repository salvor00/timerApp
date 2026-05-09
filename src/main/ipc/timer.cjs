const { ipcMain } = require("electron");

const TimerService = require("../services/TimerService");

function registerTimerIpc() {
  ipcMain.handle("start-work-session", async (_, data) => {
    return TimerService.startWorkSession(data.taskId, data.description);
  });

  ipcMain.handle("pause-work-session", async (_, workSessionId) => {
    return TimerService.pauseWorkSession(workSessionId);
  });

  ipcMain.handle("resume-work-session", async (_, workSessionId) => {
    return TimerService.resumeWorkSession(workSessionId);
  });

  ipcMain.handle("end-work-session", async (_, workSessionId) => {
    return TimerService.endWorkSession(workSessionId);
  });
}

module.exports = {
  registerTimerIpc,
};
