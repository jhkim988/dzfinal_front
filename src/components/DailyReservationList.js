import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, InputLabel, makeStyles, MenuItem, Paper, TextareaAutosize, TextField } from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import axios from 'axios';

const Reservation_API_BASE_URL = "/api/reservation";



const DailyReservationList = ({ setSelectedReservationDetails, setPatientData, setReceptionData }) => {
    const [reservation, setReservation] = useState([]);
    //const [patient_id, setPatient_id] = useState(null);


    useEffect(() => {
        axios.get(Reservation_API_BASE_URL)
            .then((response) => {
                setReservation(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleReservationSelect = (reservation_id) => {
        // 선택된 예약 ID에 해당하는 예약 상세 정보를 가져오는 API 호출
        axios.get(Reservation_API_BASE_URL + `/${reservation_id}`)
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
        <div>
            <div>
                <h5>당일 예약 현황</h5>
            </div>
            <div>

                <TableContainer component={Paper} style={{ width: 430, padding: 2 }}>
                    <Table aria-label="simple table" size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>no</TableCell>
                                <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>이름</TableCell>
                                <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>연락처</TableCell>
                                <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>담당의</TableCell>
                                <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>예약시간</TableCell>
                                <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>예약상태</TableCell>
                            </TableRow>
                        </TableHead>
                        {reservation.length === 0 && (
                            <TableBody>
                                <TableCell colSpan={6} align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>금일 예약환자가 존재하지 않습니다.</TableCell>
                            </TableBody>
                        )}
                        <TableBody>
                            {reservation.map((list) => (
                                <TableRow key={list.reservation_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={() => handleReservationSelect(list.reservation_id)}
                                    hover={true}
                                >
                                    <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>{list.reservation_id}</TableCell>
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

                {/* <Paper sx={{ margin: 1 }} elevation={2}>

                   
                </Paper> */}

            </div >
        </div>
    );
};

export default DailyReservationList;