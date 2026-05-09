const Database = require("better-sqlite3")
const path = require("path")

const dbPath = path.join(__dirname, "app.db")

const db = new Database(dbPath)

// foreign key 활성화
db.exec(`PRAGMA foreign_keys = ON;`)

module.exports = db