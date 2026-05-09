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

    updateElapsed();

    const interval = setInterval(updateElapsed, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSession?.id, currentSession?.status]);

  if (!currentSession) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-slate-800
          bg-slate-900
          p-6
          mb-6
        "
      >
        <p
          className="
            text-slate-400
          "
        >
          No Active Session
        </p>
      </div>
    );
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
      className="
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-6
        mb-6
        shadow-xl
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          mb-4
        "
      >
        <div>
          <p
            className="
              text-sm
              text-slate-400
              mb-1
            "
          >
            Current Session
          </p>

          <h2
            className="
              text-2xl
              font-bold
            "
          >
            {currentSession.description}
          </h2>
        </div>

        <div>
          <span
            className={`
              text-xs
              px-3
              py-1
              rounded-full
              font-semibold
              ${
                currentSession.status === "running"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }
            `}
          >
            {currentSession.status}
          </span>
        </div>
      </div>

      <div
        className="
          text-6xl
          font-black
          tracking-tight
          mb-6
        "
      >
        {formatTime(elapsed)}
      </div>

      <div
        className="
          flex
          gap-3
        "
      >
        {currentSession.status === "running" && (
          <button
            onClick={handlePause}
            className="
              px-4
              py-2
              rounded-xl
              bg-yellow-500
              text-black
              font-semibold
              hover:opacity-90
            "
          >
            Pause
          </button>
        )}

        {currentSession.status === "paused" && (
          <button
            onClick={handleResume}
            className="
              px-4
              py-2
              rounded-xl
              bg-green-500
              text-black
              font-semibold
              hover:opacity-90
            "
          >
            Resume
          </button>
        )}

        <button
          onClick={handleEnd}
          className="
            px-4
            py-2
            rounded-xl
            bg-red-500
            text-white
            font-semibold
            hover:opacity-90
          "
        >
          End
        </button>
      </div>
    </div>
  );
}
