import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid
} from "@material-ui/core";
import axiosClient from '../login/AxiosClient';
const Reservation_API_BASE_URL = "/api/reservation";


//예약리스트 10개 이상이면 스크롤바 자동 생성
//예약리스트 조회할 때 초진재진 구분 추가할 수도 있음

const DailyReservationList = ({ setSelectedReservationDetails, setPatientData, setReceptionData, loadDailyReservationList, reservation, setReservation }) => {
    useEffect(() => {
        loadDailyReservationList();
    }, []);

    const handleReservationSelect = (reservation_id) => {
        // 선택된 예약 ID에 해당하는 예약 상세 정보를 가져오는 API 호출
        axiosClient.get(Reservation_API_BASE_URL + `/detail/${reservation_id}`)
            .then((response) => {
                console.log("예약환자정보:", response.data);
                console.log("환자번호:", response.data.patient_id);
                //setPatient_id(response.data.patient_id);
                setSelectedReservationDetails(response.data);
                // 환자 onchange
                setPatientData(prev => ({ ...response.data }));
                // 접수
                setReceptionData(prev => ({ ...response.data }));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <Grid container spacing={2} sx={{ height: '41vh' }} >
            <Paper sx={{ width: "100%", marginTop: 2, marginLeft: 2 }}>
                <Grid item xs={6} style={{ paddingTop: 0 }}>
                    <h5 style={{ marginLeft: "15px", marginTop: "5px", marginBottom: "5px" }}>당일 예약 현황</h5>
                </Grid>
                <Grid item xs={12} style={{ width: "100%", paddingTop: 0 }}>
                    <TableContainer style={{ padding: 2, maxHeight: '38vh' }}>
                        <Table aria-label="simple table" size='small'>
                            <TableHead style={{ position: 'sticky', top: 0, background: "white" }}>
                                <TableRow>
                                    {/* <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>no</TableCell> */}
                                    <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>이름</TableCell>
                                    <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>연락처</TableCell>
                                    <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>담당의</TableCell>
                                    <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>예약시간</TableCell>
                                    <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>예약상태</TableCell>
                                </TableRow>
                            </TableHead>
                            {reservation.length === 0 && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>금일 예약환자가 존재하지 않습니다.</TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                            {/* <Box ></Box> */}
                            <TableBody style={{ overflowY: 'scroll' }}>
                                {reservation.map((list) => (
                                    <TableRow key={list.reservation_id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        onClick={() => handleReservationSelect(list.reservation_id)}
                                        hover={true}
                                    >
                                        {/* <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>{list.reservation_id}</TableCell> */}
                                        {/* <Link to={{ pathname: `/boardDetail/${board.board_no}`, state: { board_no: `${board.board_no}` } }}>{board.title} </Link> */}
                                        <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>{list.patient_name}</TableCell>
                                        <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>{list.phone_number1 + "-" + list.phone_number2 + "-" + list.phone_number3}</TableCell>
                                        <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>{list.employee_name}</TableCell>
                                        <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>{list.wish_time}</TableCell>
                                        <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>{list.state}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Paper>
        </Grid >
    );
};

export default DailyReservationList;