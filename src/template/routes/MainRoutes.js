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

const EmployeeRegister = Loadable(
  lazy(() => import("./../../component/management/EmployeeRegister"))
);

const EmployeeUpdate = Loadable(
  lazy(() => import("./../../component/management/EmployeeUpdate"))
);

const PwdChange = Loadable(lazy(() => import("../../component/pwd/PwdChange")));

const Logout = Loadable(lazy(() => import("../../component/login/Logout")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "clinic",
      element: (
        <AccessAllow authorities={["ADMIN", "DOCTOR", "RN", "KLPN"]}>
          <ClinicView />
        </AccessAllow>
      ),
    },
    {
      path: "reservation",
      element: (
        <AccessAllow authorities={["ADMIN", "DOCTOR", "RN", "KLPN"]}>
          <Reservation />
        </AccessAllow>
      ),
    },
    {
      path: "reception",
      element: (
        <AccessAllow authorities={["ADMIN", "DOCTOR", "RN", "KLPN"]}>
          <Reception />
        </AccessAllow>
      ),
    },
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
          <EmployeeRegister />
        </AccessAllow>
      ),
    },
    {
      path: "pwdchange",
      element: <PwdChange />,
    },
    {
      path: "employee_update_form",
      element: <EmployeeUpdate />,
    },
    {
      path: "logout",
      element: <Logout />,
    },
    {
      path: "pwdchange",
      element: <PwdChange />,
    },
  ],
};

export default MainRoutes;
