import { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { TextField, Button, Stack } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import axiosClient from './AxiosClient';

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

export const getLoginUserInfo = () => {
  const user_id = localStorage.getItem("user_id");
  axiosClient.get(`/api/employee/${user_id}`).then(({ data }) => {
    localStorage.setItem("userInfo", data);
  });
};

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const client_id = "client";
  const client_secret = "secret";
  const base64 = window.btoa(`${client_id}:${client_secret}`);
  const params = new URLSearchParams({
    grant_type: "password",
    ...loginForm,
    scope: "read",
  });

  const headers = {
    Authorization: `Basic ${base64}`,
    "Content-Type": "application/json;charset=UTF-8",
  };

  const login = () => {
    axios
      .post(`http://localhost:8081/oauth/token`, null, {
        params,
        headers,
      })
      .then(({ data }) => {
        const { user_name, authorities } = JSON.parse(atob(data.access_token.split(".")[1]));
        const auth = {
          token: data.access_token,
          refresh_token: data.refresh_token,
          user_id: data.user_name,
          authorities: data.authorities,
        }
        localStorage.setItem("auth", JSON.stringify(auth));
        axiosClient.defaults.headers["Authorization"] = `Bearer ${auth.token}`;
        getLoginUserInfo();
        movePageWithAuthority(authorities);
      });
  };

  const navi = useNavigate();
  const movePageWithAuthority = (authority) => {
    if (authority.includes("ADMIN")) {
      navi("/management");
    } else if (authority.includes("DOCTOR")) {
      navi("/clinic");
    } else if (authority.includes("KLPN") || authority.includes("ROLE_RN")) {
      navi("/reception");
    }
  }
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.token) {
      getLoginUserInfo();
      const authority = localStorage.getItem("authorities");
      movePageWithAuthority(authority);
    }
  }, []);

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
        sx={{
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "10px",
        }}
        value={loginForm.username}
        onChange={(e) => {
          setLoginForm({ ...loginForm, username: e.target.value });
        }}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        sx={{
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "10px",
        }}
        value={loginForm.password}
        onChange={(e) => {
          setLoginForm({ ...loginForm, password: e.target.value });
        }}
      />
      <Button
        variant="contained"
        sx={{
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "10px",
        }}
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
