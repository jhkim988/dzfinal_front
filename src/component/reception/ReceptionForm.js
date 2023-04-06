import { Button, Checkbox, createTheme, FormControlLabel, MenuItem, Paper, TextareaAutosize, TextField, ThemeProvider, Grid, Hidden } from '@mui/material';
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

const examinationTextField = {

    '& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': {
        padding: "0.5em", paddingLeft: "10px"
    }
}

const Reception_API_BASE_URL = "/api/reception";

const ReceptionForm = ({ patient_id, receptionData, setReceptionData, patientData, setPatientData }) => {
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
            zip_code: '',
            address: '',
            detail_address: '',
            insurance: ''
        });
        // setSelectedAddress({
        //     zip_code: '',
        //     address: ''

        // });

    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        let updateData = { ...receptionData };

        if (name == 'height' || name == 'weight') {
            updateData[name] = value;
            updateData.bmi = calculateBMI(updateData.height, updateData.weight);
        } else {
            updateData[name] = value;
        }

        setReceptionData(updateData);

        // setReceptionData((receptionData) => ({
        //     ...receptionData,
        //     [name]: value
        // }));
    }

    //초진 환자 등록 후 접수 등록
    const handleSubmit = (event) => {
        event.preventDefault();
        const newReceptionData = { ...receptionData, patient_id: patient_id };
        console.log("newReceptionData->", newReceptionData);
        if (window.confirm("접수 등록을 진행하시겠습니까?")) {
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
        } else {
            alert("접수 등록이 취소되었습니다. 다시 시도 바랍니다.");
            resetHandler();
        }

    };

    //재진 환자 접수 등록
    const receptDataHandleSubmit = (event) => {
        console.log(receptionData);
        event.preventDefault();
        if (window.confirm("접수 등록을 진행하시겠습니까?")) {
            axios.post(Reception_API_BASE_URL, receptionData)
                .then((response) => {
                    alert(response.data.message);
                    console.log(response.data);
                    resetHandler(event);
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

    //접수 수정
    const updateReceptionInfo = () => {
        if (window.confirm("[ 환자번호 : " + patientData.patient_id + " ]" + patientData.patient_name + "님의 접수 정보를 수정하시겠습니까?")) {
            axios.post(Reception_API_BASE_URL + "/update", receptionData)
                .then((response) => {
                    alert("접수 수정 성공");
                    setPatientData(prev => ({ ...response.data }));
                    resetHandler();
                })
                .catch((error) => {
                    alert("접수 수정 실패, 확인바람 ");
                    console.error(error);
                });
        } else {
            alert("취소되었습니다.");
            resetHandler();
        }
    }

    //bmi 자동 계산
    const calculateBMI = (height, weight) => {
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        return bmi.toFixed(1);
    }

    return (
        <Paper elevation={1} sx={{ padding: 2, height: "15.3vh" }}>
            {receptionData != null && patient_id == null && (
                <Grid container spacing={2}>
                    <div style={{ width: "500px", height: "10px", marginBottom: "10px", marginTop: "2px" }}>
                        <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>접수 등록/수정&nbsp;&nbsp;[환자정보: {patientData.patient_name},{patientData.front_registration_number},{patientData.phone_number3}]</h5>
                    </div>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Hidden id="outlined-basic"
                                label="환자번호"
                                name="patient_id"
                                InputLabelProps={{
                                    shrink: "true"
                                }}
                                sx={examinationTextField}
                                value={receptionData.patient_id || ''}
                                variant="outlined"
                                size='small'
                                readOnly={true} />
                            <Grid item xs={2}>
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    sx={examinationTextField}
                                    label="키   [cm]"
                                    name="height"
                                    onChange={handleChange}
                                    value={receptionData.height || ''}
                                    variant="outlined"
                                    size='small' />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    sx={examinationTextField}
                                    label="체중  [kg]"
                                    name="weight"
                                    onChange={handleChange}
                                    value={receptionData.weight || ''}
                                    variant="outlined"
                                    size='small' />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    sx={examinationTextField}
                                    label="BMI"
                                    name="bmi"
                                    onChange={handleChange}
                                    value={receptionData.bmi || '' || calculateBMI(receptionData.height, receptionData.weight)}
                                    variant="outlined"
                                    size='small'
                                    readOnly={true} />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    sx={examinationTextField}
                                    label="최고혈압"
                                    name="systolic"
                                    onChange={handleChange}
                                    value={receptionData.systolic || ''}
                                    variant="outlined"
                                    size='small' />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    sx={examinationTextField}
                                    label="최저혈압"
                                    name="diastolic"
                                    onChange={handleChange}
                                    value={receptionData.diastolic || ''}
                                    variant="outlined"
                                    size='small' />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    sx={examinationTextField}
                                    label="혈당"
                                    name="blood_sugar"
                                    onChange={handleChange}
                                    value={receptionData.blood_sugar || ''}
                                    variant="outlined"
                                    size='small' />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2} >
                            <Grid item xs={2} sx={{ '.MuiGrid-root MuiGrid-item MuiGrid-grid-xs-2 css-1o7apob-MuiGrid-root': { marginLeft: "20px" } }} >
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
                                    style={{ height: "10px", width: "100%" }}
                                    sx={{
                                        '.css-jvc7vx-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "0.5em", paddingLeft: "10px" }
                                    }}
                                >
                                    {doctors.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={7.5}>
                                <TextField
                                    label="내원사유"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    rows={1}
                                    size='small'
                                    name="treatment_reason"
                                    onChange={handleChange}
                                    value={receptionData.treatment_reason || ''}
                                    sx={{ width: "100%", ".css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall": { padding: "0.5em" } }}
                                />
                            </Grid>
                            <Grid item xs={2} sx={{ marginLeft: 0.5 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                                    {receptionData.reception_id != null && (
                                        <Button type="submit" onClick={updateReceptionInfo} variant="contained" style={{ width: "30px", height: "30px" }}>수정</Button>
                                    )}
                                    {receptionData.reception_id == null && (
                                        <Button type="submit" onClick={receptDataHandleSubmit} variant="contained" style={{ width: "30px", height: "30px" }}>접수</Button>
                                    )}
                                    <Button type="reset" variant="contained" color="error" onClick={resetHandler} style={{ width: "30px", height: "30px" }}>취소</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}

            {receptionData != null && patient_id != null && (
                <Grid container spacing={2}>
                    <div style={{ width: "500px", height: "10px", marginBottom: "10px", marginTop: "2px" }}>
                        <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>접수 등록/수정&nbsp;&nbsp;[환자정보: {patientData.patient_name},{patientData.front_registration_number},{patientData.phone_number3}]</h5>
                    </div>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Hidden
                                id="outlined-basic"
                                InputLabelProps={{
                                    shrink: "true"
                                }}
                                label="환자번호"
                                name="patient_id"
                                value={patient_id || ''}
                                variant="outlined"
                                size='small'
                                readOnly={true}
                            />
                            <Grid item xs={2}>
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    sx={examinationTextField}
                                    label="키  [cm]"
                                    name="height"
                                    onChange={handleChange}
                                    value={receptionData.height || ''}
                                    variant="outlined"
                                    size='small' />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    sx={examinationTextField}
                                    label="체중  [kg]"
                                    name="weight"
                                    onChange={handleChange}
                                    value={receptionData.weight || ''}
                                    variant="outlined"
                                    size='small' />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    sx={examinationTextField}
                                    label="BMI"
                                    name="bmi"
                                    onChange={handleChange}
                                    value={receptionData.bmi || '' || calculateBMI(receptionData.height, receptionData.weight)}
                                    variant="outlined"
                                    size='small'
                                    readOnly={true} />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    sx={examinationTextField}
                                    label="최고혈압"
                                    name="systolic"
                                    onChange={handleChange}
                                    value={receptionData.systolic || ''}
                                    variant="outlined"
                                    size='small' />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    sx={examinationTextField}
                                    label="최저혈압"
                                    name="diastolic"
                                    onChange={handleChange}
                                    value={receptionData.diastolic || ''}
                                    variant="outlined"
                                    size='small' />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    sx={examinationTextField}
                                    label="혈당"
                                    name="blood_sugar"
                                    onChange={handleChange}
                                    value={receptionData.blood_sugar || ''}
                                    variant="outlined"
                                    size='small' />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2} >
                            <Grid item xs={2} sx={{ '.MuiGrid-root MuiGrid-item MuiGrid-grid-xs-2 css-1o7apob-MuiGrid-root': { marginLeft: "20px" } }} >
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
                                    style={{ height: "10px", width: "100%" }}
                                    sx={{
                                        '.css-jvc7vx-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "0.5em", paddingLeft: "10px" }
                                    }}
                                >
                                    {doctors.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={7.5}>
                                <TextField
                                    label="내원사유"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    rows={1}
                                    size='small'
                                    name="treatment_reason"
                                    onChange={handleChange}
                                    value={receptionData.treatment_reason || ''}
                                    sx={{ width: "100%", ".css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall": { padding: "0.5em" } }}
                                />
                            </Grid>
                            <Grid item xs={2} sx={{ marginLeft: 0.5 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                                    {receptionData.reception_id != null && (
                                        <Button type="submit" onClick={updateReceptionInfo} variant="contained" style={{ width: "30px", height: "30px" }}>수정</Button>
                                    )}
                                    {receptionData.reception_id == null && (
                                        <Button type="submit" onClick={handleSubmit} variant="contained" style={{ width: "30px", height: "30px" }}>접수</Button>
                                    )}
                                    <Button type="reset" variant="contained" color="error" onClick={resetHandler} style={{ width: "30px", height: "30px" }}>취소</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            )}
        </Paper>
    );
};

export default ReceptionForm;