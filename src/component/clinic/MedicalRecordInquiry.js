import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Stack } from "@mui/system";
import axios from "axios";
import moment from "moment";

const MedicalRecordInquiry = ({ mri, setMedicalInfo }) => {
  // Select
  const [type, setType] = useState("");
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const onClick = (reception_id) => {
    axios
      .get(`/api/clinic/medicalinfo/${reception_id}`)
      .then((response) => {
        setMedicalInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = () => {
    axios
      .get(`/api/clinic/medicalsearch`)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleDateRangeChange = (start, end) => {
    console.log(start, end);
    console.log(moment(start).format("YYYY-MM-DD HH:mm:ss"));
    console.log(moment(end).format("YYYY-MM-DD HH:mm:ss"));
  };

  return (
    <Paper sx={{ height: "45vh" }} elevation={3}>
      <Box>진료기록조회</Box>
      <Box sx={{ display: "flex" }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>분류</InputLabel>
          <Select value={type} onChange={handleChange}>
            <MenuItem value={"patient_name"}>환자이름</MenuItem>
            <MenuItem value={"reception_id"}>접수번호</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateRangePicker"]}>
            <DateRangePicker
              value={selectedDateRange}
              onChange={handleDateRangeChange}
              localeText={{ start: "기간 시작", end: "기간 끝" }}
              format="YYYY-MM-DD"
            />
          </DemoContainer>
        </LocalizationProvider>
        <TextField label="검색어" sx={{ alignSelf: "center" }} />
        <Button
          variant="contained"
          sx={{ height: "40px", alignSelf: "center" }}
          onClick={onSubmit()}
        >
          검색
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">이름</TableCell>
                <TableCell align="center">담당의</TableCell>
                <TableCell align="center">진단명</TableCell>
                <TableCell align="center">처방약</TableCell>
                <TableCell align="center">진단날짜</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mri.map((row) => (
                <TableRow
                  key={row.reception_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => onClick(row.reception_id)}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.patient_name}
                  </TableCell>
                  <TableCell align="center">{row.employee_name}</TableCell>
                  <TableCell align="center">
                    {row.diagnosisList.length > 0 &&
                      row.diagnosisList[0].disease_name}
                    {row.diagnosisList.length > 1 &&
                      ` 외${row.diagnosisList.length - 1}`}
                  </TableCell>
                  <TableCell align="center">
                    {row.prescriptionList.length > 0 &&
                      row.prescriptionList[0].drug_name}
                    {row.prescriptionList.length > 1 &&
                      ` 외${row.prescriptionList.length - 1}`}
                  </TableCell>
                  <TableCell align="center">
                    {row.created_at.substring(0, 10)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={2}>
          <Pagination count={10} />
        </Stack>
      </Box>
    </Paper>
  );
};

export default MedicalRecordInquiry;
