import {
    Button,
    Checkbox,
    Dialog,
    FormControlLabel,
    MenuItem,
    Paper,
    TextField,
    Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import PopupPostCode from "./PopupPostCode";
import PatientAutoComplete from "./PatientAutoComplete";
import axiosClient from './../login/AxiosClient';

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
    // const [isChecked, setIsChecked] = useState(false);

    const [open, setOpen] = React.useState(false);
    const [patient_name, setPatient_name] = useState("");

    //예외처리
    const [isFrontInvalid, setIsFrontInvalid] = useState(false);
    const [isBackInvalid, setisBackInvalid] = useState(false);
    const [isPhone1Invalid, setIsPhone1Invalid] = useState(false);
    const [isPhone2Invalid, setIsPhone2Invalid] = useState(false);
    const [isPhone3Invalid, setIsPhone3Invalid] = useState(false);
    const [isGenderInvalid, setIsGenderInvalid] = useState(false);


    //초기화
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
            insurance: false,
        });
        setSelectedAddress({
            zip_code: "",
            address: "",
        });
    };

    const setCompanyAddress = (companyAddress) => {
        setPatientData({
            ...patientData,
            zip_code: companyAddress.zip_code,
            address: companyAddress.address
        });
        setSelectedAddress({
            zip_code: companyAddress.zip_code,
            address: companyAddress.address
        });
    }

    const handleCheck = (event) => {
        // setIsChecked(event.target.checked);
        setPatientData(prev => ({...prev, insurance: event.target.checked }))
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'front_registration_number') {
            if (value.length == 6 || value.length == 0) {
                setIsFrontInvalid(false);
            } else {
                setIsFrontInvalid(true);
            }
        } else if (name === 'back_registration_number') {
            if (value.length == 7 || value.length == 0) {
                setisBackInvalid(false);
            } else {
                setisBackInvalid(true);
            }
        }

        if (name === 'phone_number1') {
            if (value.length == 3 || value == 0) {
                setIsPhone1Invalid(false);
            } else {
                setIsPhone1Invalid(true);
            }
        } else if (name === 'phone_number2') {
            if (value.length == 4 || value == 0) {
                setIsPhone2Invalid(false);
            } else {
                setIsPhone2Invalid(true);
            }
        } else if (name === 'phone_number3') {
            if (value.length == 4 || value == 0) {
                setIsPhone3Invalid(false);
            } else {
                setIsPhone3Invalid(true);
            }
        }

        if (name === 'gender') {
            if (!value) {
                setIsGenderInvalid(true);
            } else {
                setIsGenderInvalid(false);
            }
        }

        setPatientData((patientData) => ({
            ...patientData,
            ...selectedAddress,
            [name]: value
        }));
        setPatient_name(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (window.confirm(patientData.patient_name + "님의 환자 등록을 진행하시겠습니까?")) {
            if (patientData.gender === "") {
                alert("환자 정보 입력값을 확인 바랍니다.");
                setIsGenderInvalid(true);
            } else {
                setIsGenderInvalid(false);
                axiosClient.post(Patient_API_BASE_URL, patientData)
                    .then((response) => {
                        alert(response.data.message);
                        console.log("patient_id:" + response.data.patient_id);
                        setPatient_id(response.data.patient_id);
                    })
                    .catch((error) => {
                        alert("환자등록 실패. 다시 시도 바랍니다.");
                        console.error(error);
                    });
            }
        } else {
            alert("환자 등록이 취소되었습니다. 다시 시도 바랍니다.");
            resetHandler();
        }

    };

    const updatePatientInfo = () => {
        if (window.confirm("[ 환자번호 : " + patientData.patient_id + " ]" + patientData.patient_name + "님의 환자 정보를 수정하시겠습니까?")) {
            axiosClient.post(Patient_API_BASE_URL + "/update", patientData)
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

    //우편번호 검색
    const handleComplete = (data) => {
        setOpen(true);
    };
    const closePostCode = () => {
        setOpen(false);
    };
    const handleInput = (e) => {
        setSelectedAddress({
            ...selectedAddress,
            [e.target.name]: e.target.value,
        });
    };

    const onSelect = (e, value) => {
        axiosClient
            .get(`/api/patient/${value.patient_id}`)
            .then(({ data }) => {
                setPatientData(data);
                setReceptionData(prev => ({ ...prev, ...data }));
            });
    }

    return (
        <>
            <Paper sx={{ height: "24vh" }} elevation={1}>
                <Grid container>
                    <Grid item xs={12}>
                        <h5 style={{ marginTop: 0, marginBottom: 0 }}>
                            환자 등록/수정
                        </h5>
                    </Grid>
                </Grid>
                <div style={{ marginTop: "1vh", marginLeft: "0.7vw" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <PatientAutoComplete
                                patient_name={patientData.patient_name}
                                onSelect={onSelect}
                                onInputChange={(e, value, reason) => {
                                    if (reason === "input") {
                                        resetHandler();
                                        setPatientData(prev => ({ ...prev, patient_name: value }));
                                    } else if (reason === "clear") {
                                        resetHandler();
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={5} sx={{ paddingLeft: 0 }}>
                            {/* 재진환자 주민등록번호 수정 불가능 */}
                            {patientData.patient_id != null &&
                                patientData.patient_id != 0 && (
                                    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                                        <TextField
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            sx={{
                                                "& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall":
                                                    { padding: "0.5em", paddingLeft: "10px" },
                                            }}
                                            label="주민등록번호"
                                            variant="outlined"
                                            name="front_registration_number"
                                            //onChange={handleChange}
                                            value={patientData.front_registration_number || ""}
                                            size="small"
                                            readOnly={true}
                                        />
                                        <p style={{ margin: 3 }}>─</p>
                                        <TextField
                                            //onChange={handleChange}
                                            sx={{
                                                marginRight: 0.5,
                                                "& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall":
                                                    { padding: "0.5em", paddingLeft: "10px" },
                                            }}
                                            name="back_registration_number"
                                            value={patientData.back_registration_number || ""}
                                            variant="outlined"
                                            size="small"
                                            readOnly={true}
                                        />
                                    </Box>
                                )}
                            {/* 접수화면 접속 시 기본 화면 */}
                            {patientData.patient_id == null && (
                                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        sx={{
                                            "& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall":
                                                { padding: "0.5em", paddingLeft: "10px" },
                                        }}
                                        label="주민등록번호"
                                        variant="outlined"
                                        name="front_registration_number"
                                        onChange={handleChange}
                                        value={patientData.front_registration_number || ""}
                                        size="small"
                                        error={isFrontInvalid}
                                    />
                                    <p style={{ margin: 3 }}>─</p>
                                    <TextField
                                        onChange={handleChange}
                                        sx={{
                                            marginRight: 0.5,
                                            "& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall":
                                                { padding: "0.5em", paddingLeft: "10px" },
                                        }}
                                        name="back_registration_number"
                                        value={patientData.back_registration_number || ""}
                                        variant="outlined"
                                        size="small"
                                        error={isBackInvalid}
                                    />
                                </Box>
                            )}
                            {patientData.patient_id != null &&
                                patientData.patient_id == 0 && (
                                    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                                        <TextField
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            sx={{
                                                "& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall":
                                                    { padding: "0.5em", paddingLeft: "10px" },
                                            }}
                                            label="주민등록번호"
                                            variant="outlined"
                                            name="front_registration_number"
                                            onChange={handleChange}
                                            value={patientData.front_registration_number || ""}
                                            size="small"
                                            error={isFrontInvalid}
                                        />
                                        <p style={{ margin: 3 }}>─</p>
                                        <TextField
                                            onChange={handleChange}
                                            sx={{
                                                marginRight: 0.5,
                                                "& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall":
                                                    { padding: "0.5em", paddingLeft: "10px" },
                                            }}
                                            name="back_registration_number"
                                            value={patientData.back_registration_number || ""}
                                            variant="outlined"
                                            size="small"
                                            error={isBackInvalid}
                                        />
                                    </Box>
                                )}
                        </Grid>
                        <Grid item xs={2} sx={{ marginLeft: 0.5 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                                {patientData.patient_id == null && (
                                    <Button
                                        type="submit"
                                        onClick={handleSubmit}
                                        variant="contained"
                                        sx={{ width: "10vw", height: "3.5vh", marginLeft: 2 }}
                                    >
                                        등록
                                    </Button>
                                )}
                                {patientData.patient_id != null &&
                                    patientData.patient_id == 0 && (
                                        <Button
                                            type="submit"
                                            onClick={handleSubmit}
                                            variant="contained"
                                            sx={{ width: "10vw", height: "3.5vh", marginLeft: 2 }}
                                        >
                                            등록
                                        </Button>
                                    )}
                                {patientData.patient_id != null &&
                                    patientData.patient_id != 0 && (
                                        <Button
                                            type="submit"
                                            onClick={updatePatientInfo}
                                            variant="contained"
                                            sx={{ width: "10vw", height: "3.5vh", marginLeft: 2 }}
                                        >
                                            수정
                                        </Button>
                                    )}
                                <Button
                                    type="reset"
                                    variant="contained"
                                    color="error"
                                    onClick={resetHandler}
                                    sx={{ width: "10vw", height: "3.5vh", marginLeft: 1 }}
                                >
                                    취소
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ paddingTop: 0.5 }}>
                        <Grid item xs={7}>
                            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{
                                        marginLeft: 0.5,
                                        "& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall":
                                            { padding: "0.5em", paddingLeft: "10px" },
                                    }}
                                    label="연락처"
                                    name="phone_number1"
                                    onChange={handleChange}
                                    value={patientData.phone_number1 || ""}
                                    variant="outlined"
                                    size="small"
                                    error={isPhone1Invalid}
                                />
                                <p style={{ margin: 3 }}>─</p>

                                <TextField
                                    sx={{
                                        "& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall":
                                            { padding: "0.5em", paddingLeft: "10px" },
                                    }}
                                    name="phone_number2"
                                    onChange={handleChange}
                                    value={patientData.phone_number2 || ""}
                                    variant="outlined"
                                    size="small"
                                    error={isPhone2Invalid}
                                />
                                <p style={{ margin: 3 }}>─</p>
                                <TextField
                                    sx={{
                                        "& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall":
                                            { padding: "0.5em", paddingLeft: "10px" },
                                    }}
                                    name="phone_number3"
                                    onChange={handleChange}
                                    value={patientData.phone_number3 || ""}
                                    variant="outlined"
                                    size="small"
                                    error={isPhone3Invalid}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            {patientData.patient_id == null && (
                                <TextField
                                    select
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{
                                        width: "100%",
                                        height: 10,
                                        ".css-jvc7vx-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall":
                                            { padding: "0.5em", paddingLeft: "10px" },
                                    }}
                                    label="성별"
                                    size="small"
                                    name="gender"
                                    onChange={handleChange}
                                    value={patientData.gender || ""}
                                    style={{ width: "70px", height: "10px" }}
                                    error={isGenderInvalid}
                                >
                                    {gender.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                            {patientData.patient_id != null &&
                                patientData.patient_id == 0 && (
                                    <TextField
                                        select
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        sx={{
                                            width: "100%",
                                            height: 10,
                                            ".css-jvc7vx-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall":
                                                { padding: "0.5em", paddingLeft: "10px" },
                                        }}
                                        label="성별"
                                        size="small"
                                        name="gender"
                                        onChange={handleChange}
                                        value={patientData.gender || ""}
                                        style={{ width: "70px", height: "10px" }}
                                        error={isGenderInvalid}
                                    >
                                        {gender.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            {/* 환자 정보 수정 시 성별 수정 불가능 */}
                            {patientData.patient_id != null &&
                                patientData.patient_id != 0 && (
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        sx={{
                                            width: "100%",
                                            height: 10,
                                            ".css-jvc7vx-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall":
                                                { padding: "0.5em", paddingLeft: "10px" },
                                        }}
                                        label="성별"
                                        size="small"
                                        name="gender"
                                        value={patientData.gender || ""}
                                        style={{ width: "70px", height: "10px" }}
                                        readOnly={true}
                                    >
                                    </TextField>
                                )}

                        </Grid>
                        <Grid item xs={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={patientData.insurance}
                                        onChange={handleCheck}
                                        value={patientData.insurance === 1 ? true : false}
                                        name="insurance"
                                    />
                                }
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
                                    "& > :not(style)": { m: 0.5 },
                                    "& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall":
                                        { padding: "0.5em", paddingLeft: "10px" },
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="우편번호"
                                name="zip_code"
                                onChange={handleInput}
                                onClick={handleComplete}
                                placeholder="주소 검색"
                                value={patientData.zip_code || "" || selectedAddress.zip_code}
                                variant="outlined"
                                size="small"
                                inputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={8}
                            sx={{ display: "flex", justifyContent: "space-around" }}
                        >
                            <TextField
                                sx={{
                                    m: 0.5,
                                    width: "100%",
                                    "& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall":
                                        { padding: "0.5em", paddingLeft: "10px" },
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="주소"
                                name="address"
                                value={patientData.address || "" || selectedAddress.address}
                                margin="dense"
                                onChange={handleInput}
                                variant="outlined"
                                size="small"
                                placeholder="주소 검색시 클릭하세요."
                                onClick={handleComplete}
                                autoComplete="false"
                            />
                            <Dialog open={open} onClose={closePostCode}>
                                <PopupPostCode
                                    company={selectedAddress}
                                    setCompany={setCompanyAddress}
                                    onClose={closePostCode}
                                ></PopupPostCode>
                            </Dialog>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={11}>
                            <TextField
                                label="상세주소"
                                name="detail_address"
                                onChange={handleChange}
                                value={patientData.detail_address || ""}
                                variant="outlined"
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{
                                    width: "100%",
                                    "& > :not(style)": { m: 0.5 },
                                    "& .css-11f7gl5-MuiInputBase-input-MuiOutlinedInput-input.MuiInputBase-inputSizeSmall":
                                        { padding: "0.5em", paddingLeft: "10px" },
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </>
    );
};

export default PatientForm;
