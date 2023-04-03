import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Select, Box, FormControl, Button, Pagination, InputLabel, MenuItem, Paper, TextField } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Stack } from "@mui/system";
import koLocale from "dayjs/locale/ko";
import axios from 'axios';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';




const ReceiptList = ({ clickRowCallback, receiptRecordSearch, patient_name }) => {
  const [receiptList, setReceiptList] = useState([]);
  const [type, setType] = useState("");

  // 검색어
  const [searchText, setSearchText] = useState("");
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  // 기간 설정
  const [searchRange, setSearchRange] = useState([null, null]);
  const handleSearchRangeChange = (newValue) => {
    setSearchRange(newValue);
  };

  useEffect(() => {
    console.log(patient_name);
    receiptRecordSearch({ type: "patient_name", searchText: patient_name }, setReceiptList);
  }, [patient_name]);

  const getReceiptList = useCallback(() => {
    receiptRecordSearch({ start: searchRange[0], end: searchRange[1], type, searchText }, setReceiptList);
  }, [searchRange, type, searchText, setReceiptList, receiptRecordSearch]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSearch = () => {
    getReceiptList();
  }


  // 데이터피커 가운데 글자 사라지게 하기
  useEffect(() => {
    handleToggle(true);
  }, []);

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
        }
      }, 100);
    }
  };

  



  // 수납내역목록에서 데이터 선택하면 데이터가져오기
  const handleSelectedReceipt = (receipt_id, reception_id) => {
    axios.get(`/api/receipt/selectedOneReceipt?reception_id=${reception_id}`)
         .then((response) => {
          console.log("선택한 데이터 정보: ", response.data);
          clickRowCallback(response.data);
        //  handleSelectedInformation(response.data);
         })
         .catch((error) => {
          console.error(error);
         })
  }

  // 페이징처리
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (event, value) => {
    setPage(value);
  }

  useEffect(() => {
    axios.get(`/api/receipt/getReceiptList?page=${page}`)
    .then(response => {
      setReceiptList(response.data.content);
      setTotalPages(response.data.totalPages);
    })
    .catch(error => {
      console.log(error);
    });
  }, [page]);


  // 수납내역목록에서 데이터 선택하면 데이터가져오기
  const handleSelectedReceipt = (receipt_id, reception_id) => {
    axios.get(`/api/receipt/selectedOneReceipt?reception_id=${reception_id}`)
         .then((response) => {
          console.log("선택한 데이터 정보: ", response.data);
          clickRowCallback(response.data);
        //  handleSelectedInformation(response.data);
         })
         .catch((error) => {
          console.error(error);
         })
  }

  // 페이징처리
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (event, value) => {
    setPage(value);
  }

  useEffect(() => {
    axios.get(`/api/receipt/getReceiptList?page=${page}`)
    .then(response => {
      setReceiptList(response.data.content);
      setTotalPages(response.data.totalPages);
    })
    .catch(error => {
      console.log(error);
    });
  }, [page]);

  return (
    <>
      <Paper sx={{ height: "38vh" }}>
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
              onToggle={handleToggle}
              renderInput={(startProps, endProps) => (
                <Box sx={{
                  display: "flex",
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

        <TableContainer component={Paper} style={{ padding: 2 }}>
          <Table sx={{ maxWidth: 100 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>의사</TableCell>
                <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>환자이름(생년월일)</TableCell>
                <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>주민등록번호</TableCell>
                <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>질병명</TableCell>
                <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>처방명</TableCell>
                <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>수납액</TableCell>
                <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>결제</TableCell>
                <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>수납일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(Math.max(5, receiptList.length))].map((_, idx) => {
                if (idx < receiptList.length) {
                  return (
                    <TableRow key={idx} 
                              hover={true} 
                              onClick={() => handleSelectedReceipt(receiptList[idx].receipt_id, receiptList[idx].reception_id)}>
                      <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>
                        {receiptList[idx].doctor === 1 ? "김을지" : "이더존"}
                      </TableCell>
                      <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>{`${receiptList[idx].patient_name}(${receiptList[idx].phone_number3})`}</TableCell>
                      <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>{receiptList[idx].front_registration_number}</TableCell>
                      <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight:2 }}>
                      { receiptList[idx].disease_count > 1 ? `${receiptList[idx].disease_name} 외 ${receiptList[idx].disease_count - 1} 건` : `${receiptList[idx].disease_name}` }
                      </TableCell>
                      <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight:2 }}>
                      { receiptList[idx].prescription_count > 1 ? `${receiptList[idx].drug_name} 외 ${receiptList[idx].prescription_count - 1} 건` : `${receiptList[idx].drug_name}` }
                      </TableCell>
                      <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>{receiptList[idx].total_amount}</TableCell>
                      <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>{receiptList[idx].mode}</TableCell>
                      <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>{receiptList[idx].created_at}</TableCell>
                    </TableRow>
                  );
                } else {
                  return (
                    <TableRow key={idx} hover={true}>
                      <TableCell align="right">&nbsp;</TableCell>
                      <TableCell align="right">&nbsp;</TableCell>
                      <TableCell align="right">&nbsp;</TableCell>
                      <TableCell align="right">&nbsp;</TableCell>
                      <TableCell align="right">&nbsp;</TableCell>
                      <TableCell align="right">&nbsp;</TableCell>
                      <TableCell align="right">&nbsp;</TableCell>
                      <TableCell align="right">&nbsp;</TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2} style={{ bottom: '0' }}>
            {/* <Pagination count={5} /> */}
            <Pagination count={5} page={page} onChange={handlePageChange} />
          </Stack>
        </Box>
      </Paper>
    </>
  );
};

export default ReceiptList;