import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import "./index.css";
import axios from "axios";

const muiButtonRootStyle = {
  borderRadius: '8px !important',
  background: "#5285EC",
  textTransform: "none",
}

const muiDialogPaperStyle = {
width: '260px !important',
height: '195px !important',
borderRadius: '10px !important',
padding: '20px',
boxShadow:' 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important'
}


export default function EditTaskDialog(props) {
  const { editDetails } = props;
  const { onClose, open } = props;
  const [taskName, setTaskName] = useState(editDetails.taskName);
  const [taskList, setTaskList] = useState([]);

  const handleClose = () => {
    onClose();
  };

  const handleTaskName = (event) => {
    setTaskName(event.target.value);
  };

  const handleSubmit = () => {
    const baseURL = `${process.env.REACT_APP_URL}/tasks/update`;
    axios
      .patch(`${baseURL}/${editDetails._id}`, {
        user: localStorage.getItem("userId"),
        taskName: taskName,
      })
      .then((response) => {
        onClose();
      });
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ '& .MuiPaper-root': muiDialogPaperStyle }}>
      {/* <DialogTitle>Set backup account</DialogTitle> */}
      <div className="new_task">Edit Task</div>
      <div>
        <TextField
          className="login_TF_input"
          id="outlined-basic"
          label="Task Name"
          variant="outlined"
          onChange={handleTaskName}
          type="text"
          defaultValue={editDetails.taskName}
          value={taskName}
          name="taskName"
          required
        />
      </div>
      <div className="button_display_dialog">
        <Button
          className="addTask_button_dialog"
          variant="contained"
          onClick={handleSubmit}
          sx={muiButtonRootStyle}
        >
          Edit Task
        </Button>
      </div>
    </Dialog>
  );
}
