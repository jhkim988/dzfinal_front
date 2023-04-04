import { useState, useEffect, useContext } from "react";
import { Grid, Paper } from "@material-ui/core";
import { TextField, Button, Stack } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AxiosClientContext from './AxiosClient';

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
  const { axiosClient } = useContext(AxiosClientContext);
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
    console.log(loginForm);
    axios
      .post(`http://localhost:8081/oauth/token`, null, {
        params,
        headers,
      })
      .then(({ data }) => {
        console.log(data);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        console.log(atob(data.access_token.split(".")[1]));
        const { user_name, authorities } = JSON.parse(atob(data.access_token.split(".")[1]));
        localStorage.setItem("user_id", user_name);
        localStorage.setItem("authorities", authorities);
        getLoginUserInfo(user_name);
      });
  };

  const getLoginUserInfo = () => {
    const user_id = localStorage.getItem("user_id");
    axiosClient.get(`/api/employee/${user_id}`).then(({ data }) => {
      console.log(data);
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
    const token = localStorage.getItem("token");
    if (token) {
      getLoginUserInfo();
      const authority = localStorage.getItem("authorities");
      console.log(token, authority);
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
