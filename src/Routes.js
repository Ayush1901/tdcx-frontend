import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import AddNewTask from "./components/Task";
import TaskList from "./components/TaskList";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/addtask" element={<AddNewTask />} />
        <Route path="/task" element={<TaskList />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
