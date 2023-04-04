import { useRoutes } from 'react-router-dom';

import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import DidRoutes from './DidRoutes';

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, AuthenticationRoutes, DidRoutes]);
}
