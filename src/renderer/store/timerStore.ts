import { create } from "zustand";

type WorkSession = {
  id: number;
  taskId: number;
  description: string;
  status: string;
};

type TimerState = {
  currentSession: WorkSession | null;

  isRunning: boolean;

  elapsed: number;

  setCurrentSession: (session: WorkSession | null) => void;

  setIsRunning: (running: boolean) => void;

  setElapsed: (elapsed: number) => void;
};

export const useTimerStore = create<TimerState>((set) => ({
  currentSession: null,

  isRunning: false,

  elapsed: 0,

  setCurrentSession: (session) =>
    set({
      currentSession: session,
    }),

  setIsRunning: (running) =>
    set({
      isRunning: running,
    }),

  setElapsed: (elapsed) =>
    set({
      elapsed,
    }),
}));
