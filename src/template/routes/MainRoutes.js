import { lazy } from "react";

import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import AccessAllow from "./../../component/login/AccessAllow";

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

const Logout = Loadable(lazy(() => import("../../component/login/Logout")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "clinic",
      element: (
        <AccessAllow authorities={["DOCTOR", "RN", "KLPN"]}>
          <ClinicView />
        </AccessAllow>
      ),
    },
    {
      path: "reservation",
      element: (
        <AccessAllow authorities={["DOCTOR", "RN", "KLPN"]}>
          <Reservation />
        </AccessAllow>
      ),
    },
    {
      path: "reception",
      element: (
        <AccessAllow authorities={["DOCTOR", "RN", "KLPN"]}>
          <Reception />
        </AccessAllow>
      ),
    },
    // {
    //   path: "view",
    //   element: <DID />,
    // },
    {
      path: "did_setting",
      element: (
        <AccessAllow authorities={["DOCTOR", "RN", "KLPN", "ADMIN"]}>
          <DidSetting />
        </AccessAllow>
      ),
    },
    {
      path: "management",
      element: (
        <AccessAllow authorities={["ADMIN"]}>
          <Management />
        </AccessAllow>
      ),
    },
    {
      path: "register",
      element: (
        <AccessAllow authorities={["ADMIN"]}>
          <Register />
        </AccessAllow>
      ),
    },
    {
      path: "logout",
      element: <Logout />,
    },
  ],
};

export default MainRoutes;
