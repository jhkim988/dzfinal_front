import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import axiosClient from "../login/AxiosClient";
import EmployeeForm from "./EmployeeForm";

const roleMapping = {
  ADMIN: "관리자",
  DOCTOR: "의사",
  RN: "간호사",
  KLPN: "간호조무사",
};

const EmployeeUpdate = () => {
	const { state } = useLocation();
  const navigate = useNavigate();
	const [init, setInit] = useState({
		employee: {
			user_id: "",
			employee_email: "",
			employee_name: "",
			role: "",
			birth: "",
			file: null,
		}
	});
	console.log(state);
	useEffect(() => {
		axiosClient
			.get(`/api/admin/employee/${state.employ_id}`)
			.then((response) => {
				console.log("api/admin/employee", response.data);
				setInit({...response.data});
			})
			.catch((error) => {
				console.log(error);
			});
	}, [])
  const buttonClick =
    ({ file, employee, setEmployee }) =>
    () => {
      updateSecurityUser({ file, employee, setEmployee }).then((res) => {
        updateEmployee(employee);
      });
    };

  const updateEmployee = ({ file, employee, setEmployee }) => {
    const formData = new FormData();
    formData.append("file", file);
    setEmployee((prev) => ({ ...prev, role: roleMapping[prev.role] }));
    const info = new Blob([JSON.stringify(employee)], {
      type: "application/json",
    });

    formData.append("employee", info);

    axiosClient
      .put("/api/admin/employee", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data === true) {
          alert("수정 완료");
          navigate("/management");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateSecurityUser = (employee) => {
    return axios.put(
      "http://localhost:8081/user",
      {
        username: employee.user_id,
        password: employee.birth,
        authority: [employee.role],
      },
      {
				params: { employ_id: employee.employee_id},
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Basic ${btoa("client:secret")}`,
        },
      }
    );
  };

  return (
    <EmployeeForm
      title="사용자 수정"
			buttonName="수정"
			buttonClick={buttonClick}
			init={init}
		/>
  );
};

export default EmployeeUpdate;
