const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("timer", {
  startWorkSession: (data) => ipcRenderer.invoke("start-work-session", data),

  pauseWorkSession: (id) => ipcRenderer.invoke("pause-work-session", id),

  resumeWorkSession: (id) => ipcRenderer.invoke("resume-work-session", id),

  endWorkSession: (id) => ipcRenderer.invoke("end-work-session", id),

  getCurrentSession: () => ipcRenderer.invoke("get-current-session"),

  getSegments: (workSessionId) =>
    ipcRenderer.invoke("get-segments", workSessionId),

  createTask: (name) => ipcRenderer.invoke("create-task", name),

  getTasks: () => ipcRenderer.invoke("get-tasks"),
});
