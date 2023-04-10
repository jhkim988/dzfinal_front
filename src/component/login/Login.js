import { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { TextField, Button, Stack } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosClient from "./AxiosClient";

const LoginImage = () => {
  return (
    <img
      src={`loginImage2.png`}
      alt={`로그인 이미지`}
      loading="lazy"
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

export const getLoginUserInfo = (callback) => {
  const { user_id } = JSON.parse(localStorage.getItem("auth"));
  axiosClient.get(`/api/employee/${user_id}`).then(({ data }) => {
    console.log(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    callback && callback();
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

  const login = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8081/oauth/token`, null, {
        params,
        headers,
      })
      .then(({ data }) => {
        const { user_name, authorities } = JSON.parse(
          atob(data.access_token.split(".")[1])
        );
        const auth = {
          ...data,
          user_id: user_name,
          authorities: authorities,
        };
        localStorage.setItem("auth", JSON.stringify(auth));
        axiosClient.defaults.headers[
          "Authorization"
        ] = `Bearer ${auth.access_token}`;
        getLoginUserInfo(() => {
          const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          console.log(userInfo);
          movePageWithAuthority(auth.authorities);
        });
      });
  };

  const navi = useNavigate();
  const movePageWithAuthority = (authority) => {
    if (authority.includes("ADMIN")) {
      navi("/management");
    } else if (authority.includes("DOCTOR")) {
      navi("/clinic");
    } else if (authority.includes("KLPN") || authority.includes("RN")) {
      navi("/reception");
    }
  };

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.access_token) {
      getLoginUserInfo(() => {
        movePageWithAuthority(auth.authorities);
      });
    }
  }, []);

  const style = {
    width: "80%", 
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "20px"
  }

  return (
    <Paper
      component={Stack}
      direction="column"
      minHeight="100vh"
      justifyContent="center"
    >
      <form onSubmit={login}>
          <TextField
            sx={style}
            label="ID"
            variant="outlined"
            value={loginForm.username}
            onChange={(e) => {
              setLoginForm({ ...loginForm, username: e.target.value });
            }}
          />
          <TextField
            sx={style}
            label="Password"
            variant="outlined"
            type="password"
            value={loginForm.password}
            onChange={(e) => {
              setLoginForm({ ...loginForm, password: e.target.value });
            }}
          />
        <Button
          type="submit"
          variant="contained"
          sx={style}
        >
          로그인
        </Button>
      </form>
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
