import { useEffect, useState } from "react";

import { useTimerStore } from "./store/timerStore";

import CurrentSessionCard from "./components/CurrentSessionCard";

import TaskSidebar from "./components/TaskSidebar";

import SessionTimeline from "./components/SessionTimeline";

function App() {
  const [tasks, setTasks] = useState<any[]>([]);

  const [name, setName] = useState("");

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const [description, setDescription] = useState("");

  const setCurrentSession = useTimerStore((state) => state.setCurrentSession);

  async function loadTasks() {
    const data = await window.timer.getTasks();

    setTasks(data);
  }

  async function handleCreateTask() {
    if (!name.trim()) {
      return;
    }

    await window.timer.createTask(name);

    setName("");

    loadTasks();
  }

  async function handleStartWorkSession() {
    if (!selectedTaskId) {
      return;
    }

    if (!description.trim()) {
      return;
    }

    const workSessionId = await window.timer.startWorkSession({
      taskId: selectedTaskId,

      description,
    });

    setCurrentSession({
      id: workSessionId,

      taskId: selectedTaskId,

      description,

      status: "running",
    });

    setDescription("");
  }

  useEffect(() => {
    loadTasks();

    async function recoverSession() {
      const session = await window.timer.getCurrentSession();

      if (!session) {
        return;
      }

      const shouldResume = window.confirm("이전 WorkSession을 복구할까요?");

      if (shouldResume) {
        setCurrentSession(session);
      }
    }

    recoverSession();
  }, []);

  return (
    <div
      className="
        flex
        bg-slate-950
        text-white
        min-h-screen
      "
    >
      <TaskSidebar
        tasks={tasks}
        selectedTaskId={selectedTaskId}
        setSelectedTaskId={setSelectedTaskId}
        name={name}
        setName={setName}
        handleCreateTask={handleCreateTask}
      />

      <main
        className="
          flex-1
          p-8
          overflow-y-auto
        "
      >
        <CurrentSessionCard />

        {selectedTaskId && (
          <>
            <div
              className="
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
                Start WorkSession
              </h2>

              <div
                className="
                  flex
                  gap-3
                "
              >
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="
                    현재 작업 내용 입력
                  "
                  className="
                    flex-1
                    bg-slate-950
                    border
                    border-slate-700
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                  "
                />

                <button
                  onClick={handleStartWorkSession}
                  className="
                    px-5
                    py-3
                    rounded-xl
                    bg-green-500
                    text-black
                    font-bold
                    hover:opacity-90
                  "
                >
                  Start
                </button>
              </div>
            </div>

            <SessionTimeline taskId={selectedTaskId} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
