import React, { useEffect, useState } from "react";
import axios from "axios";

const AxiosContext = React.createContext("AxiosContext");
const AxiosClientContext = ({ children }) => {
  const [axiosClient, setAxiosClient] = useState(async () => {
    const instance = await axios.create({
      baseURL: "",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    instance.interceptors.request.use((request) => {
      const tokenPayload = JSON.parse(
        atob(localStorage.getItem("token").split(".")[1])
      );
      if (new Date(tokenPayload.exp * 1000) < new Date()) {
        const client_id = "client";
        const client_secret = "secret";
        const base64 = btoa(`${client_id}:${client_secret}}`);
        axios
          .post(`http://localhost:8081/oauth/token`, null, {
            params: {
              grant_type: "refresh_token",
              refresh_token: localStorage.getItem("refresh_token"),
            },
            headers: {
              Authorization: `Basic ${base64}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
          .then(({ data }) => {
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
          });
      }
      return request;
    });
    return instance;
  });

  return (
    <AxiosContext.Provider value={{ axiosClient, setAxiosClient }}>
      {children}
    </AxiosContext.Provider>
  );
};

export default AxiosClientContext;
