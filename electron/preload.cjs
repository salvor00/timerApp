const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("api", {
    startTimer: (data) => ipcRenderer.invoke("start-timer", data),
})
