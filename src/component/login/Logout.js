import { useEffect } from 'react';
import { useNavigate } from 'react-router';
const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('auth');
        navigate('/login');
    }, []);
}

export default Logout;