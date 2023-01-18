import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AddTaskDialog from "../NewTask/index";
import "./index.css";
import TaskList from "../TaskList";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AddNewTask() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    navigate("/task");
    navigate(0);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const baseUrl = `${process.env.REACT_APP_URL}/tasks/getByUser`;
    axios
      .post(`${baseUrl}/${localStorage.getItem("userId")}`)
      .then((response) => {
        console.log(response, "res");
      });
  }, []);

  return (
    <>
      <div className="header_card">
        <div className="header_elements-right">
          <div>
            <Avatar sx={{ width: 50, height: 50 }} src="profile.png" />
          </div>
          <div className="new_task" style={{}}>
            {" "}
            {localStorage.getItem("userName")}
          </div>
        </div>
        <div className="header_elements-left">
          <span
            className="new_task"
            style={{ margin: "12px", fontSize: "20px", cursor: "pointer" }}
            onClick={logout}
          >
            Logout
          </span>
        </div>
      </div>
      <div className="newTask_card">
        <div className="newTask_label">You have no task.</div>
        <div className="button_display">
          <Button
            className="addTask_button"
            variant="contained"
            sx={{
              background: "#5285EC",
              textTransform: "none",
              borderRadius: '8px !important',
            }}
            onClick={handleClickOpen}
          >
            + New Task
          </Button>
        </div>
      </div>
      <AddTaskDialog open={open} onClose={handleClose} />
    </>
  );
}
