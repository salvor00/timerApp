import { useEffect } from "react";

import { useTimerStore } from "./store/timerStore";

import { calculateElapsed } from "./utils/time";

function App() {
  const currentSession = useTimerStore((state) => state.currentSession);

  const elapsed = useTimerStore((state) => state.elapsed);

  const setElapsed = useTimerStore((state) => state.setElapsed);

  useEffect(() => {
    if (!currentSession) {
      return;
    }

    const sessionId = currentSession.id;

    async function updateElapsed() {
      const segments = await window.timer.getSegments(sessionId);

      const value = calculateElapsed(segments);

      setElapsed(value);
    }

    updateElapsed();

    const interval = setInterval(updateElapsed, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSession, setElapsed]);

  return (
    <div>
      <h1>{Math.floor(elapsed / 1000)}</h1>
    </div>
  );
}

export default App;
