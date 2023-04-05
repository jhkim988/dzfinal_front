import {
    Button,
    Checkbox,
    createTheme,
    Dialog,
    FormControlLabel,
    MenuItem,
    Paper,
    TextareaAutosize,
    TextField,
    ThemeProvider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Grid,
    Autocomplete,
} from "@mui/material";
import { Box, height } from "@mui/system";
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PopupDom from "./PopupDom";
import PopupPostCode from "./PopupPostCode";
import axios from "axios";
import PatientAutoComplete from "./PatientAutoComplete";


const Patient_API_BASE_URL = "/api/patient";

const gender = [
    {
        value: "M",
        label: "M",
    },
    {
        value: "F",
        label: "F",
    },
];

const PatientForm = ({
    setPatient_id,
    patientData,
    setPatientData,
    setReceptionData,
    selectedAddress,
    setSelectedAddress,
}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [patient_name, setPatient_name] = useState("");
    const [autoCompleteList, setAutoCompleteList] = useState([]);

    const resetHandler = (event) => {
        setPatientData({
            patient_name: "",
            front_registration_number: "",
            back_registration_number: "",
            gender: "",
            phone_number1: "",
            phone_number2: "",
            phone_number3: "",
            detail_address: "",
            insurance: "true",
        });
        setSelectedAddress({
            zip_code: "",
            address: "",
        });
    };

    const handleCheck = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPatientData((patientData) => ({
            ...patientData,
            ...selectedAddress,
            ...isChecked,
            [name]: value,
        }));
        setPatient_name(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (
            window.confirm(
                patientData.patient_name + "님의 환자 등록을 진행하시겠습니까?"
            )
        ) {
            axios
                .post(Patient_API_BASE_URL, patientData)
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
        if (
            event.key !== "ArrowDown" &&
            event.key !== "ArrowUp" &&
            event.key !== "Enter"
        ) {
            if (patient_name.length > 1) {
                axios
                    .get(Patient_API_BASE_URL + `/list?patient_name=${patient_name}`)
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
    };

    const removeAutoCompleteList = () => {
        setPatient_name("");
        setAutoCompleteList([]);
    };
    const updatePatientInfo = () => {
        if (window.confirm("[ 환자번호 : " + patientData.patient_id + " ]" + patientData.patient_name + "님의 환자 정보를 수정하시겠습니까?")) {
            axios.post(Patient_API_BASE_URL + "/update", patientData)
                .then((response) => {
                    alert("환자 수정 성공");
                    setPatientData(prev => ({ ...response.data }));
                })
                .catch((error) => {
                    alert("환자 수정 실패, 확인바람 ");
                    console.error(error);
                });
        } else {
            alert("취소되었습니다.");
            resetHandler();
        }
    };

    const selectedSearchPatient = (patient_id) => {
        //alert(patient_id);
        if (
            window.confirm(
                "[ 환자번호 : " +
                patient_id +
                " ]" +
                patientData.patient_name +
                "님의 환자 정보를 보시겠습니까?"
            )
        ) {
            axios
                .get(Patient_API_BASE_URL + `/${patient_id}`)
                .then((response) => {
                    console.log("자동완성 환자정보:", response.data);
                    setPatientData((prev) => ({ ...response.data }));
                    setReceptionData((prev) => ({ ...response.data }));
                    setIsChecked((prev) => ({ ...response.data }));
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            alert("취소되었습니다. 환자 재검색 바랍니다.");
            removeAutoCompleteList();
        }
    };


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
        marginTop: "19px",
        marginLeft: "5px",
        position: "fixed",
        zIndex: "9999",
        background: "white",
        width: "250px",
        height: "auto"
    }
    return (
        <>

            <Paper sx={{ height: "24vh" }} elevation={1}>
                <div style={{ width: "100px", height: "10px", marginBottom: "5px" }}>
                    <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>환자 등록/수정</h5>
                </div>
                <div style={{ marginTop: "1em", marginLeft: "1em" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <PatientAutoComplete setPatientData={setPatientData} patientData={patientData} setIsChecked={setIsChecked} setReceptionData={setReceptionData} />
                        </Grid>
                        <Grid item xs={5} sx={{ paddingLeft: 0 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                                <TextField
                                    id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    sx={{
                                        '& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "0.5em", paddingLeft: "10px" }
                                    }}
                                    label="주민등록번호"
                                    variant="outlined"
                                    name="front_registration_number"
                                    onChange={handleChange}
                                    value={patientData.front_registration_number || ''}
                                    size='small'
                                />-
                                <TextField
                                    id="outlined-basic"
                                    onChange={handleChange}
                                    sx={{
                                        marginRight: 0.5,
                                        '& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "0.5em", paddingLeft: "10px" }
                                    }}
                                    name="back_registration_number"
                                    value={patientData.back_registration_number || ''}
                                    variant="outlined"
                                    size='small'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={2} sx={{ marginLeft: 0.5 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                                {patientData.patient_id == null && (
                                    <Button type="submit" onClick={handleSubmit} variant="contained" style={{ width: "30px", height: "30px" }}>등록</Button>
                                )}
                                {patientData.patient_id != null && patientData.patient_id == 0 && (
                                    <Button type="submit" onClick={handleSubmit} variant="contained" style={{ width: "30px", height: "30px" }}>등록</Button>
                                )}
                                {patientData.patient_id != null && patientData.patient_id != 0 && (
                                    <Button type="submit" onClick={updatePatientInfo} variant="contained" style={{ width: "30px", height: "30px" }}>수정</Button>
                                )}
                                <Button type="reset" variant="contained" color="error" onClick={resetHandler} style={{ width: "30px", height: "30px", marginRight: "5px" }}>취소</Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ paddingTop: 1.5 }}>
                        <Grid item xs={7}>
                            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                                <TextField
                                    id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: "true"
                                    }}
                                    sx={{
                                        marginLeft: 0.5,
                                        '& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "0.5em", paddingLeft: "10px" }
                                    }}
                                    label="연락처"
                                    name="phone_number1"
                                    onChange={handleChange}
                                    value={patientData.phone_number1 || ''}
                                    variant="outlined"
                                    size='small' />ㅡ
                                <TextField
                                    id="outlined-basic"
                                    sx={{
                                        '& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "0.5em", paddingLeft: "10px" }
                                    }}
                                    name="phone_number2"
                                    onChange={handleChange}
                                    value={patientData.phone_number2 || ''}
                                    variant="outlined"
                                    size='small'
                                />ㅡ
                                <TextField
                                    id="outlined-basic"
                                    sx={{
                                        '& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "0.5em", paddingLeft: "10px" }
                                    }}
                                    name="phone_number3"
                                    onChange={handleChange}
                                    value={patientData.phone_number3 || ''}
                                    variant="outlined"
                                    size='small'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                InputLabelProps={{
                                    shrink: "true"
                                }}
                                sx={{
                                    width: "100%",
                                    height: 10,
                                    '.css-jvc7vx-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "0.5em", paddingLeft: "10px" }
                                }}
                                label="성별"
                                size='small'
                                name="gender"
                                onChange={handleChange}
                                value={patientData.gender || ''}
                            // style={{ width: "70px", height: "10px" }}
                            >
                                {gender.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={3} >
                            <FormControlLabel
                                control={<Checkbox
                                    checked={isChecked}
                                    onChange={handleCheck}
                                    value={patientData.insurance === true ? 1 : 0}
                                />}
                                name="insurance"
                                label="보험여부"
                                margin="dense"
                                style={{ width: "110px" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                sx={{
                                    '& > :not(style)': { m: 0.5 },
                                    '& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "0.5em", paddingLeft: "10px" }
                                }}
                                id="outlined-basic"
                                InputLabelProps={{
                                    shrink: "true"
                                }}
                                label="우편번호"
                                name="zip_code"
                                onChange={handleInput}
                                onClick={handleComplete}
                                placeholder='주소 검색'
                                value={patientData.zip_code || '' || selectedAddress.zip_code}
                                variant="outlined"
                                size='small'
                                inputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={8} sx={{ display: "flex", justifyContent: "space-around" }}>
                            <TextField
                                id="outlined-basic"
                                sx={{
                                    m: 0.5,
                                    width: "100%",
                                    '& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "0.5em", paddingLeft: "10px" }
                                }}
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
                                placeholder='주소 검색시 클릭하세요.'
                                onClick={handleComplete}
                                autoComplete="false"
                            />
                            <Dialog open={open} onClose={closePostCode}>
                                <PopupPostCode company={selectedAddress} setcompany={setSelectedAddress} onClose={closePostCode}></PopupPostCode>
                            </Dialog>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={11}>
                            <TextField
                                id="outlined-basic"
                                label="상세주소"
                                name="detail_address"
                                onChange={handleChange}
                                value={patientData.detail_address || ''}
                                variant="outlined"
                                size='small'
                                InputLabelProps={{
                                    shrink: "true"
                                }}
                                sx={{
                                    width: "100%",
                                    '& > :not(style)': { m: 0.5 },
                                    '& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': { padding: "0.5em", paddingLeft: "10px" }
                                }}
                            />
                        </Grid>
                    </Grid>

                </div >
            </Paper >
        </>
    );
};

export default PatientForm;
