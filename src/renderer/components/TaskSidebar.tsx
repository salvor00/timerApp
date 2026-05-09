type Props = {
  tasks: any[];

  selectedTaskId: number | null;

  setSelectedTaskId: (id: number) => void;

  name: string;

  setName: (value: string) => void;

  handleCreateTask: () => void;
};

export default function TaskSidebar({
  tasks,

  selectedTaskId,

  setSelectedTaskId,

  name,

  setName,

  handleCreateTask,
}: Props) {
  return (
    <div
      className="
        w-80
        min-h-screen
        bg-slate-950
        border-r
        border-slate-800
        p-4
      "
    >
      <h1
        className="
          text-2xl
          font-black
          mb-6
        "
      >
        Tasks
      </h1>

      <div
        className="
          flex
          gap-2
          mb-6
        "
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New Task"
          className="
            flex-1
            bg-slate-900
            border
            border-slate-700
            rounded-xl
            px-3
            py-2
            outline-none
          "
        />

        <button
          onClick={handleCreateTask}
          className="
            px-4
            rounded-xl
            bg-blue-500
            text-white
            font-semibold
          "
        >
          +
        </button>
      </div>

      <div
        className="
          flex
          flex-col
          gap-2
        "
      >
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => setSelectedTaskId(task.id)}
            className={`
              text-left
              px-4
              py-3
              rounded-xl
              transition
              ${
                selectedTaskId === task.id
                  ? `
                    bg-blue-500
                    text-white
                  `
                  : `
                    bg-slate-900
                    hover:bg-slate-800
                    text-slate-300
                  `
              }
            `}
          >
            {task.name}
          </button>
        ))}
      </div>
    </div>
  );
}
