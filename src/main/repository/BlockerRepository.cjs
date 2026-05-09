// src/main/repository/BlockerRepository.cjs

const db = require("../db/database.cjs");

function createBlocker(workSessionId) {
  const stmt = db.prepare(`
    INSERT INTO blockers (
      work_session_id,
      created_at
    )
    VALUES (?, ?)
  `);

  const result = stmt.run(workSessionId, Date.now());

  return result.lastInsertRowid;
}

function findByWorkSessionId(workSessionId) {
  return db
    .prepare(
      `
    SELECT *
    FROM blockers
    WHERE work_session_id = ?
    ORDER BY created_at ASC
  `
    )
    .all(workSessionId);
}

module.exports = {
  createBlocker,
  findByWorkSessionId,
};
