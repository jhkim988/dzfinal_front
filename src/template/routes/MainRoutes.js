import { lazy } from "react";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";

// const Clinic = Loadable(lazy(() => import("../../component/clinic/Clinic")));
const Reception = Loadable(lazy(() => import('../../components/Reception')));
// const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons')));

// // sample page routing
// const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    // {
    //   path: "clinic",
    //   element: <Clinic />,
    // },
    {
      path: "reception",
      element: <Reception />,
    },
  ],
};

export default MainRoutes;
