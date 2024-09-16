import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import FormDialog from "./common/Modal";
import InstallButton from "./common/InstallButton";
export default function Navbar() {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management App
          </Typography>
          <InstallButton/>
          <Button
            color="primary"
            variant="contained"
            size="medium"
            endIcon={<IoAddOutline />}
            onClick={() => setOpenAddModal(true)}
          >
            Add Todo
          </Button>
        </Toolbar>
      </AppBar>
      <FormDialog open={openAddModal} setOpen={setOpenAddModal} title="Add New Todo"/>
    </Box>
  );
}
