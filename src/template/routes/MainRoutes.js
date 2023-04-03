import { lazy } from "react";

import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";

const ClinicView = Loadable(
  lazy(() => import("../../component/clinic/ClinicView"))
);
const Reservation = Loadable(
  lazy(() => import("../../component/reservation/Reservation"))
);
const Reception = Loadable(
  lazy(() => import("../../component/reception/Reception"))
);
const DidSetting = Loadable(
  lazy(() => import("../../component/did/DidSetting"))
);

const Management = Loadable(
  lazy(() => import("../../component/management/Management"))
);

const Register = Loadable(
  lazy(() => import("../../component/management/Register"))
);

const DID = Loadable(
  lazy(() => import("../../component/did/DID"))
)

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "clinic",
      element: <ClinicView />,
    },
    {
      path: "reservation",
      element: <Reservation />,
    },
    {
      path: "reception",
      element: <Reception />,
    },    
    {
      path: "view",
      element: <DID />,
    },
    {
      path: "did_setting",
      element: <DidSetting />,
    },
    {
      path: "management",
      element: <Management />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ],
};

export default MainRoutes;
