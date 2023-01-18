import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./LoginPage.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const Login = () => {
    const baseURL = `${process.env.REACT_APP_URL}/users/login`;
    axios
      .post(`${baseURL}`, {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("userName", response.data.message[0].name);
        localStorage.setItem("userId", response.data.message[0]._id);
        navigate("/task");
      });
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const getData = () => {
    fetch("login.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
      });
  };

  const refreshPage = () => {
    if (localStorage.getItem("userId")) {
      navigate(0);
    }
  };

  useEffect(() => {
    getData();
    return () => refreshPage();
  }, []);

  return (
    <div className="login_element">
      <div
        style={{
          margin: "5px",
          fontSize: "20px",
          fontFamily: "sans-serif",
          color: "#537178",
        }}
      >
        Login
      </div>
      <div>
        <TextField
          className="login_TF"
          id="outlined-basic"
          label="Email"
          variant="standard"
          autoComplete="off"
          onChange={handleEmail}
          type="text"
          value={email}
          name="email"
          InputProps={{
            disableUnderline: true,
          }}
          InputLabelProps={{
            style: { paddingLeft: "15px",color:"#7A7D7E",opacity:"100%"}
          }}
          sx={{borderRadius: '8px !important', opacity: 1,height:"45px",paddingLeft:"10px"}}
        />
      </div>
      <div>
        <TextField
          className="login_TF"
          id="outlined-basic"
          label="Password"
          variant="standard"
          autoComplete="off"
          onChange={handlePassword}
          type="password"
          value={password}
          name="password"
          InputProps={{
            disableUnderline: true,
          }}
          InputLabelProps={{
            style: { paddingLeft: "15px",color:"#7A7D7E",opacity:"100%"}
          }}
          sx={{borderRadius: '8px !important', opacity: 1,height:"45px",paddingLeft:"10px"}}
        />
      </div>
      <div>
        <Button className="login_Button" variant="contained" sx={{borderRadius: '8px !important', opacity: 1,textTransform: "none",backgroundColor:'#5285EC'}} onClick={Login}>
          Login
        </Button>
      </div>
    </div>
  );
}
