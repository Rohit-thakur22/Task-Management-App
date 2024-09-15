import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchTasksThunk } from "../features/tasks/tasksThunks";
import TaskItem from "./TaskItem";
import { moveTaskToInProgress } from "../features/tasks/tasksSlice";

const TaskBoard: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, inProgressTasks, loading, doneTasks } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasksThunk()); // Fetch tasks on mount
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  const moveToInProgress = (taskId: number) => {
    dispatch(moveTaskToInProgress(taskId)); // Move task to In Progress
  };
  console.log("tasks", tasks);
  console.log("inProgressTasks", inProgressTasks);
  console.log("doneTasks", doneTasks);

  return (
    <div className="task-board">
      <div className="column">
        <h3>To Do</h3>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onMoveToInProgress={moveToInProgress}
          /> // Call TaskItem with action
        ))}
      </div>
      <div className="column">
        <h3>In Progress</h3>
        {inProgressTasks.map((task) => (
          <TaskItem key={task.id} task={task} /> // Call TaskItem without action (static tasks)
        ))}
      </div>
      <div className="column">
        <h3>Done</h3>
        {doneTasks.map((task) => (
          <TaskItem key={task.id} task={task} /> // Call TaskItem without action (static tasks)
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
