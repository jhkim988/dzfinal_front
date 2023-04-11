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
import React, { useEffect } from "react";
import { useState } from "react";
import "dayjs/locale/ko";

dayjs.locale("ko");

const role2code = {
  "의사": "DOCTOR",
  "간호사": "RN",
  "간호조무사": "KLPN",
  "관리자":"ADMIN"
}

const EmployeeForm = ({ title, buttonName, buttonClick, init }) => {
  const [file, setFile] = useState(null);

  const handleBoxClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    if (!event.target.files[0]) return;
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  const [employee, setEmployee] = useState({
    user_id: "",
    employee_email: "",
    employee_name: "",
    role: "",
    birth: "",
  });
  useEffect(() => {
    setEmployee(init);
    init.real_image && setFile(`/api/admin/getimage?real_image=${init.real_image}`);
  }, [init])
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

  const onReset = () => {
    setFile(null);
    setEmployee({
      user_id: "",
      employee_email: "",
      employee_name: "",
      role: null,
      birth: "",
    })
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs></Grid>
      <Grid item xs={6}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h1>{title}</h1>
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
                    src={file}
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
                        value={employee.user_id}
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
                        value={employee.employee_email}
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
                        value={employee.employee_name}
                        sx={{ width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <FormControl fullWidth>
                        <InputLabel>직책</InputLabel>
                        <Select
                          value={role2code[employee.role] || ""}
                          label="role"
                          inputProps={{ name: "role" }}
                          onChange={handleInputChange}
                        >
                          <MenuItem value={"DOCTOR"}>의사</MenuItem>
                          <MenuItem value={"RN"}>간호사</MenuItem>
                          <MenuItem value={"KLPN"}>조무사</MenuItem>
                          <MenuItem value={"ADMIN"}>관리자</MenuItem>
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
                          value={dayjs(employee.birth)}
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
                <Button variant="contained" onClick={buttonClick({ file, employee, setEmployee })}>
                  {buttonName}
                </Button>
                <Button variant="contained" color="error" onClick={onReset}>
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

export default EmployeeForm;
