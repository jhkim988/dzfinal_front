import { useEffect } from 'react';
import { useNavigate } from 'react-router';
const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('auth');
        localStorage.removeItem('userInfo');
        navigate('/login');
    }, []);
}

export default Logout;