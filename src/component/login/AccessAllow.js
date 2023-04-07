import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from './AxiosClient';

const isIntersection = (arr1, arr2) => {
    return arr1.some((v) => arr2.includes(v));
};

const check_token = () => {
    const client_id = "client";
    const client_secret = "secret";
    const { access_token } = JSON.parse(localStorage.getItem("auth"));
    axiosClient.post(`http://localhost:8081/oauth/check_token`, {
        param: {
            token: access_token
        }
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${client_id}:${client_secret}`)}}`
        }
    }).then(res => {
        console.log(res);
    });
}

const AccessAllow = ({ authorities, children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log("auth: ", auth, "userInfo: ", userInfo);
        if (!auth || !isIntersection(auth.authorities, authorities)) {
            navigate(-1);
            alert("접근 권한이 없습니다.");
        }
    }, []);
    return <>{children}</>
}

export default AccessAllow;