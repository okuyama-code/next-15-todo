import { api } from "./api";

export interface Todo {
  id: number;
  title: string;
}

export interface TodoCreateInput {
  title: string;
}

export const todoService = {
  // Get all todos
  getAll: async () => {
    const response = await api.get("/todos");
    return response.data;
  },

  // Get a single todo
  getById: async (id: number) => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  // Create a new todo
  create: async (todoData: any) => {
    const response = await api.post("/todos", { todo: todoData });
    return response.data;
  },

  // Update a todo
  update: async (id: number, todoData: any) => {
    const response = await api.put(`/todos/${id}`, { todo: todoData });
    return response.data;
  },

  // Delete a todo
  delete: async (id: number) => {
    await api.delete(`/todos/${id}`);
  },
};
