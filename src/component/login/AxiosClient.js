import axios from "axios";

const auth = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : {};

const axiosClient = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: `Bearer ${auth?.token}`,
  },
});

axiosClient.interceptors.request.use((request) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const tokenPayload = JSON.parse(
    atob(auth.token.split(".")[1])
  );
  if (new Date(tokenPayload.exp * 1000) < new Date()) {
    const client_id = "client";
    const client_secret = "secret";
    const base64 = btoa(`${client_id}:${client_secret}}`);
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
        auth.token = data.access_token;
        auth.refresh_token = data.refresh_token;
        localStorage.setItem("auth", JSON.stringify(auth));
      });
  }
  return request;
});
export default axiosClient;
