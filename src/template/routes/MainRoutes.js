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
const Login = Loadable(
  lazy(() => import("../../component/login/Login"))
);

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
    {
      path: "login",
      element: <Login />,
    }
  ],
};

export default MainRoutes;
