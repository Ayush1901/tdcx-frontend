import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import AddTaskDialog from "../NewTask/index";
import EditTaskDialog from "./EditTaskDialog";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import TaskListCompletion from "../Charts";
import "./index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddNewTask from "../Task";
import { InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CircleIcon from "@mui/icons-material/Circle";
import ListItemIcon from "@mui/material/ListItemIcon";

const rootGridStyle = {
  marginTop: "25px !important",
  flexGrow: 1,
};

const muiPaperRootStyle = {
  borderRadius: "15px !important",
  boxShadow:
    "0px 1px 15px 3px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important",
  height: "170px !important",
  width: "280px !important",
  overflowY: "auto",
  backgroundColor: (theme) =>
    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
};

const muiPaperCardStyle = {
  borderRadius: "15px !important",
  boxShadow:
    "0px 1px 15px 3px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important",
  marginTop: "-25px !important",
  overflowY: "auto",
  height: "300px !important",
  width: "900px !important",
  backgroundColor: (theme) =>
    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function TaskList() {
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [taskList, setTaskList] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [editDetails, setEditDetails] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const baseUrl = `${process.env.REACT_APP_URL}/tasks/getByUser`;
    axios
      .post(`${baseUrl}`, { userId: localStorage.getItem("userId") })
      .then((response) => {
        setTaskList(response?.data?.tasks);

        const count = response?.data?.tasks.filter(
          (obj) => obj.isComplete === 1
        ).length;
        setCount(count);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    navigate("/task");
    navigate(0);
  };

  const handleEditClickOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = (value) => {
    setEditOpen(false);
    navigate("/task");
    navigate(0);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const deleteTask = (taskId) => {
    const deleteURL = `${process.env.REACT_APP_URL}/tasks/delete`;
    axios.delete(`${deleteURL}/${taskId}`).then((response) => {
      navigate("/task");
      navigate(0);
    });
  };

  const handleEdit = (taskId) => {
    const editURL = `${process.env.REACT_APP_URL}/tasks/get`;
    axios.get(`${editURL}/${taskId}`).then((response) => {
      setEditDetails(response.data.task);
      console.log(response.data.task);
      handleEditClickOpen();
    });
  };

  const handleComplete = (taskId) => {
    const updateURL = `${process.env.REACT_APP_URL}/tasks/update`;
    axios
      .patch(`${updateURL}/${taskId}`, {
        isComplete: 1,
      })
      .then((response) => {
        navigate(0);
      });
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);
    const baseSearchURL = `${process.env.REACT_APP_URL}/tasks/search`;

    event.currentTarget.value !== ""
      ? axios
          .get(`${baseSearchURL}/${event.currentTarget.value}`)
          .then((response) => {
            setTaskList(response?.data?.tasks);
          })
          .catch((error) => {
            alert(error.message);
          })
      : axios
          .post(`${process.env.REACT_APP_URL}/tasks/getByUser`, {
            userId: localStorage.getItem("userId"),
          })
          .then((response) => {
            setTaskList(response?.data?.tasks);

            const isComplete = 1;
            const count = taskList.filter(
              (obj) => obj.isComplete === isComplete
            ).length;
            setCount(count);
          });
  };

  return (
    <>
      {taskList.length > 0 ? (
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
          <Grid sx={rootGridStyle} container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={3}>
                <Grid item>
                  <Paper sx={muiPaperRootStyle}>
                    <div className="paper_div">
                      <div className="task_title">Tasks Completed</div>
                      <div>
                        <span style={{ fontSize: "65px", color: "#0043ffa3" }}>
                          {count}
                        </span>
                        <span style={{ fontSize: "25px", color: "#537178" }}>
                          /
                        </span>
                        <span style={{ fontSize: "25px", color: "#537178" }}>
                          {taskList.length}
                        </span>
                      </div>
                    </div>
                  </Paper>
                </Grid>

                <Grid item>
                  <Paper sx={muiPaperRootStyle}>
                    <div className="paper_div">
                      <div className="task_title">Latest Created Tasks</div>
                      <div className="taskname_div">
                        <List>
                          {taskList.map((item) => {
                            return (
                              <ListItem disablePadding>
                                <ListItemIcon>
                                  <CircleIcon
                                    style={{ transform: "scale(0.4)" }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  className={
                                    item.isComplete === 1
                                      ? "textstyle_list_card"
                                      : "textlist_normal"
                                  }
                                >
                                  {item.taskName}
                                </ListItemText>
                              </ListItem>
                            );
                          })}
                        </List>
                      </div>
                    </div>
                  </Paper>
                </Grid>

                <Grid item>
                  <Paper sx={muiPaperRootStyle}>
                    <div className="paper_div">
                      <TaskListCompletion className="chart_list" />
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <div className="search_div">
            <div className="font_list">Tasks</div>
            <div
              style={{
                display: "flex",
                width: "70%",
                justifyContent: "flex-end",
              }}
            >
              <TextField
                className="login_TF_list"
                id="outlined-basic"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
                variant="standard"
                onChange={handleChange}
                value={keyword}
              />

              <div className="button_display_list">
                <Button
                  className="addTask_button_list"
                  variant="contained"
                  onClick={handleClickOpen}
                  sx={{
                    background: "#5285EC",
                    textTransform: "none",
                    borderRadius: "8px !important",
                  }}
                >
                  + New Task
                </Button>
              </div>
              <AddTaskDialog open={open} onClose={handleClose} />
            </div>
          </div>

          <Grid sx={rootGridStyle} container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={12}>
                <Grid item>
                  <Paper sx={muiPaperCardStyle}>
                    {taskList.map((item) => {
                      return (
                        <>
                          <div style={{ display: "flex", padding: "15px" }}>
                            <div style={{ width: "50%" }}>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      onClick={() => handleComplete(item._id)}
                                      defaultChecked={
                                        item.isComplete === 1 ? true : false
                                      }
                                    />
                                  }
                                  label={
                                    <div
                                      className={
                                        item.isComplete === 1
                                          ? "textstyle_list tasklist_div"
                                          : "tasklist_div"
                                      }
                                    >
                                      {item.taskName}
                                    </div>
                                  }
                                />
                              </FormGroup>
                            </div>
                            <div
                              style={{
                                width: "50%",
                                textAlign: "right",
                                marginTop: "5px",
                              }}
                            >
                              <ModeEditIcon
                                style={{
                                  color: "grey",
                                  margin: "5px",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleEdit(item._id)}
                              />

                              <DeleteIcon
                                style={{
                                  color: "grey",
                                  margin: "5px",
                                  cursor: "pointer",
                                }}
                                onClick={() => deleteTask(item._id)}
                              />
                            </div>
                          </div>
                          <Divider variant="middle" />
                        </>
                      );
                    })}
                    <EditTaskDialog
                      editDetails={editDetails}
                      open={editOpen}
                      onClose={handleEditClose}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <AddNewTask />
      )}
    </>
  );
}
