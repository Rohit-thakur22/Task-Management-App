import axios from "axios";
import { todoFormType } from "../features/tasks/tasksThunks";

const API_BASE_URL = "https://dummyjson.com/todos";

export interface Todo {
  id?: number;
  todo: string;
  completed?: boolean;
  isPending?: boolean;
  status?: "completed" | "pending" | "todo";
}

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data.todos;
};

export const fetchTodo = async (id: number | string): Promise<Todo[]> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const addTodo = async (todo: todoFormType): Promise<todoFormType> => {
  const response = await axios.post(`${API_BASE_URL}/add`, todo);
  return response.data;
};

export const editTodo = async (
  id: number,
  updates: Partial<Todo>
): Promise<Todo> => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, updates);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<Todo> => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
