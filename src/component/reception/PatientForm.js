import {
    Button, Checkbox, createTheme, Dialog,
    FormControlLabel, MenuItem, Paper, TextareaAutosize, TextField, ThemeProvider,
    Table, TableBody, TableCell, TableHead, TableRow, Grid
} from '@mui/material';
import { Box } from '@mui/system';
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import zIndex from '@mui/material/styles/zIndex';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Patient_API_BASE_URL = "/api/patient";
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

const PatientForm = ({ setPatient_id, patientData, setPatientData, setReceptionData, selectedAddress, setSelectedAddress }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [patient_name, setPatient_name] = useState('');
    const [autoCompleteList, setAutoCompleteList] = useState([]);

    const resetHandler = (event) => {
        setPatientData({
            patient_name: '',
            front_registration_number: '',
            back_registration_number: '',
            gender: '',
            phone_number1: '',
            phone_number2: '',
            phone_number3: '',
            detail_address: '',
            insurance: 'true'
        });
        setSelectedAddress({
            zip_code: '',
            address: ''
        });
    };

    const handleCheck = (event) => {
        setIsChecked(event.target.checked);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPatientData((patientData) => ({
            ...patientData,
            ...selectedAddress,
            ...isChecked,
            [name]: value
        }));
        setPatient_name(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (window.confirm(patientData.patient_name + "님의 환자 등록을 진행하시겠습니까?")) {
            axios.post(Patient_API_BASE_URL, patientData)
                .then((response) => {
                    alert(response.data.message);
                    console.log("patient_id:" + response.data.patient_id);
                    setPatient_id(response.data.patient_id);
                })
                .catch((error) => {
                    alert("회원등록 실패. 다시 시도 바랍니다.");
                    console.error(error);
                });
        } else {
            alert("환자 등록이 취소되었습니다. 다시 시도 바랍니다.");
            resetHandler();
        }

    };

    //환자이름검색
    const handleDropDownKey = (event) => {
        event.preventDefault();
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "Enter") {
            if (patient_name.length > 1) {
                axios.get(Patient_API_BASE_URL + `/list?patient_name=${patient_name}`)
                    .then((response) => {
                        setAutoCompleteList(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                setAutoCompleteList([]);
            }

        }
    }
    const removeAutoCompleteList = () => {
        setPatient_name('');
        setAutoCompleteList([]);
    }

    const selectedSearchPatient = (patient_id) => {
        alert(patient_id);
        // setPatient_name({
        //     patient_name: patient_name
        // });
        axios.get(Patient_API_BASE_URL + `/${patient_id}`)
            .then((response) => {
                console.log("자동완성 환자정보:", response.data);
                setPatientData(prev => ({ ...response.data }));
                setReceptionData(prev => ({ ...response.data }));
                //removeAutoCompleteList();
            })
            .catch((error) => {
                console.error(error);
            });

    }

    //우편번호 검색
    const handleComplete = (data) => {
        setOpen(true);
    }
    const closePostCode = () => {
        setOpen(false);
    }
    const handleInput = (e) => {
        setSelectedAddress({
            ...selectedAddress,
            [e.target.name]: e.target.value,
        })
    }

    const tableStyle = {
        position: "fixed",
        zIndex: "9999",
        background: "white",
        width: "150px", height: "auto"
    }
    return (
        <>
            <div style={{ width: "100px", height: "10px", marginBottom: "5px" }}>
                <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>환자 등록/수정</h5>
            </div>
            <Paper sx={{ marginTop: 2, height: 140 }} elevation={2}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Box component="form"
                            sx={{
                                '& > :not(style)': { m: 0.5, width: 100 },
                                '& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "3px", paddingLeft: "10px" }
                            }}
                            noValidate
                            autoComplete="off"
                        >

                            <TextField id="outlined-basic"
                                InputLabelProps={{
                                    shrink: "true"
                                }}
                                label="환자이름 검색"
                                variant="outlined"
                                name="patient_name"
                                onChange={handleChange}
                                value={patientData.patient_name || ''}
                                size='small'
                                style={{ width: "130px", height: "10px" }}
                                autoComplete="off"
                                onKeyUp={handleDropDownKey}
                            />
                            {
                                autoCompleteList.length > 0 && (
                                    <div style={tableStyle}>
                                        <Table >
                                            <TableBody>
                                                {autoCompleteList.map((patient) => (
                                                    <TableRow
                                                        key={patient.patient_id}
                                                        hover
                                                        onClick={() => { selectedSearchPatient(patient.patient_id); removeAutoCompleteList(); }}

                                                    >
                                                        <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>{patient.patient_name}</TableCell>
                                                        <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>{patient.front_registration_number}</TableCell>
                                                        <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>{patient.phone_number3}</TableCell>
                                                    </TableRow>
                                                ))}
                                                <Button variant="contained" onClick={() => { removeAutoCompleteList(); }}>닫기</Button>
                                            </TableBody>
                                        </Table>
                                    </div>
                                )
                            }
                            {

                                patient_name.length > 1 && autoCompleteList.length === 0 && (
                                    //handleAlet()
                                    <div style={tableStyle}>
                                        < Table style={{ width: "150px", height: "10px" }}>
                                            <TableBody>
                                                <TableCell colSpan={3} align="center"
                                                    style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}
                                                >
                                                    입력하신 환자는 <br />존재하지 않습니다.
                                                </TableCell>
                                                <TableRow>
                                                    <Button variant="contained" onClick={() => { removeAutoCompleteList(); }}>닫기</Button>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                )
                            }


                            <TextField id="outlined-basic"
                                InputLabelProps={{
                                    shrink: "true"
                                }}
                                label="주민등록번호"
                                variant="outlined"
                                name="front_registration_number"
                                onChange={handleChange}
                                value={patientData.front_registration_number || ''}
                                size='small' />-
                            {/* 주민번호 뒷자리 숨김처리  */}
                            <TextField id="outlined-basic"
                                onChange={handleChange}
                                name="back_registration_number"
                                value={patientData.back_registration_number || ''}
                                variant="outlined"
                                size='small' />
                            <TextField
                                id="outlined-select-currency"
                                select
                                InputLabelProps={{
                                    shrink: "true"
                                }}
                                label="성별"
                                size='small'
                                name="gender"
                                onChange={handleChange}
                                value={patientData.gender || ''}
                                style={{ width: "70px", height: "10px" }}
                                sx={{
                                    '.css-jvc7vx-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "3px", paddingLeft: "10px" }
                                }}
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
                                '& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "3px", paddingLeft: "10px" }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="outlined-basic"
                                InputLabelProps={{
                                    shrink: "true"
                                }}
                                label="연락처"
                                name="phone_number1"
                                onChange={handleChange}
                                value={patientData.phone_number1 || ''}
                                variant="outlined"
                                size='small' />-
                            <TextField id="outlined-basic" name="phone_number2" onChange={handleChange} value={patientData.phone_number2 || ''} variant="outlined" size='small' />-
                            <TextField id="outlined-basic" name="phone_number3" onChange={handleChange} value={patientData.phone_number3 || ''} variant="outlined" size='small' />

                            <FormControlLabel
                                control={<Checkbox
                                    checked={isChecked}
                                    onChange={handleCheck}
                                    value={patientData.insurance === true ? 1 : 0}
                                />}
                                name="insurance"
                                label="보험여부"
                                margin="dense"
                                size='small'
                                style={{ width: "110px", height: "10px" }}
                            />

                        </Box>
                        <Box component="form"
                            sx={{
                                '& > :not(style)': { m: 0.5, width: 70 },
                                '& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "3px", paddingLeft: "10px" }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Box style={{ float: "left" }}>
                                <TextField id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    label="우편번호"
                                    name="zip_code"
                                    onChange={handleInput}
                                    value={patientData.zip_code || '' || selectedAddress.zip_code}
                                    variant="outlined"
                                    size='small'
                                    inputProps={{ readOnly: true }}
                                />
                            </Box>
                            <TextField id="outlined-basic"
                                InputLabelProps={{
                                    shrink: "true"
                                }}
                                label="주소"
                                name="address"
                                value={patientData.address || '' || selectedAddress.address}
                                margin="dense"
                                onChange={handleInput}
                                variant="outlined"
                                size='small'
                                style={{ width: 285, height: "10px" }} />

                            <Box style={{ float: "right" }}>
                                <Button variant="contained" onClick={handleComplete} style={{ width: "50px", height: "20px" }}>검색</Button>
                            </Box>
                            <Dialog open={open} onClose={closePostCode}>
                                <PopupPostCode company={selectedAddress} setcompany={setSelectedAddress} onClose={closePostCode}></PopupPostCode>
                            </Dialog>
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 0.5 },
                                '& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "3px", paddingLeft: "10px" }

                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="outlined-basic" label="상세주소" name="detail_address" onChange={handleChange} value={patientData.detail_address || ''} variant="outlined" size='small'
                                style={{
                                    width: 270
                                }}
                                InputLabelProps={{
                                    shrink: "true"
                                }}
                            />
                        </Box>
                        <Box style={{ float: "right" }}>
                            <Button type="submit" variant="contained" style={{ width: "30px", height: "20px" }}>등록</Button>
                            <Button type="reset" variant="contained" color="error" onClick={resetHandler} style={{ width: "30px", height: "20px" }}>취소</Button>
                        </Box>

                    </div >
                </form>
            </Paper>
        </>
    );
};

export default PatientForm;
