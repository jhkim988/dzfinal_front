import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Stack } from "@mui/system";
import axios from "axios";
import dayjs from "dayjs";
import koLocale from "dayjs/locale/ko";

const MedicalRecordInquiry = ({ mri, setMri, setMode, setMedicalInfo }) => {
  const [type, setType] = useState("");
  const handleChange = (e) => {
    setType(e.target.value);
  };

  const onClick = (reception_id) => {
    setMode(0);
    setMedicalInfo({});

    axios
      .get(`/api/clinic/medicalinfo/${reception_id}`)
      .then((response) => {
        setMedicalInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [selectedDates, setSelectedDates] = useState({
    start: dayjs(),
    end: dayjs(),
  });

  const handleDateChange = (dates) => {
    setSelectedDates({
      start: dates[0],
      end: dates[1],
    });
  };

  const formattedDates = {
    start: selectedDates.start.format("YYYY-MM-DD"),
    end: selectedDates.end.format("YYYY-MM-DD"),
  };

  const [keyword, setKeyword] = useState("");
  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const onSearchList = () => {
    if (!type) return alert("분류를 정해주세요");

    console.log(formattedDates.start + "/" + formattedDates.end);

    axios
      .post(
        "/api/clinic/mri/search",
        {
          type: type,
          start: formattedDates?.start || "",
          end: formattedDates?.end || "",
          keyword: keyword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setMri(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleToggle(false);
  }, []);

  useEffect(() => {
    handleToggle(true);
  }, [selectedDates]);

  const handleToggle = (isOpen) => {
    let intervalId = null;
    if (isOpen) {
      intervalId = setInterval(() => {
        const dateRangePickerRoot = document.querySelector(
          ".css-e47596-MuiDateRangeCalendar-root"
        );
        if (dateRangePickerRoot) {
          const firstDiv =
            dateRangePickerRoot.querySelector("div:first-of-type");
          firstDiv.style.opacity = 0;
          clearInterval(intervalId);
        }
      }, 100);
    } else {
      clearInterval(intervalId);
      const dateRangePickerRoot = document.querySelector(
        ".css-e47596-MuiDateRangeCalendar-root"
      );
      if (dateRangePickerRoot) {
        const firstDiv = dateRangePickerRoot.querySelector("div:first-of-type");
        firstDiv.style.opacity = 1;
      }
    }
  };

  return (
    <>
      <Typography variant="subtitle2" sx={{ marginLeft: 2 }}>
        진료기록조회
      </Typography>
      {/* alignItems: "flex-end" */}
      <Box sx={{ m: 1, display: "flex", alignItems: "flex-end" }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>분류</InputLabel>
          <Select value={type} label="분류" onChange={handleChange}>
            <MenuItem value={"patient_name"}>환자이름</MenuItem>
            <MenuItem value={"reception_id"}>접수번호</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={koLocale}>
          <DemoContainer components={["DateRangePicker"]}>
            <DateRangePicker
              localeText={{ start: "기간 시작", end: "기간 끝" }}
              format="YYYY-MM-DD"
              value={[dayjs(selectedDates.start), dayjs(selectedDates.end)]}
              onToggle={handleToggle}
              onChange={handleDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>
        <TextField
          label="검색어"
          sx={{ alignSelf: "flex-end" }}
          onChange={handleInputChange}
        />
        <Box sx={{ alignSelf: "center" }}>
          <Button
            variant="contained"
            sx={{ height: "40px", alignSelf: "center" }}
            onClick={onSearchList}
          >
            검색
          </Button>
        </Box>
      </Box>
      <Box sx={{ m: 1, marginTop: 2 }}>
        <TableContainer>
          <Table
            sx={{
              minWidth: 650,
              "& td": { padding: 0 },
              "& th": { padding: 0, fontWeight: "bold" },
            }}
            size="small"
          >
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
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: "#90caf9 !important",
                    },
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  onClick={() => onClick(row.reception_id)}
                >
                  <TableCell scope="row" align="center">
                    {row.patient_name}
                  </TableCell>
                  <TableCell align="center">{row.employee_name}</TableCell>
                  <TableCell align="center">
                    {row.diagnosisList.length > 0 &&
                      `[${
                        row.diagnosisList[0].disease_code
                      }]${row.diagnosisList[0].disease_name.substring(
                        0,
                        5
                      )}...`}
                    {row.diagnosisList.length > 1 &&
                      ` 외${row.diagnosisList.length - 1}`}
                  </TableCell>
                  <TableCell align="center">
                    {row.prescriptionList.length > 0 &&
                      `[${
                        row.prescriptionList[0].drug_code
                      }]${row.prescriptionList[0].drug_name.substring(
                        0,
                        5
                      )}...`}
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
    </>
  );
};

export default MedicalRecordInquiry;
