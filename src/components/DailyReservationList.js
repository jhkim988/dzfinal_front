import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, InputLabel, MenuItem, Paper, TextareaAutosize, TextField } from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import axios from 'axios';

const Reception_API_BASE_URL = "/api/reception";

const DailyReservationList = () => {
    const [receptionList, setReceptionList] = useState([]);

    useEffect(() => {
        axios.get(Reception_API_BASE_URL + "/list")
            .then((response) => {
                setReceptionList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <div>
                <h5>당일 예약 현황</h5>
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table style={{ width: 400 }} aria-label="simple table" size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell>no</TableCell>
                                <TableCell align="center">이름</TableCell>
                                <TableCell align="center">연락처</TableCell>
                                <TableCell align="center">담당의</TableCell>
                                <TableCell align="center">예약시간</TableCell>
                                <TableCell align="center">예약상태</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {receptionList.map((list) => (
                                <TableRow key={list.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{list.reception_id}</TableCell>
                                    <TableCell align="center">{list.doctor}</TableCell>
                                    <TableCell align="center">{list.treatment_reason}</TableCell>
                                    <TableCell align="center">{list.patient_id}</TableCell>
                                    <TableCell align="center">{list.patient_name}</TableCell>
                                    <TableCell align="center">{list.phone_number1}</TableCell>
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