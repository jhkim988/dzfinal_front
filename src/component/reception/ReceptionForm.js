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

const ReceptionForm = ({ patient_id, receptionData, setReceptionData, patientData, setPatientData, setSelectedAddress }) => {
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
        setPatientData({
            patient_name: '',
            front_registration_number: '',
            back_registration_number: '',
            gender: '',
            phone_number1: '',
            phone_number2: '',
            phone_number3: '',
            insurance: 'true',

            detail_address: '',
            insurance: ''
        });
        setSelectedAddress({
            zip_code: '',
            address: ''

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
        // if (window.confirm(newReceptionData.patient_name + "님의 접수 등록을 진행하시겠습니까?")) {
        if (window.confirm("접수 등록을 진행하시겠습니까?")) {
            axios.post(Reception_API_BASE_URL, newReceptionData)
                .then((response) => {
                    alert(response.data.message);
                    console.log(response.data);
                    resetHandler(event);
                    //화면 새로고침 reduce..
                    //상태와 프로퍼티(props)를 변경하여 자동으로 화면을 다시 렌더링
                    // window.location.reload();
                })
                .catch((error) => {
                    alert("접수등록실패");
                    console.error(error);
                });
        } else {
            alert("접수 등록이 취소되었습니다. 다시 시도 바랍니다.");
            resetHandler();
        }

    };
    const receptDataHandleSubmit = (event) => {
        event.preventDefault();
        // if (window.confirm(receptionData.patient_name + "님의 접수 등록을 진행하시겠습니까?")) {
        if (window.confirm("접수 등록을 진행하시겠습니까?")) {
            axios.post(Reception_API_BASE_URL, receptionData)
                .then((response) => {
                    alert(response.data.message);
                    console.log(response.data);
                    resetHandler(event);
                    //화면 새로고침 reduce..
                    //상태와 프로퍼티(props)를 변경하여 자동으로 화면을 다시 렌더링
                    // window.location.reload();
                })
                .catch((error) => {
                    alert("접수등록실패");
                    console.error(error);
                });
        } else {
            alert("접수 등록이 취소되었습니다. 다시 시도 바랍니다.");
            resetHandler();
        }

    }

    return (
        <div>

            <div style={{ width: "300px", height: "10px", marginBottom: "10px", marginTop: "10px" }}>
                <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>접수 등록/수정 [환자정보: {patientData.patient_name},{patientData.front_registration_number},{patientData.phone_number3}]</h5>
            </div>

            <Paper sx={{ marginBottom: 1 }} elevation={2} style={{ width: "450px", height: "100px" }}>
                <div>
                    {receptionData != null && patient_id == null && (
                        <form onSubmit={receptDataHandleSubmit}>
                            <Box component="form"
                                sx={{
                                    '& > :not(style)': { m: 0.5, width: 70 },
                                    '& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': {
                                        padding: "3px", paddingLeft: "10px"
                                    }
                                }
                                }
                                noValidate
                                autoComplete="off"
                            >

                                {/* <input name="patient_id" value={receptionData.patient_id || ''} variant="outlined" size='small' type="text" readOnly={true} /> */}
                                <TextField id="outlined-basic"
                                    label="환자번호"
                                    name="patient_id"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    value={receptionData.patient_id || ''}
                                    variant="outlined"
                                    size='small'
                                    readOnly={true} />
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    label="키"
                                    name="height"
                                    style={{ width: "50px" }}
                                    onChange={handleChange}
                                    value={receptionData.height || ''}
                                    variant="outlined"
                                    size='small' />
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    label="체중"
                                    name="weight"
                                    onChange={handleChange}
                                    value={receptionData.weight || ''}
                                    variant="outlined"
                                    size='small' />
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    label="BMI"
                                    name="bmi"
                                    onChange={handleChange}
                                    value={receptionData.bmi || ''}
                                    variant="outlined"
                                    size='small' />
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    label="최고혈압"
                                    name="systolic"
                                    onChange={handleChange}
                                    value={receptionData.systolic || ''}
                                    variant="outlined"
                                    size='small' />
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    label="최저혈압"
                                    name="diastolic"
                                    onChange={handleChange}
                                    value={receptionData.diastolic || ''}
                                    variant="outlined"
                                    size='small' />

                            </Box>
                            <Box component="form"
                                sx={{
                                    '& > :not(style)': { m: 0.5, width: 60 },
                                    '& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': {
                                        padding: "3px", paddingLeft: "10px"
                                    }
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    style={{ width: "50px" }}
                                    label="혈당"
                                    name="blood_sugar"
                                    onChange={handleChange}
                                    value={receptionData.blood_sugar || ''}
                                    variant="outlined"
                                    size='small' />

                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    label="담당의"
                                    size='small'
                                    name="doctor"
                                    onChange={handleChange}
                                    value={receptionData.doctor || ''}
                                    style={{ width: "100px", height: "10px" }}
                                    sx={{
                                        '.css-jvc7vx-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "3px", paddingLeft: "10px" }
                                    }}
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
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    rows={1}
                                    style={{ width: 250 }}
                                    size='small'
                                    name="treatment_reason"
                                    onChange={handleChange}
                                    value={receptionData.treatment_reason || ''}
                                    sx={{ padding: "3px", paddingLeft: "10px" }}
                                />
                            </Box>
                            <Box style={{ float: "right" }}>
                                <Button type="submit" variant="contained" style={{ width: "30px", height: "20px" }}>등록</Button>
                                <Button type="reset" variant="contained" color="error" onClick={resetHandler} style={{ width: "30px", height: "20px" }}>취소</Button>
                            </Box>
                        </form>
                    )}
                    {receptionData != null && patient_id != null && (
                        <form onSubmit={handleSubmit}>
                            <Box component="form"
                                sx={{
                                    '& > :not(style)': { m: 0.5, width: 70 },
                                    '& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': {
                                        padding: "3px", paddingLeft: "10px"
                                    }

                                }}
                                noValidate
                                autoComplete="off"
                            >

                                {/* <input name="patient_id" value={patient_id || ''} variant="outlined" size='small' type="text" readOnly={true} /> */}
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    label="환자번호"
                                    name="patient_id"
                                    value={patient_id || ''} variant="outlined" size='small' readOnly={true} />
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    label="키"
                                    name="height"
                                    onChange={handleChange} value={receptionData.height || ''} variant="outlined" size='small' />
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    label="체중"
                                    name="weight"
                                    onChange={handleChange}
                                    value={receptionData.weight || ''} variant="outlined" size='small' />
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    label="BMI" name="bmi" onChange={handleChange} value={receptionData.bmi || ''} variant="outlined" size='small' />
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    label="최고혈압" name="systolic" onChange={handleChange} value={receptionData.systolic || ''} variant="outlined" size='small' />
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    label="최저혈압" name="diastolic" onChange={handleChange} value={receptionData.diastolic || ''} variant="outlined" size='small' />
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }} label="혈당" name="blood_sugar" onChange={handleChange} value={receptionData.blood_sugar || ''} variant="outlined" size='small' />

                            </Box>
                            <Box component="form"
                                sx={{
                                    '& > :not(style)': { m: 0.5 },
                                    '& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': {
                                        padding: "3px", paddingLeft: "10px"
                                    }
                                }}
                                noValidate
                                autoComplete="off"
                            >

                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    label="담당의"
                                    size='small'
                                    name="doctor"
                                    onChange={handleChange}
                                    value={receptionData.doctor || ''}
                                    style={{ width: "100px", height: "10px" }}
                                    sx={{
                                        '.css-jvc7vx-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "3px", paddingLeft: "10px" }
                                    }}
                                >
                                    {doctors.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    label="내원사유"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    multiline
                                    rows={1}
                                    style={{ width: 250 }}
                                    size='small'
                                    name="treatment_reason"
                                    onChange={handleChange}
                                    value={receptionData.treatment_reason || ''}
                                />
                            </Box>
                            <Box style={{ float: "right" }}>
                                <Button type="submit" variant="contained" style={{ width: "30px", height: "20px" }}>등록</Button>
                                <Button type="reset" variant="contained" color="error" onClick={resetHandler} style={{ width: "30px", height: "20px" }}>취소</Button>
                            </Box>
                        </form>

                    )}
                </div>
            </Paper>

        </div >
    );
};

export default ReceptionForm;