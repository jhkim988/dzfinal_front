import React, { useEffect, useState } from "react";
import axiosClient from "../login/AxiosClient";

export const DataContext = React.createContext();

const DataContextProvider = ({ children }) => {
  const [doctorData, setDoctorData] = useState([
    { employ_id: 1, employee_name: "김더존", color: "F29D94" },
    { employ_id: 2, employee_name: "이을지", color: "BEDEF3" },
  ]);
  useEffect(() => {
    axiosClient.get("/api/employee/doctor/list").then(({ data }) => {
      setDoctorData(data);
    });
  }, []);

  return (
    <DataContext.Provider value={doctorData}>{children}</DataContext.Provider>
  );
};

export default DataContextProvider;
