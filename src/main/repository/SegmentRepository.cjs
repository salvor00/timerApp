// src/main/repository/SegmentRepository.cjs

const db = require("../db/database");

function startSegment(workSessionId) {
  const stmt = db.prepare(`
    INSERT INTO segments (
      work_session_id,
      start_time
    )
    VALUES (?, ?)
  `);

  const result = stmt.run(workSessionId, Date.now());

  return result.lastInsertRowid;
}

function findById(id) {
  return db
    .prepare(
      `
    SELECT *
    FROM segments
    WHERE id = ?
  `
    )
    .get(id);
}

function findOpenSegment(workSessionId) {
  return db
    .prepare(
      `
    SELECT *
    FROM segments
    WHERE work_session_id = ?
      AND end_time IS NULL
    LIMIT 1
  `
    )
    .get(workSessionId);
}

function endSegment(segmentId) {
  return db
    .prepare(
      `
    UPDATE segments
    SET end_time = ?
    WHERE id = ?
  `
    )
    .run(Date.now(), segmentId);
}

function findByWorkSessionId(workSessionId) {
  return db
    .prepare(
      `
    SELECT *
    FROM segments
    WHERE work_session_id = ?
    ORDER BY start_time ASC
  `
    )
    .all(workSessionId);
}

module.exports = {
  startSegment,
  findById,
  findOpenSegment,
  endSegment,
  findByWorkSessionId,
};
