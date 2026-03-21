export default function App() {
    const handleClick = async () => {
        // @ts-ignore
        await window.api.startTimer({ taskId: 1 })
    }

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">Timer App</h1>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={handleClick}
            >
                Start Timer
            </button>
        </div>
    )
}
