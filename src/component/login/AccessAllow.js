import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { refreshAccessToken } from "./AxiosClient";
import { getLoginUserInfo } from './Login';

const isIntersection = (arr1, arr2) => {
  return arr1.some((v) => arr2.includes(v));
};

const check_token = () => {
  const client_id = "client";
  const client_secret = "secret";
  let auth = JSON.parse(localStorage.getItem("auth"));
  return axios
  .post(`http://localhost:8081/oauth/check_token`, null, {
    params: { token: auth.access_token },
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
    },
  });
}

const AccessAllow = ({ authorities, children }) => {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
    alert("권한이 없습니다.");
  };

    const auth = JSON.parse(localStorage.getItem("auth"));
    console.log(auth.authorities, authorities);
    if (!auth) {
      back();
      return null;
    } else if (isIntersection(auth.authorities, authorities)) {
      const access_token_obj = JSON.parse(atob(auth.access_token.split(".")[1]));
      if (access_token_obj.exp * 1000 < new Date().getTime()) {
        refreshAccessToken().then(({ data }) => {
          localStorage.setItem("auth", JSON.stringify({ ...auth, ...data }));
          getLoginUserInfo();
          check_token().then((response) => {

          }).catch(error => {
            back();
            return null;
          });
        });
      } else {
        check_token().then((response) => {

        }).catch(error => {
          back();
          return null;
        });  
      }
    } else {
      back();
      return null;
    }
  return <>{children}</>;
};

export default AccessAllow;
