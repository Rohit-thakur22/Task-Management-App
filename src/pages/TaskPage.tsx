import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTodo } from "../api/todoService"; // A function to fetch a single task
import { Card, CardContent, Typography } from "@mui/material";

const TaskPage: React.FC = () => {
  const { id, isPending } = useParams<{ id: string; isPending: string }>();
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const fetchedTask: any = await fetchTodo(id);
        const res = await fetchedTask;
        console.log(res);

        setTask(fetchedTask);
      };
      fetchTask();
    }
  }, [id]);

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {task.todo}
        </Typography>
        <Typography variant="h5" component="div">
          <p>
            Status: {isPending === 'pending' ? "Pending" : task.completed ? "Done" : "To Do"}
          </p>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskPage;
