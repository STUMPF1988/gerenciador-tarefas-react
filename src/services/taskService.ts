import type { Task } from "../types/Task";

let mockedTasks: Task[] = [
  {
    id: 1,
    title: "Estudar componentes React",
    completed: true,
  },
  {
    id: 2,
    title: "Aprender useState",
    completed: true,
  },
  {
    id: 3,
    title: "Aprender useEffect",
    completed: false,
  },
];

function simulateDelay(milliseconds = 500): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export const taskService = {
  async getAll(): Promise<Task[]> {
    await simulateDelay();

    return [...mockedTasks];
  },

  async create(title: string): Promise<Task> {
    await simulateDelay();

    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };

    mockedTasks = [...mockedTasks, newTask];

    return newTask;
  },
};