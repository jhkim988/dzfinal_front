import { lazy } from 'react';

// project imports
import Loadable from '../ui-component/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

const DID = Loadable(lazy(() => import('../../component/did/DID')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const DidRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/view',
            element: <DID />
        }
    ]
};

export default DidRoutes;