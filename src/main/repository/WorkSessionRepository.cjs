// src/main/repository/WorkSessionRepository.cjs

const db = require("../db/database");

function createWorkSession(taskId, description) {
  const stmt = db.prepare(`
    INSERT INTO work_sessions (
      task_id,
      description,
      status,
      created_at
    )
    VALUES (?, ?, ?, ?)
  `);

  const result = stmt.run(taskId, description, "running", Date.now());

  return result.lastInsertRowid;
}

function findById(id) {
  return db
    .prepare(
      `
    SELECT *
    FROM work_sessions
    WHERE id = ?
  `
    )
    .get(id);
}

function findRunningSession() {
  return db
    .prepare(
      `
    SELECT *
    FROM work_sessions
    WHERE status = 'running'
    LIMIT 1
  `
    )
    .get();
}

function findPausedByTaskId(taskId) {
  return db
    .prepare(
      `
    SELECT *
    FROM work_sessions
    WHERE task_id = ?
      AND status = 'paused'
    LIMIT 1
  `
    )
    .get(taskId);
}

function updateStatus(id, status) {
  return db
    .prepare(
      `
    UPDATE work_sessions
    SET status = ?
    WHERE id = ?
  `
    )
    .run(status, id);
}

function endSession(id) {
  return db
    .prepare(
      `
    UPDATE work_sessions
    SET status = 'ended'
    WHERE id = ?
  `
    )
    .run(id);
}

function findCurrentSession() {
  return db
    .prepare(
      `
    SELECT *
    FROM work_sessions
    WHERE status IN ('running', 'paused')
    ORDER BY created_at DESC
    LIMIT 1
  `
    )
    .get();
}

module.exports = {
  createWorkSession,
  findById,
  findRunningSession,
  findPausedByTaskId,
  findCurrentSession,
  updateStatus,
  endSession,
};
