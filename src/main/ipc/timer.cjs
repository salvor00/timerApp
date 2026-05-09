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

  ipcMain.handle("get-current-session", async () => {
    return TimerService.getCurrentSession();
  });

  ipcMain.handle("get-segments", async (_, workSessionId) => {
    return TimerService.getSegments(workSessionId);
  });

  ipcMain.handle(
    "getWorkSessionsByTask",

    (event, taskId) => {
      return TimerService.getWorkSessionsByTask(taskId);
    }
  );
}

module.exports = {
  registerTimerIpc,
};
