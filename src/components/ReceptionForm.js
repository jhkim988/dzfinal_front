import { Button, Checkbox, createTheme, FormControlLabel, MenuItem, Paper, TextareaAutosize, TextField, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Patient_API_BASE_URL = "/api/patient";

const doctors = [
    {
        value: '김더존',
        label: '김더존'
    },
    {
        value: '이을지',
        label: '이을지'
    }
];

const gender = [
    {
        value: 'M',
        label: 'M'
    },
    {
        value: 'F',
        label: 'F'
    }
];

const ReceptionForm = () => {

    const [patientData, setPatientData] = useState({
        patient_name: '',
        front_registration_number: '',
        back_registration_number: '',
        gender: '',
        phone_number1: '',
        phone_number2: '',
        phone_number3: '',
        insurance: '',
        zip_code: '',
        address: '',
        detail_address: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPatientData((patientData) => ({
            ...patientData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(Patient_API_BASE_URL + "/insert", patientData)
            .then((response) => {
                alert("환자 등록 성공");
                console.log(response.data);
            })
            .catch((error) => {
                alert("환자 등록 실패");
                console.error(error);
            });
    };

    return (
        <div>
            <div style={{ width: "100px", height: "10px", marginBottom: "5px" }}>
                <h5>환자 등록/수정</h5>

            </div>
            {/*             
            <Box component="form"
                sx={{
                    '& > :not(style)': { m: 0.5 },
                }}
                noValidate
                autoComplete="off"


            >
               <TextField id="outlined-basic" label="환자검색" variant="outlined" size='small' style={{ width: "300px", height: "10px" }}
                    helperText="이름+생년월일+연락처 뒷자리"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }} />
            </Box> */}
            <Paper sx={{ marginBottom: 1, marginTop: 2 }} elevation={2} style={{ width: "450px", height: "200px" }}>
                <form onSubmit={handleSubmit}>
                    <Button type="submit" variant="contained">등록</Button>
                    <Box component="form"
                        sx={{
                            '& > :not(style)': { m: 0.5, width: 100 },
                        }}
                        noValidate
                        autoComplete="off"


                    >
                        <TextField id="outlined-basic" label="환자이름" variant="outlined" name="patient_name" onChange={handleChange} value={patientData.patient_name} size='small' style={{ width: "130px", height: "10px" }} />
                        <TextField id="outlined-basic" label="주민등록번호" variant="outlined" name="front_registration_number" onChange={handleChange} value={patientData.front_registration_number} size='small' />-
                        <TextField id="outlined-basic" label="뒷자리" onChange={handleChange} name="back_registration_number" value={patientData.back_registration_number} variant="outlined" size='small' />
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="성별"
                            defaultValue="M"
                            size='small'
                            name="gender"
                            onChange={handleChange}
                            style={{ width: "60px", height: "10px" }}
                        >
                            {gender.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box component="form"
                        sx={{
                            '& > :not(style)': { m: 0.5, width: 80 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="연락처1" name="phone_number1" onChange={handleChange} value={patientData.phone_number1} variant="outlined" size='small' />-
                        <TextField id="outlined-basic" label="연락처2" name="phone_number2" onChange={handleChange} value={patientData.phone_number2} variant="outlined" size='small' />-
                        <TextField id="outlined-basic" label="연락처3" name="phone_number3" onChange={handleChange} value={patientData.phone_number3} variant="outlined" size='small' />

                        <FormControlLabel control={<Checkbox defaultChecked />} name="insurance" onChange={handleChange} label="보험여부" margin="dense" size='small' style={{ width: "110px", height: "10px" }} />

                    </Box>
                    <Box component="form"
                        sx={{
                            '& > :not(style)': { m: 0.5, width: 100 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="우편번호" name="zip_code" onChange={handleChange} value={patientData.zip_code} variant="outlined" size='small' />
                        <TextField id="outlined-basic" label="주소" name="address" onChange={handleChange} value={patientData.address} variant="outlined" size='small' style={{ width: "300px", height: "10px" }} />
                        <br />
                        <TextField id="outlined-basic" label="상세주소" name="detail_address" onChange={handleChange} value={patientData.detail_address} variant="outlined" size='small'
                            style={{ width: 400 }}
                        />
                    </Box>

                </form>
            </Paper>


            <div style={{ width: "100px", height: "10px", marginBottom: "10px" }}>
                <h5>접수 등록/수정</h5>
                <Button variant="contained">접수</Button>
            </div>

            <Paper sx={{ marginBottom: 1 }} elevation={2} style={{ width: "450px", height: "100px" }}>
                <Box component="form"
                    sx={{
                        '& > :not(style)': { m: 0.5, width: 60 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="키" variant="outlined" size='small' />
                    <TextField id="outlined-basic" label="체중" variant="outlined" size='small' />
                    <TextField id="outlined-basic" label="BMI" variant="outlined" size='small' />
                    <TextField id="outlined-basic" label="최고" variant="outlined" size='small' />
                    <TextField id="outlined-basic" label="최저" variant="outlined" size='small' />
                    <TextField id="outlined-basic" label="혈당" variant="outlined" size='small' />
                </Box>
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
                        defaultValue="김더존"
                        size='small'
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
                    />
                </Box>

                <Button variant="outlined">취소</Button>
            </Paper>
        </div >
    );
};

export default ReceptionForm;