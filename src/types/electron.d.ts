export {};

declare global {
  interface Window {
    timer: {
      startWorkSession: (data: {
        taskId: number;
        description: string;
      }) => Promise<number>;

      pauseWorkSession: (workSessionId: number) => Promise<void>;

      resumeWorkSession: (workSessionId: number) => Promise<void>;

      endWorkSession: (workSessionId: number) => Promise<void>;

      getCurrentSession: () => Promise<any>;

      getSegments: (workSessionId: number) => Promise<any[]>;
    };
  }
}
