import { api } from "./api";

import type { Task } from "../types/Task";

interface CreateTaskRequest {
  title: string;
  completed?: boolean;
}

export const taskService = {
  async getAll(): Promise<Task[]> {
    const response = await api.get<Task[]>("/tasks");

    return response.data;
  },

  async create(title: string): Promise<Task> {
    const body: CreateTaskRequest = {
      title,
      completed: false,
    };

    const response = await api.post<Task>("/tasks", body);

    return response.data;
  },
};