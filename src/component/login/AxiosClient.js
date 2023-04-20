import axios from "axios";
import { getLoginUserInfo } from "./Login";
import { AUTHIP } from "./AccessAllow";

export const refreshAccessToken = () => {
  const client_id = "client";
  const client_secret = "secret";
  const base64 = btoa(`${client_id}:${client_secret}`);
  return axios
    .post(`${AUTHIP}/oauth/check_token`, null, {
      params: {
        grant_type: "refresh_token",
        refresh_token: auth.refresh_token,
      },
      headers: {
        Authorization: `Basic ${base64}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
}

const auth = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : {};

const axiosClient = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: `Bearer ${auth?.access_token}`,
  },
});

axiosClient.interceptors.request.use((request) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const tokenPayload = JSON.parse(atob(auth.access_token.split(".")[1]));
  if (new Date(tokenPayload.exp * 1000) < new Date()) {
    refreshAccessToken()
    .then(({ data }) => {
      localStorage.setItem("auth", JSON.stringify({ ...auth, ...data }));
      getLoginUserInfo();
    });
  }
  return request;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response.status === 401 || err.response.status === 403) {
      if (err.response.data.error_description.startsWith("Access token expired")) {
        refreshAccessToken()
          .then(({ data }) => {
            localStorage.setItem("auth", JSON.stringify({ ...auth, ...data }));
            window.location.reload();
          });
      } else {
        alert("권한이 없습니다.");
      }
    }
    return err;
  }
);
export default axiosClient;
