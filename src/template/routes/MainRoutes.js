import { lazy } from "react";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";


// dashboard routing
const ClinicView = Loadable(lazy(() => import("../../component/clinic/ClinicView")));
const Reservation = Loadable(lazy(() => import("../../component/reservation/Reservation")))
const Reception = Loadable(lazy(() => import('../../component/reception/Reception')));
const DID_Setting = Loadable(lazy(() => import('../../component/did/DID_Setting')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('../views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons')));

// // sample page routing
// const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: "clinic",
      element: <ClinicView />,
    },
    {
      path: "reservation",
      element: <Reservation />
    },
    {
      path: "reception",
      element: <Reception />,
    },
    {
      path: "did_setting",
      element: <DID_Setting />,
    }
  ]
};

export default MainRoutes;