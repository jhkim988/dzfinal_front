import axios from "axios";
import { getLoginUserInfo } from "./Login";

const auth = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : {};

const axiosClient = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: `Bearer ${auth?.access_token}`,
  },
});

axiosClient.interceptors.request.use((request) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const tokenPayload = JSON.parse(
    atob(auth.access_token.split(".")[1])
  );
  if (new Date(tokenPayload.exp * 1000) < new Date()) {
    const client_id = "client";
    const client_secret = "secret";
    const base64 = btoa(`${client_id}:${client_secret}`);
    axios
      .post(`http://localhost:8081/oauth/token`, null, {
        params: {
          grant_type: "refresh_token",
          refresh_token: auth.refresh_token,
        },
        headers: {
          Authorization: `Basic ${base64}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(({ data }) => {
        localStorage.setItem("auth", JSON.stringify({ ...auth, ...data }));
        getLoginUserInfo();
      });
  }
  return request;
});
export default axiosClient;
