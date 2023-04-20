import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import axiosClient from "../login/AxiosClient";
import EmployeeForm from "./EmployeeForm";
import { AUTHIP } from "../login/AccessAllow";

const roleMapping = {
  ADMIN: "관리자",
  DOCTOR: "의사",
  RN: "간호사",
  KLPN: "간호조무사",
};

const role2code = {
  "의사": "DOCTOR",
  "간호사": "RN",
  "간호조무사": "KLPN",
  "관리자":"ADMIN"
}

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
				setInit({...response.data, role: role2code[response.data.role]});
			})
			.catch((error) => {
				console.log(error);
			});
	}, [])
  const buttonClick =
    ({ file, employee, setEmployee }) =>
    () => {
      console.log(file, employee);
      updateSecurityUser(employee).then((res) => {
        updateEmployee({ file, employee, setEmployee});
      });
    };

  const updateEmployee = ({ file, employee, setEmployee }) => {
    console.log(file, employee);
    const formData = new FormData();
    formData.append("file", file);
    const info = new Blob([JSON.stringify({...employee, role: roleMapping[employee.role]})], {
      type: "application/json",
    });

    formData.append("employee", info);

    axiosClient
      .put(`/api/admin/employee/${employee.employ_id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
          alert("수정 완료");
          navigate("/management");
      });
      console.log("axiosClient After");
  };

  const updateSecurityUser = (employee) => {
    return axios.put(
      `${AUTHIP}/user/${employee.user_id}`,
      {
        authority: [employee.role],
      },
      {
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
