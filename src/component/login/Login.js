import { useState } from "react";
import { Grid, Paper, Box } from "@material-ui/core";
import { TextField, Button, Stack } from "@mui/material";
import axios from "axios";

const LoginImage = () => {
  return (
    <img
      src={`loginImage.png`}
      alt={`로그인 이미지`}
      loading="lazy"
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const grant_type = "password";
  const scope = "read";
  const client_id = "client";
  const client_secret = "secret";
  const base64 = window.btoa(`${client_id}:${client_secret}`);
  const params = new URLSearchParams({
    grant_type,
    ...loginForm,
    scope,
  });
  const headers = {
    Authorization: `Basic ${base64}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const login = () => {
    console.log(loginForm);
    axios
      .post(`http://localhost:8081/oauth/token`, null, {
        params,
        headers,
      })
      .then(({ data }) => {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        console.log(data);
        console.log(atob(data.access_token.split(".")[1]));
      });
  };
  return (
    <Paper
      component={Stack}
      direction="column"
      justifyContent="center"
      minHeight="100vh"
    >
      <TextField
        label="ID"
        variant="outlined"
        sx={{ width: "100%", marginTop: "10px" }}
        value={loginForm.username}
        onChange={(e) => {
          setLoginForm({ ...loginForm, username: e.target.value });
        }}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        sx={{ width: "100%", marginTop: "10px" }}
        value={loginForm.password}
        onChange={(e) => {
          setLoginForm({ ...loginForm, password: e.target.value });
        }}
      />
      <Button
        variant="contained"
        sx={{ width: "100%", marginTop: "10px" }}
        onClick={login}
      >
        로그인
      </Button>
    </Paper>
  );
};

const Login = () => {
  return (
    <Grid container>
      <Grid item xs={9}>
        <LoginImage />
      </Grid>
      <Grid item xs={3}>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default Login;
