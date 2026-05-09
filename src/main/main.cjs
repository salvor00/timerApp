const { app, BrowserWindow } = require("electron");
const path = require("path");
const { registerTimerIpc } = require("./ipc/timer.cjs");
const { initDB } = require("./db/init.cjs");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "../../electron/preload.cjs"),
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../../dist/index.html"));
  }
}

app.whenReady().then(() => {
  initDB();
  createWindow();
  registerTimerIpc();
});

app.on("before-quit", () => {
  TimerService.pauseRunningSession();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
