const WorkSessionRepository = require("../repository/WorkSessionRepository");
const SegmentRepository = require("../repository/SegmentRepository");

function pauseRunningSession() {
  const runningSession = WorkSessionRepository.findRunningSession();

  if (!runningSession) {
    return;
  }

  const openSegment = SegmentRepository.findOpenSegment(runningSession.id);

  if (openSegment) {
    SegmentRepository.endSegment(openSegment.id);
  }

  WorkSessionRepository.updateStatus(runningSession.id, "paused");
}

function startWorkSession(taskId, description) {
  // single running timer 보장
  pauseRunningSession();

  const workSessionId = WorkSessionRepository.createWorkSession(
    taskId,
    description
  );

  SegmentRepository.startSegment(workSessionId);

  return workSessionId;
}

function resumeWorkSession(workSessionId) {
  // 기존 running 자동 pause
  pauseRunningSession();

  const session = WorkSessionRepository.findById(workSessionId);

  if (!session) {
    throw new Error("WorkSession not found");
  }

  if (session.status !== "paused") {
    throw new Error("Session is not paused");
  }

  WorkSessionRepository.updateStatus(workSessionId, "running");

  SegmentRepository.startSegment(workSessionId);
}

function pauseWorkSession(workSessionId) {
  const session = WorkSessionRepository.findById(workSessionId);

  if (!session) {
    throw new Error("WorkSession not found");
  }

  const openSegment = SegmentRepository.findOpenSegment(workSessionId);

  if (openSegment) {
    SegmentRepository.endSegment(openSegment.id);
  }

  WorkSessionRepository.updateStatus(workSessionId, "paused");
}

function endWorkSession(workSessionId) {
  const session = WorkSessionRepository.findById(workSessionId);

  if (!session) {
    throw new Error("WorkSession not found");
  }

  const openSegment = SegmentRepository.findOpenSegment(workSessionId);

  if (openSegment) {
    SegmentRepository.endSegment(openSegment.id);
  }

  WorkSessionRepository.updateStatus(workSessionId, "ended");
}

function getCurrentSession() {
  return WorkSessionRepository.findCurrentSession();
}

function getSegments(workSessionId) {
  return SegmentRepository.findByWorkSessionId(workSessionId);
}

async function pauseRunningSession() {
  const session = WorkSessionRepository.findRunningSession();

  if (!session) {
    return;
  }

  pauseWorkSession(session.id);
}

module.exports = {
  startWorkSession,
  pauseWorkSession,
  getCurrentSession,
  resumeWorkSession,
  endWorkSession,
  getSegments,
  pauseRunningSession,
};
