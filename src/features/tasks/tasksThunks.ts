import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTodos,
  addTodo,
  editTodo,
  deleteTodo,
  Todo,
} from "../../api/todoService";
export interface todoFormType {
  todo: string;
  completed?: boolean;
  userId?: number;
  id?: number;
  status?: "completed" | "pending" | "todo";
}

export const fetchTasksThunk: any = createAsyncThunk(
  "tasks/fetch",
  async () => {
    const data = await fetchTodos();
    return data;
  }
);

export const addTaskThunk = createAsyncThunk(
  "tasks/add",
  async (task: todoFormType) => {
    const data = await addTodo(task);
    return data;
  }
);

export const editTaskThunk = createAsyncThunk(
  "tasks/edit",
  async ({ id, updates }: { id: number; updates: Partial<Todo> }) => {
    const data = await editTodo(id, updates);
    return data;
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "tasks/delete",
  async (id: number) => {
    const data = await deleteTodo(id);
    return data
  }
);
