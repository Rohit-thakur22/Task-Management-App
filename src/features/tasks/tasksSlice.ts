import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../api/todoService";
import {
  addTaskThunk,
  deleteTaskThunk,
  editTaskThunk,
  fetchTasksThunk,
  todoFormType,
} from "./tasksThunks";

export interface TasksState {
  tasks: Todo[];
  inProgressTasks: Todo[];
  doneTasks: Todo[];
  loading: boolean;
  error: string | null;
  allData: Todo[];
}

const initialState: TasksState = {
  allData: [],
  tasks: [],
  inProgressTasks: [],
  loading: false,
  error: null,
  doneTasks: [],
};

const updateTodosByStatus = (state: TasksState) => {
  const filterTodoItems = state.allData.filter(
    (task) => !task.completed && !task.isPending
  );
  const filterDoneItems = state.allData.filter(
    (task) => task.completed && !task.isPending
  );

  state.tasks = filterTodoItems
    .filter(
      (task) =>
        !state.inProgressTasks.some(
          (inProgressTask) => inProgressTask.id === task.id
        )
    )
    .map((task) => ({
      ...task,
      isPending: false,
      status: "todo",
    }));

  state.doneTasks = filterDoneItems
    .filter(
      (task) =>
        !state.inProgressTasks.some(
          (inProgressTask) => inProgressTask.id === task.id
        )
    )
    .map((task) => ({
      ...task,
      isPending: false,
      status: "completed",
    }));
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    moveTaskToInProgress: (state, action: PayloadAction<number>) => {
      const task = state.allData.find((task) => task.id === action.payload);
      if (task) {
        state.inProgressTasks.push({
          ...task,
          isPending: true,
          status: "pending",
        });
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.doneTasks = state.doneTasks.filter(
          (task) => task.id !== action.payload
        );
      }
    },
    handleTodosByStatus: (state) => {
      updateTodosByStatus(state); // Call the helper function here
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTasksThunk.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.loading = false;
          state.allData = action.payload;
          updateTodosByStatus(state);
        }
      )
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(addTaskThunk.fulfilled, (state, { payload }) => {
        state.tasks.push(payload);
      })
      .addCase(editTaskThunk.fulfilled, (state, { payload }) => {
        const updatedIndex = state.allData.findIndex(
          (todo: todoFormType) => todo.id === payload?.id
        );
        if (updatedIndex !== -1) {
          state.allData[updatedIndex] = payload;
        }

        updateTodosByStatus(state);
      })
      .addCase(deleteTaskThunk.fulfilled, (state, { payload }: any) => {
        state.tasks = state.tasks.filter((task) => task.id !== payload.id);
        state.inProgressTasks = state.inProgressTasks.filter(
          (task) => task.id !== payload.id
        );
        state.doneTasks = state.doneTasks.filter(
          (task) => task.id !== payload.id
        );
      });
  },
});

export const { moveTaskToInProgress } = tasksSlice.actions;
export default tasksSlice.reducer;
