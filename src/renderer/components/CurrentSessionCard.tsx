import { useEffect } from "react";

import { useTimerStore } from "../store/timerStore";

import { calculateElapsed } from "../utils/time";

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);

  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
}

export default function CurrentSessionCard() {
  const currentSession = useTimerStore((state) => state.currentSession);

  const elapsed = useTimerStore((state) => state.elapsed);

  const setElapsed = useTimerStore((state) => state.setElapsed);

  const setCurrentSession = useTimerStore((state) => state.setCurrentSession);

  useEffect(() => {
    if (!currentSession || currentSession.status !== "running") {
      return;
    }

    async function updateElapsed() {
      const session = currentSession;

      if (!session) {
        return;
      }

      const segments = await window.timer.getSegments(session.id);

      const value = calculateElapsed(segments);

      setElapsed(value);
    }

    // 최초 즉시 계산
    updateElapsed();

    // 이후 1초마다 갱신
    const interval = setInterval(updateElapsed, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSession?.id, currentSession?.status]);

  if (!currentSession) {
    return <div>No Active Session</div>;
  }

  async function handlePause() {
    const session = currentSession;

    if (!session) {
      return;
    }

    await window.timer.pauseWorkSession(session.id);

    setCurrentSession({
      ...session,
      status: "paused",
    });
  }

  async function handleResume() {
    const session = currentSession;

    if (!session) {
      return;
    }

    await window.timer.resumeWorkSession(session.id);

    setCurrentSession({
      ...session,
      status: "running",
    });
  }

  async function handleEnd() {
    const session = currentSession;

    if (!session) {
      return;
    }

    await window.timer.endWorkSession(session.id);

    setCurrentSession(null);

    setElapsed(0);
  }

  return (
    <div
      style={{
        border: "1px solid gray",

        padding: "16px",

        marginBottom: "24px",

        borderRadius: "12px",
      }}
    >
      <h2>Current Session</h2>

      <p>Description: {currentSession.description}</p>

      <p>Status: {currentSession.status}</p>

      <h1>{formatTime(elapsed)}</h1>

      {currentSession.status === "running" && (
        <button onClick={handlePause}>Pause</button>
      )}

      {currentSession.status === "paused" && (
        <button onClick={handleResume}>Resume</button>
      )}

      <button
        onClick={handleEnd}
        style={{
          marginLeft: "8px",
        }}
      >
        End
      </button>
    </div>
  );
}
