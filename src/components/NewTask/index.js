import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import "./index.css";
import axios from "axios";

export default function AddTaskDialog(props) {
  const { onClose, open } = props;
  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    const baseUrl = `${process.env.REACT_APP_URL}/tasks/getByUser`;
    axios
      .post(`${baseUrl}`, { userId: localStorage.getItem("userId") })
      .then((response) => {
        setTaskList(response?.data?.tasks);
      });
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleTaskName = (event) => {
    setTaskName(event.target.value);
  };

  const handleSubmit = () => {
    const baseURL = `${process.env.REACT_APP_URL}/tasks/create`;
    axios
      .post(`${baseURL}`, {
        user: localStorage.getItem("userId"),
        taskName: taskName,
      })
      .then((response) => {
        onClose();
      });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      {/* <DialogTitle>Set backup account</DialogTitle> */}
      <div className="new_task">+ New Task</div>
      <div>
        <TextField
          className="login_TF_input"
          id="outlined-basic"
          label="Task Name"
          variant="standard"
          onChange={handleTaskName}
          type="text"
          value={taskName}
          name="taskName"
          InputProps={{
            disableUnderline: true,
          }}
          InputLabelProps={{
            style: { paddingLeft: "10px",color:"#7A7D7E",opacity:"100%"}
          }}
          sx={{borderRadius: '8px !important', opacity: 1,height:"45px",paddingLeft:"10px"}}
        />
      </div>
      <div className="button_display_dialog">
        <Button
          className="addTask_button_dialog"
          variant="contained"
          sx={{
            background: "#5285EC",
            textTransform: "none",
            borderRadius: '8px !important',
          }}
          onClick={handleSubmit}
        >
          + New Task
        </Button>
      </div>
    </Dialog>
  );
}

AddTaskDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
