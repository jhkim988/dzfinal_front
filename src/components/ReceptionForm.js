import { Button, Checkbox, createTheme, FormControlLabel, MenuItem, Paper, TextareaAutosize, TextField, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import axios from 'axios';



const doctors = [
    {
        value: '1',
        label: '김더존'
    },
    {
        value: '2',
        label: '이을지'
    }
];

const Reception_API_BASE_URL = "/api/reception";

const ReceptionForm = ({ patient_id, receptionData, setReceptionData, patientData }) => {
    //console.log(patient_id);

    const resetHandler = (event) => {
        setReceptionData({
            patient_id: '',
            height: '',
            weight: '',
            bmi: '',
            systolic: '',
            diastolic: '',
            blood_sugar: '',
            doctor: '',
            treatment_reason: ''
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setReceptionData((receptionData) => ({
            ...receptionData,
            [name]: value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newReceptionData = { ...receptionData, patient_id: patient_id };
        console.log("newReceptionData->", newReceptionData);
        axios.post(Reception_API_BASE_URL, newReceptionData)
            .then((response) => {
                alert(response.data.message);
                console.log(response.data);
                resetHandler(event);
            })
            .catch((error) => {
                alert("접수등록실패");
                console.error(error);
            });
    };


    return (
        <div>

            <div style={{ width: "300px", height: "10px", marginBottom: "10px" }}>
                <h5>접수 등록/수정 [환자정보: {patientData.patient_name},{patientData.front_registration_number},{patientData.phone_number3}]</h5>

            </div>

            <Paper sx={{ marginBottom: 1 }} elevation={2} style={{ width: "450px", height: "200px" }}>
                <form onSubmit={handleSubmit}>
                    {receptionData != null && patient_id == null && (
                        <Box component="form"
                            sx={{
                                '& > :not(style)': { m: 0.5, width: 60 },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <input name="patient_id" value={receptionData.patient_id || ''} variant="outlined" size='small' type="text" readOnly={true} />
                            <TextField id="outlined-basic" label="키" name="height" onChange={handleChange} value={receptionData.height || ''} variant="outlined" size='small' />
                            <TextField id="outlined-basic" label="체중" name="weight" onChange={handleChange} value={receptionData.weight || ''} variant="outlined" size='small' />
                            <TextField id="outlined-basic" label="BMI" name="bmi" onChange={handleChange} value={receptionData.bmi || ''} variant="outlined" size='small' />
                            <TextField id="outlined-basic" label="최고" name="systolic" onChange={handleChange} value={receptionData.systolic || ''} variant="outlined" size='small' />
                            <TextField id="outlined-basic" label="최저" name="diastolic" onChange={handleChange} value={receptionData.diastolic || ''} variant="outlined" size='small' />
                            <TextField id="outlined-basic" label="혈당" name="blood_sugar" onChange={handleChange} value={receptionData.blood_sugar || ''} variant="outlined" size='small' />
                        </Box>
                    )}
                    {receptionData != null && patient_id != null && (
                        <Box component="form"
                            sx={{
                                '& > :not(style)': { m: 0.5, width: 60 },
                            }}
                            noValidate
                            autoComplete="off"
                        >

                            <input name="patient_id" value={patient_id || ''} variant="outlined" size='small' type="text" readOnly={true} />
                            <TextField id="outlined-basic" label="키" name="height" onChange={handleChange} value={receptionData.height || ''} variant="outlined" size='small' />
                            <TextField id="outlined-basic" label="체중" name="weight" onChange={handleChange} value={receptionData.weight || ''} variant="outlined" size='small' />
                            <TextField id="outlined-basic" label="BMI" name="bmi" onChange={handleChange} value={receptionData.bmi || ''} variant="outlined" size='small' />
                            <TextField id="outlined-basic" label="최고" name="systolic" onChange={handleChange} value={receptionData.systolic || ''} variant="outlined" size='small' />
                            <TextField id="outlined-basic" label="최저" name="diastolic" onChange={handleChange} value={receptionData.diastolic || ''} variant="outlined" size='small' />
                            <TextField id="outlined-basic" label="혈당" name="blood_sugar" onChange={handleChange} value={receptionData.blood_sugar || ''} variant="outlined" size='small' />
                        </Box>
                    )}
                    <Box component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: 60 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="담당의"
                            size='small'
                            name="doctor"
                            onChange={handleChange}
                            value={receptionData.doctor || ''}
                            style={{ width: "100px", height: "10px" }}
                        //helperText="담당의를 입력하세요"
                        >
                            {doctors.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            //fullWidth
                            label="내원사유"
                            multiline
                            rows={1}
                            style={{ width: 300 }}
                            size='small'
                            name="treatment_reason"
                            onChange={handleChange}
                            value={receptionData.treatment_reason || ''}
                        />
                    </Box>
                    <Button type="submit" variant="contained">접수</Button>
                    <Button type="reset" variant="contained" color="error" onClick={resetHandler}>취소</Button>
                </form>
            </Paper>
        </div >
    );
};

export default ReceptionForm;