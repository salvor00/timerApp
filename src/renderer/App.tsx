import { useEffect, useState } from "react";

import { useTimerStore } from "./store/timerStore";

import CurrentSessionCard from "./components/CurrentSessionCard";

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
      style={{
        padding: "24px",
      }}
    >
      <CurrentSessionCard />

      <h1>Task List</h1>

      {/* Task 생성 */}

      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="새 Task 이름"
        />

        <button onClick={handleCreateTask}>Create Task</button>
      </div>

      {/* Task 목록 */}

      <ul
        style={{
          marginBottom: "24px",
        }}
      >
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => setSelectedTaskId(task.id)}
            style={{
              cursor: "pointer",

              padding: "8px",

              border:
                selectedTaskId === task.id
                  ? "2px solid blue"
                  : "1px solid gray",

              marginBottom: "8px",
            }}
          >
            {task.name}
          </li>
        ))}
      </ul>

      {/* 선택된 Task */}

      {selectedTaskId && (
        <div>
          <h2>WorkSession Start</h2>

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="현재 작업 내용 입력"
          />

          <button onClick={handleStartWorkSession}>Start WorkSession</button>
        </div>
      )}
    </div>
  );
}

export default App;
