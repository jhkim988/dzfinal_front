import * as React from 'react';
import axios from "axios";
import { useState, useEffect, useCallback } from 'react';
import { Select, Box, FormControl, Button, Checkbox, FormControlLabel, FormGroup, Pagination, InputLabel, makeStyles, MenuItem, Paper, TextareaAutosize, TextField } from '@mui/material';
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
import { padding, Stack } from "@mui/system";
import koLocale from "dayjs/locale/ko";




const ReceiptList = ({ patient_name, receptionRecordSearch }) => {
  const [receiptList, setReceiptList] = useState([]);
  const [type, setType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchRange, setSearchRange] = useState([null, null]);

  useEffect(() => {
    console.log(patient_name);
    receptionRecordSearch({ type: "patient_name", searchText: patient_name }, setReceiptList);
  }, [patient_name]);

  const getReceiptList = useCallback(() => {
    receptionRecordSearch({ start: searchRange[0], end: searchRange[1], type, searchText}, setReceiptList);
  }, [searchRange, type, searchText, setReceiptList, receptionRecordSearch]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchRangeChange = (newValue) => {
    setSearchRange(newValue);
  };

  const handleSearch = () => {
    getReceiptList();
  };

  return (
  <>
    <Paper sx={{ height: "40vh" }}>
      <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>수납내역목록</h5>
        <Box sx={{ display: "flex" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>분류</InputLabel>
            <Select 
              value={type} 
              onChange={handleTypeChange}
              size="medium"
              >
              <MenuItem value={"patient_name"}>환자이름</MenuItem>
              <MenuItem value={"reception_id"}>접수번호</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale={koLocale}>
            <DateRangePicker
              sx={{ alignItems: "center" }}
              label="검색 기간"
              value={searchRange}
              onChange={handleSearchRangeChange}
              localeText={{ start: "기간 시작", end: "기간 끝" }}
              format="YYYY-MM-DD"
              renderInput={(startProps, endProps) => (
                <Box sx={{ display: "flex", 
                           alignItems: "center",
                        }}>
                  <TextField {...startProps} variant="outlined" sx={{ height: "20px" }} />
                  <Box sx={{ mx: 1 }}>~</Box>
                  <TextField {...endProps} variant="outlined" size="small" />
                </Box>
              )}
            />
          </LocalizationProvider>
          <TextField 
            label="검색어" 
            size="medium" 
            sx={{ alignSelf: "center" }}
            value={searchText}
            onChange={handleSearchTextChange}
            />
          <Button
            variant="contained"
            sx={{ height: "40px", alignSelf: "center" }}
            onClick={handleSearch}
          >
            검색
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 100 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ paddingTop: 4 }}>의사</TableCell>
                <TableCell align="center" style={{ paddingTop: 4 }}>환자이름</TableCell>
                <TableCell align="center" style={{ paddingTop: 4 }}>주민등록번호</TableCell>
                <TableCell align="center" style={{ paddingTop: 4 }}>질병명</TableCell>
                <TableCell align="center" style={{ paddingTop: 4 }}>처방명</TableCell>
                <TableCell align="center" style={{ paddingTop: 4 }}>수납액</TableCell>
                <TableCell align="center" style={{ paddingTop: 4 }}>결제</TableCell>
                <TableCell align="center" style={{ paddingTop: 4 }}>수납일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(Math.max(5, receiptList.length))].map((_, index) => {
                if (index < receiptList.length) {
                  const list = receiptList[index];
                  return (
                    <TableRow key={list.receipt_id}>
                      <TableCell align="right">
                        {list.doctor === 1 ? "김을지" : "이더존"}
                      </TableCell>
                      <TableCell align="right">{`${list.patient_name}(${list.phone_number3})`}</TableCell>
                      <TableCell align="right">{list.front_registration_number}</TableCell>
                      <TableCell align="right">{list.disease_name}</TableCell>
                      <TableCell align="right">{list.drug_name}</TableCell>
                      <TableCell align="right">{list.total_amount}</TableCell>
                      <TableCell align="center">{list.mode}</TableCell>
                      <TableCell align="right">{list.created_at}</TableCell>
                    </TableRow>
                  );
                } else {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center" colSpan={8}>
                      &nbsp;
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2} style={{bottom: '0'}}>
            <Pagination count={10} />
          </Stack>
      </Box>
    </Paper>
  </>
  );
};

export default ReceiptList;