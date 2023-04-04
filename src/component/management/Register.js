import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import "dayjs/locale/ko";
import axiosClient from './../login/AxiosClient';

dayjs.locale("ko");

const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleBoxClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const [employee, setEmployee] = useState({
    user_id: "",
    employee_email: "",
    employee_name: "",
    role: "",
    birth: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleBirthdayChange = (value) => {
    const formattedValue = dayjs(value).format("YYYY-MM-DD");

    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      birth: formattedValue,
    }));
  };

  const registerClick = () => {
    const formData = new FormData();
    formData.append("file", file);

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

  return (
    <Grid container spacing={3}>
      <Grid item xs></Grid>
      <Grid item xs={6}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h1>사용자 등록</h1>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: 5 }}>
            <Grid item xs={6}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
                onClick={handleBoxClick}
              >
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Uploaded file"
                    width="100%"
                  />
                ) : (
                  "사진을 선택해 주세요"
                )}
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Table
                sx={{
                  [`& .${tableCellClasses.root}`]: {
                    borderBottom: "none",
                  },
                }}
              >
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <TextField
                        label="아이디"
                        variant="outlined"
                        name="user_id"
                        onChange={handleInputChange}
                        sx={{ width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <TextField
                        label="이메일"
                        variant="outlined"
                        name="employee_email"
                        onChange={handleInputChange}
                        sx={{ width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <TextField
                        label="이름"
                        variant="outlined"
                        name="employee_name"
                        onChange={handleInputChange}
                        sx={{ width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <FormControl fullWidth>
                        <InputLabel>직책</InputLabel>
                        <Select
                          value={employee.role}
                          label="role"
                          inputProps={{ name: "role" }}
                          onChange={handleInputChange}
                        >
                          <MenuItem value={"doctor"}>의사</MenuItem>
                          <MenuItem value={"rn"}>간호사</MenuItem>
                          <MenuItem value={"klpn"}>조무사</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="생년월일"
                          format="YYYY-MM-DD"
                          sx={{ width: "100%" }}
                          onChange={(value) => handleBirthdayChange(value)}
                        />
                      </LocalizationProvider>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: 2,
                }}
              >
                <Button variant="contained" onClick={registerClick}>
                  등록
                </Button>
                <Button variant="contained" color="error">
                  취소
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};

export default Register;
