import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
  addTaskThunk,
  editTaskThunk,
  todoFormType,
} from "../../features/tasks/tasksThunks";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { moveTaskToInProgress } from "../../features/tasks/tasksSlice";

interface modalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  isEdit?: boolean;
  selectedData?: todoFormType;
}

export default function FormDialog({
  open,
  setOpen,
  title,
  isEdit,
  selectedData,
}: modalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [todoValue, setTodoValue] = React.useState("");
  const [statusValue, setStatusValue] = React.useState<
    "completed" | "pending" | "todo" | string | undefined
  >("todo");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusValue((event.target as HTMLInputElement).value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (isEdit && selectedData) {
      setStatusValue(selectedData?.status);
      setTodoValue(selectedData.todo);
    }
  }, [isEdit, selectedData]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const todo = formJson.todo;
            setTodoValue(todo);
            if (isEdit && selectedData?.id) {
              dispatch(
                editTaskThunk({
                  id: selectedData.id,
                  updates: {
                    todo,
                    completed: statusValue === "completed" ? true : false,
                  },
                })
              );
              statusValue === "pending" &&
                dispatch(moveTaskToInProgress(selectedData?.id));
            } else {
              dispatch(
                addTaskThunk({
                  todo,
                  completed: false,
                  userId: 5,
                })
              );
            }
            handleClose();
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="name"
            value={todoValue}
            name="todo"
            label="New Todo"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setTodoValue(e.target.value)}
          />
          {isEdit && (
            <FormControl
              sx={{
                marginTop: 2,
              }}
            >
              <FormLabel id="demo-controlled-radio-buttons-group">
                Status
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={statusValue}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={"completed"}
                  control={<Radio />}
                  label="Completed"
                />
                <FormControlLabel
                  value="pending"
                  control={<Radio />}
                  label="Pending"
                />
                <FormControlLabel
                  value="todo"
                  control={<Radio />}
                  label="Todo"
                />
              </RadioGroup>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{isEdit ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
