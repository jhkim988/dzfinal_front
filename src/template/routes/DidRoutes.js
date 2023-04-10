import { lazy } from 'react';

// project imports
import Loadable from '../ui-component/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

const MultiDID = Loadable(lazy(() => import('../../component/did/MultiDID')));
const BigDID = Loadable(lazy(() => import('../../component/did/BigDID')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const DidRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/view',
            element: <MultiDID />
        },
        {
            path: '/big_did',
            element: <BigDID />
        },
    ]
};

export default DidRoutes;