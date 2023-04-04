import { useEffect } from 'react';
import { useNavigate } from 'react-router';
const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('authorities');
        navigate('/');
    }, []);
}

export default Logout;