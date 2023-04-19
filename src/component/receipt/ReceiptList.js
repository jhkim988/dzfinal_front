import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { 
  Select, 
  Box, 
  FormControl, 
  Button, 
  Pagination, 
  InputLabel, 
  MenuItem, 
  Paper, 
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  } from '@mui/material';
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Stack } from "@mui/system";
import koLocale from "dayjs/locale/ko";
import "./style.css";
import axiosClient from '../login/AxiosClient';



const ReceiptList = ({ receiptRecordSearch, initReceiptList, initTotalCount, setReceiptData }) => {
  const [receiptList, setReceiptList] = useState([]);
  const [type, setType] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState([]); // 선택한 데이터 상태
  const [totalCount, setTotalCount] = useState(10);

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
    setReceiptList(initReceiptList);
  }, [initReceiptList]);
  useEffect(() => {
    setTotalCount(initTotalCount);
  }, [initTotalCount])

  // useEffect(() => {
  //   // 선택한 데이터의 변경에 따라 receiptRecordSearch 함수 호출
  //   if (selectedReceipt) {
  //     receiptRecordSearch(
  //       {
  //         type: "patient_id",
  //         searchText: patient_id,
  //         currentPage: 1,
  //       },
  //       setSelectedReceipt
  //     );
  //   } else {
  //     // 선택한 데이터가 없으면 기존 데이터들을 유지하면서 호출
  //     receiptRecordSearch(
  //       {
  //         start: null, // start 값에 null 전달하여 기존 값 유지
  //         end: null, // end 값에 null 전달하여 기존 값 유지
  //         type: "patient_id",
  //         searchText: patient_id,
  //         currentPage: 1,
  //       },
  //       setReceiptList
  //     );
  //   }
  // }, [patient_id]); // selectedReceipt 추가

  // 페이징
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    console.log("handleChange Call", value);
    setPage(value);
    getReceiptList({ start: searchRange[0], end: searchRange[1], type, searchText, currentPage: value });

  };

  const getReceiptList = useCallback(({ start, end, type, searchText, currentPage }) => {
    receiptRecordSearch({ start, end, type, searchText, currentPage }, (data) => {
      setReceiptList(data.list);
      setTotalCount(data.totalCount);
    });
  }, [setReceiptList, receiptRecordSearch]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    getReceiptList({ start: searchRange[0], end: searchRange[1], type, searchText, currentPage: 1 });
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
  const handleSelectedReceipt = ({receipt_id, reception_id}) => {
      axiosClient.get(`/api/reception/detail/${reception_id}`).then(({ data }) => {
        setReceiptData(data);
      });
  }



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
              size="small"
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
              slots={{
                startInput: {
                  inputProps: {
                    style: {
                      height: "20px",
                    },
                  },
                  variant: "outlined",
                },
                endInput: {
                  inputProps: {
                    style: {
                      height: "20px",
                    },
                  },
                  variant: "outlined",
                },
              }}
            />
          </LocalizationProvider>
          <TextField
            label="검색어"
            size="small"
            sx={{ alignSelf: "center", paddingLeft:"10px", paddingRight: "10px", }}
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

        <TableContainer component={Paper} sx={{ height: 280 }}>
          <Table sx={{
                minWidth: "250px",
                "& td": { padding: "1.1vh 0px" },
                "& th": { padding: "1.1vh 0px", fontWeight: "bold" },
              }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">의사</TableCell>
                <TableCell align="center">환자이름(휴대전화)</TableCell>
                <TableCell align="center">주민등록번호</TableCell>
                <TableCell align="center">질병명</TableCell>
                <TableCell align="center">처방명</TableCell>
                <TableCell align="center">수납액</TableCell>
                <TableCell align="center">결제</TableCell>
                <TableCell align="center">수납일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(Math.max(5, receiptList.length))].map((_, idx) => {
                if (idx < receiptList.length) {
                  return (
                    <TableRow key={`ReceiptList#${idx}`}
                      hover={true}
                      onClick={() => handleSelectedReceipt(receiptList[idx])}
                    >
                      <TableCell align="center">
                        {receiptList[idx].doctor === 1 ? "김을지" : "이더존"}
                      </TableCell>
                      <TableCell align="center">{`${receiptList[idx].patient_name}(${receiptList[idx].phone_number3})`}</TableCell>
                      <TableCell align="center">{receiptList[idx].front_registration_number}</TableCell>
                      <TableCell align="center">
                        {receiptList[idx].disease_count > 1 ? `${receiptList[idx].disease_name} 외 ${receiptList[idx].disease_count - 1} 건` : `${receiptList[idx].disease_name}`}
                      </TableCell>
                      <TableCell align="center">
                        {/* <Tooltip> */}
                          {receiptList[idx].prescription_count > 1 ? `${receiptList[idx].drug_name} 외 ${receiptList[idx].prescription_count - 1} 건` : `${receiptList[idx].drug_name}`}
                        {/* </Tooltip> */}
                      </TableCell>
                      <TableCell align="center">{receiptList[idx].total_amount}</TableCell>
                      <TableCell align="center">{receiptList[idx].mode}</TableCell>
                      <TableCell align="center">{receiptList[idx].created_at}</TableCell>
                    </TableRow>
                  );
                } else {
                  return (
                    <TableRow key={`ReceiptList#${idx}EMPTY`} hover={true}>
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
            <Pagination count={Math.ceil(totalCount/10)} page={page} onChange={handleChange}/>
          </Stack>
        </Box>
      </Paper>
    </>
  );
};

export default ReceiptList;