import * as React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { Select, Box, FormControl, Button, Checkbox, FormControlLabel, FormGroup, InputLabel, makeStyles, MenuItem, Paper, TextareaAutosize, TextField } from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Stack } from "@mui/system";


const ReceptionList = ({user}) => {
  const [receiptList, setReceiptList] = useState([]);

  useEffect(() => {
    axios.get("/api/receipt/getReceipt")
     .then((response) => {
        setReceiptList(response.data);
     })
     .catch((error) => {
        console.log(error);
     })
  }, [])
  
  const [type, setType] = useState("");
  const handleChange = (event) => {
    setType(event.target.value);
  };


  return (
    <Paper sx={{ height: "45vh" }}>
      <Box>진료기록조회</Box>
      <Box sx={{ display: "flex" }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel>분류</InputLabel>
          <Select value={type} onChange={handleChange}>
            <MenuItem value={"patient_name"}>환자이름</MenuItem>
            <MenuItem value={"reception_id"}>접수번호</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateRangePicker"]}>
            <DateRangePicker
              localeText={{ start: "기간 시작", end: "기간 끝" }}
              format="YYYY-MM-DD"
              sx={{
                "& .MuiTextField-root": { width: "130px" },
                "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                  paddingLeft: "10px",
                },
                "& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root": {
                  height: "40px",
                },
                "& .css-ctjfle-MuiStack-root-MuiMultiInputDateRangeField-root":
                  { marginLeft: "8px" },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <TextField label="검색어" size="small" sx={{ alignSelf: "center" }} />
        <Button
          variant="contained"
          sx={{ height: "40px", alignSelf: "center" }}
        >
          검색
        </Button>
      </Box>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>번호</TableCell>
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>의사</TableCell>
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>환자이름</TableCell>
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>주민등록번호</TableCell>
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>질병명</TableCell>
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>처방명</TableCell>
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>수납액</TableCell>
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>결제방식</TableCell>
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>수납일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {receiptList.map((list) => (
          <TableRow key={list.receipt_id}>
              <TableCell align="center">{list.reception_id}</TableCell>
              <TableCell align="right">{list.doctor}</TableCell>
              <TableCell align="right">{list.patient_name}({list.phone_number3})</TableCell>
              <TableCell align="right">{list.front_registration_number}</TableCell>
              <TableCell align="right">{list.disease_name}</TableCell>
              <TableCell align="right">{list.drug_name}</TableCell>
              <TableCell align="right">{list.total_amount}</TableCell>
              <TableCell align="center">{list.mode}</TableCell>
              <TableCell align="right">{list.created_at}</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
};

export default ReceptionList;