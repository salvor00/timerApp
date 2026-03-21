const db = require("./database.cjs")

function initDB() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS work_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id INTEGER NOT NULL,
      description TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (task_id) REFERENCES tasks(id)
    );

    CREATE TABLE IF NOT EXISTS segments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      work_session_id INTEGER NOT NULL,
      start_time INTEGER NOT NULL,
      end_time INTEGER,
      FOREIGN KEY (work_session_id) REFERENCES work_sessions(id)
    );

    CREATE TABLE IF NOT EXISTS blockers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      work_session_id INTEGER NOT NULL,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (work_session_id) REFERENCES work_sessions(id)
    );
  `)
}

module.exports = { initDB }