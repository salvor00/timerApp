const { ipcMain } = require("electron")

function registerTimerIpc() {
    ipcMain.handle("start-timer", async (_, data) => {
        console.log("Timer start:", data)
        return true
    })
}

module.exports = { registerTimerIpc }
