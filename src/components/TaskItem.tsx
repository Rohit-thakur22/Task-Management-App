import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { Todo } from "../api/todoService";
import { deleteTaskThunk, todoFormType } from "../features/tasks/tasksThunks";
import FormDialog from "./common/Modal";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

interface TaskItemProps {
  task: Todo;
  onMoveToInProgress?: (taskId: number) => void; // Optional callback for moving tasks
}

const TaskItem: React.FC<TaskItemProps> = ({ task }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<todoFormType>();
  const navigate = useNavigate();
  return (
    <div className="task-box">
      <p>{task?.todo}</p>
      <div className="task-action-icons">
        <IconButton
          onClick={() => {
            setSelectedData(task);
            setOpenEditModal(true);
          }}
        >
          <CiEdit size={22} />
        </IconButton>
        <IconButton
          onClick={() => navigate(`/task/${task?.id}/${task?.status}`)}
        >
          <FaRegEye size={22} />
        </IconButton>
        <IconButton onClick={() => dispatch(deleteTaskThunk(task?.id))}>
          <MdDeleteOutline size={22} />
        </IconButton>
      </div>
      <FormDialog
        open={openEditModal}
        setOpen={setOpenEditModal}
        title="Update Todo"
        isEdit={true}
        selectedData={selectedData}
      />
    </div>
  );
};

export default TaskItem;
