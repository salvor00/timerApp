import { useEffect, useState } from "react";

type Props = {
  taskId: number | null;
};

function formatDate(timestamp: number) {
  const date = new Date(timestamp);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SessionTimeline({ taskId }: Props) {
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    if (!taskId) {
      return;
    }

    async function load() {
      const data = await window.timer.getWorkSessionsByTask(taskId);

      setSessions(data);
    }

    load();
  }, [taskId]);

  return (
    <div
      className="
        mt-6
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-6
      "
    >
      <h2
        className="
          text-xl
          font-bold
          mb-4
        "
      >
        Timeline
      </h2>

      <div
        className="
          flex
          flex-col
          gap-3
        "
      >
        {sessions.map((session) => (
          <div
            key={session.id}
            className="
              p-4
              rounded-xl
              bg-slate-950
              border
              border-slate-800
            "
          >
            <div
              className="
                text-sm
                text-slate-400
                mb-1
              "
            >
              {formatDate(session.start_time)}

              {" - "}

              {session.end_time ? formatDate(session.end_time) : "Running"}
            </div>

            <div
              className="
                text-lg
                font-semibold
              "
            >
              {session.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
