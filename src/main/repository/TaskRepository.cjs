// src/main/repository/TaskRepository.cjs

const db = require("../db/database.cjs");

function createTask(name) {
  const stmt = db.prepare(`
    INSERT INTO tasks (
      name,
      created_at
    )
    VALUES (?, ?)
  `);

  const result = stmt.run(name, Date.now());

  return result.lastInsertRowid;
}

function findById(id) {
  return db
    .prepare(
      `
    SELECT *
    FROM tasks
    WHERE id = ?
  `
    )
    .get(id);
}

function findAll() {
  return db
    .prepare(
      `
    SELECT *
    FROM tasks
    ORDER BY created_at DESC
  `
    )
    .all();
}

module.exports = {
  createTask,
  findById,
  findAll,
};
