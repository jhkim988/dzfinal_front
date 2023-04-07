import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const isIntersection = (arr1, arr2) => {
    return arr1.some((v) => arr2.includes(v));
};

const AccessAllow = ({ authorities }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        console.log(auth);
        if (!auth || !isIntersection(auth.authorities, authorities)) {
            navigate(-1);
            alert("접근 권한이 없습니다.");
        }
    }, []);
    return <></>
}

export default AccessAllow;