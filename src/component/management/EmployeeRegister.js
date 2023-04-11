import { useNavigate } from "react-router";
import axios from "axios";
import EmployeeForm from "./EmployeeForm";
import axiosClient from "../login/AxiosClient";

const roleMapping = {
  ADMIN: "관리자",
  DOCTOR: "의사",
  RN: "간호사",
  KLPN: "간호조무사",
};

const EmployeeRegister = () => {
  const navigate = useNavigate();

  const buttonClick =
    ({ file, employee, setEmployee }) =>
    () => {
      createSecurityUser({ file, employee, setEmployee }).then((res) => {
        createEmployee(employee);
      });
    };

  const createEmployee = ({ file, employee, setEmployee }) => {
    const formData = new FormData();
    formData.append("file", file);
    setEmployee((prev) => ({ ...prev, role: roleMapping[prev.role] }));
    const info = new Blob([JSON.stringify(employee)], {
      type: "application/json",
    });

    formData.append("employee", info);

    axiosClient
      .post("/api/admin/employee", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data === true) {
          alert("등록 완료");
          setEmployee({
            user_id: "",
            employee_email: "",
            employee_name: "",
            role: "",
            birth: "",
          });
          navigate("/management");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createSecurityUser = (employee) => {
    return axios.post(
      "http://localhost:8081/user",
      {
        username: employee.user_id,
        password: employee.birth,
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
      title="사용자 등록"
      buttonName="등록"
      buttonClick={buttonClick}
      init={{
          user_id: "",
          employee_email: "",
          employee_name: "",
          role: "",
          birth: "",
          real_image: null,
        }}
    />
  );
};

export default EmployeeRegister;
