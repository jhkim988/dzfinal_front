import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const isIntersection = (arr1, arr2) => {
    return arr1.some((v) => arr2.includes(v));
};

const check_token = () => {
    const client_id = "client";
    const client_secret = "secret";
    const { access_token } = JSON.parse(localStorage.getItem("auth"));
    return axios.post(`http://localhost:8081/oauth/check_token`, null, {
        params: {token: access_token},
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Basic ${btoa(`${client_id}:${client_secret}`)}`
        }
    });
}

const AccessAllow = ({ authorities, children }) => {
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const back = () => {
    }

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!auth) {
            back();
            setIsChecked(false);
        } else if (isIntersection(auth.authorities, authorities)) {
            check_token().then(() => {
                setIsChecked(true);
            }).catch(err => {
                back();
                setIsChecked(false);
            });
        } else {
            back();
            setIsChecked(false);
        }
    }, [authorities]);
    return <>{isChecked ? children : <></>}</>
}

export default AccessAllow;