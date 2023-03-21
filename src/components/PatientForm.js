import { Button, Checkbox, createTheme, FormControlLabel, MenuItem, Paper, TextareaAutosize, TextField, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';

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

const PatientForm = ({ setPatient_id, patientData, setPatientData, setReceptionData }) => {
    const [isInsuranceChecked, setInsuranceChecked] = useState(false);
    const [popup, setPopup] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({
        zip_code: '',
        address: ''
    });

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
            insurance: ''
        });
        setSelectedAddress({
            zip_code: '',
            address: ''
        });
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setPatientData((patientData) => ({
            ...patientData,
            ...selectedAddress,
            [name]: value
        }));

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(Patient_API_BASE_URL, patientData)
            .then((response) => {
                alert(response.data.message);
                console.log("patient_id:" + response.data.patient_id);
                setPatient_id(response.data.patient_id);
            })
            .catch((error) => {
                alert("response.data.message");
                console.error(error);
            });
    };


    //우편번호 검색
    const handleComplete = (data) => {
        setPopup(!popup);
    }
    const closePostCode = () => {
        setPopup(false);
    }
    const handleInput = (e) => {
        setSelectedAddress({
            ...selectedAddress,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div>
            <div style={{ width: "100px", height: "10px", marginBottom: "5px" }}>
                <h5>환자 등록/수정</h5>
            </div>
            <Paper sx={{ marginBottom: 5, marginTop: 2 }} elevation={2} style={{ width: "450px", height: "280px" }}>
                <form onSubmit={handleSubmit}>

                    <Box component="form"
                        sx={{
                            '& > :not(style)': { m: 0.5, width: 100 },
                        }}
                        noValidate
                        autoComplete="off"


                    >


                        <TextField id="outlined-basic"
                            label="환자이름"
                            variant="outlined"
                            name="patient_name"
                            onChange={handleChange}
                            value={patientData.patient_name || ''}
                            size='small'
                            style={{ width: "130px", height: "10px" }}
                            autoComplete="off"
                        />



                        <TextField id="outlined-basic" label="주민등록번호" variant="outlined" name="front_registration_number" onChange={handleChange} value={patientData.front_registration_number || ''} size='small' />-
                        {/* 주민번호 뒷자리 숨김처리  */}
                        <TextField id="outlined-basic" label="뒷자리" onChange={handleChange} name="back_registration_number" value={patientData.back_registration_number || ''} variant="outlined" size='small' />
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="성별"
                            size='small'
                            name="gender"
                            onChange={handleChange}
                            value={patientData.gender || ''}
                            style={{ width: "70px", height: "10px" }}
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
                        <TextField id="outlined-basic" label="연락처1" name="phone_number1" onChange={handleChange} value={patientData.phone_number1 || ''} variant="outlined" size='small' />-
                        <TextField id="outlined-basic" label="연락처2" name="phone_number2" onChange={handleChange} value={patientData.phone_number2 || ''} variant="outlined" size='small' />-
                        <TextField id="outlined-basic" label="연락처3" name="phone_number3" onChange={handleChange} value={patientData.phone_number3 || ''} variant="outlined" size='small' />

                        <FormControlLabel
                            control={<Checkbox
                                checked={isInsuranceChecked}
                                onChange={handleChange}
                                value={patientData.insurance}
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
                            '& > :not(style)': { m: 0.5, width: 100 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic"
                            label="우편번호"
                            name="zip_code"
                            onChange={handleInput}
                            value={patientData.zip_code || '' || selectedAddress.zip_code}
                            variant="outlined"
                            size='small'
                            inputProps={{ readOnly: true }}
                        />

                        <Button variant="contained" onClick={handleComplete}>주소 검색</Button>
                        <TextField id="outlined-basic"
                            label="주소"
                            name="address"
                            value={patientData.address || '' || selectedAddress.address}
                            margin="dense"
                            onChange={handleInput}
                            variant="outlined"
                            size='small'
                            style={{ width: 440, height: "10px" }} />
                        {popup && <PopupPostCode company={selectedAddress} setcompany={setSelectedAddress} onClose={closePostCode}></PopupPostCode>}
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {
                                marginTop: 3, width: 100, marginLeft: 0.5
                            },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="상세주소" name="detail_address" onChange={handleChange} value={patientData.detail_address || ''} variant="outlined" size='small' margin='dense'
                            style={{ width: 440 }}
                        />
                    </Box>
                    <Button type="submit" variant="contained">등록</Button>
                    <Button type="reset" variant="contained" color="error" onClick={resetHandler}>취소</Button>
                </form>
            </Paper>


        </div >
    );
};

export default PatientForm;

// import { Button, Checkbox, createTheme, FormControlLabel, MenuItem, Paper, TextareaAutosize, TextField, ThemeProvider } from '@mui/material';
// import { Box } from '@mui/system';
// import SearchIcon from "@material-ui/icons/Search";
// import { InputAdornment } from "@material-ui/core";
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Patient_API_BASE_URL = "/api/patient";
// const gender = [
//     {
//         value: 'M',
//         label: 'M'
//     },
//     {
//         value: 'F',
//         label: 'F'
//     }
// ];

// const PatientForm = ({ setPatient_id, selectedReservationDetails, patientData, setPatientData }) => {
//     // console.log(selectedReservationDetails);

//     // const [isChecked, setIsChecked] = useState(false);

//     const resetHandler = (event) => {
//         setPatientData({
//             patient_name: '',
//             front_registration_number: '',
//             back_registration_number: '',
//             gender: '',
//             phone_number1: '',
//             phone_number2: '',
//             phone_number3: '',
//             zip_code: '',
//             address: '',
//             detail_address: '',
//             insurance: ''
//         });
//     };


//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setPatientData((patientData) => ({
//             ...patientData,
//             [name]: value
//         }));

//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         axios.post(Patient_API_BASE_URL, patientData)
//             .then((response) => {
//                 alert(response.data.message);
//                 console.log("patient_id:" + response.data.patient_id);
//                 setPatient_id(response.data.patient_id);
//             })
//             .catch((error) => {
//                 alert("response.data.message");
//                 console.error(error);
//             });
//     };

//     return (
//         <div>
//             <div style={{ width: "100px", height: "10px", marginBottom: "5px" }}>
//                 <h5>환자 등록/수정</h5>
//             </div>
//             <Paper sx={{ marginBottom: 5, marginTop: 2 }} elevation={2} style={{ width: "450px", height: "240px" }}>
//                 <form onSubmit={handleSubmit}>

//                     <Box component="form"
//                         sx={{
//                             '& > :not(style)': { m: 0.5, width: 100 },
//                         }}
//                         noValidate
//                         autoComplete="off"


//                     >
//                         <TextField id="outlined-basic" label="환자이름" variant="outlined" name="patient_name" onChange={handleChange} value={patientData.patient_name} size='small' style={{ width: "130px", height: "10px" }} />
//                         <TextField id="outlined-basic" label="주민등록번호" variant="outlined" name="front_registration_number" onChange={handleChange} value={patientData.front_registration_number} size='small' />-
//                         {/* 주민번호 뒷자리 숨김처리  */}
//                         <TextField id="outlined-basic" label="뒷자리" onChange={handleChange} name="back_registration_number" value={patientData.back_registration_number} variant="outlined" size='small' />
//                         <TextField
//                             id="outlined-select-currency"
//                             select
//                             label="성별"
//                             size='small'
//                             name="gender"
//                             onChange={handleChange}
//                             value={patientData.gender}
//                             style={{ width: "70px", height: "10px" }}
//                         >
//                             {gender.map((option) => (
//                                 <MenuItem key={option.value} value={option.value}>
//                                     {option.label}
//                                 </MenuItem>
//                             ))}
//                         </TextField>
//                     </Box>
//                     <Box component="form"
//                         sx={{
//                             '& > :not(style)': { m: 0.5, width: 80 },
//                         }}
//                         noValidate
//                         autoComplete="off"
//                     >
//                         <TextField id="outlined-basic" label="연락처1" name="phone_number1" onChange={handleChange} value={patientData.phone_number1} variant="outlined" size='small' />-
//                         <TextField id="outlined-basic" label="연락처2" name="phone_number2" onChange={handleChange} value={patientData.phone_number2} variant="outlined" size='small' />-
//                         <TextField id="outlined-basic" label="연락처3" name="phone_number3" onChange={handleChange} value={patientData.phone_number3} variant="outlined" size='small' />

//                         <FormControlLabel
//                             control={<Checkbox defaultChecked />}
//                             name="insurance"
//                             onChange={handleChange}
//                             label="보험여부"
//                             margin="dense"
//                             size='small'
//                             style={{ width: "110px", height: "10px" }}
//                         />

//                     </Box>
//                     <Box component="form"
//                         sx={{
//                             '& > :not(style)': { m: 0.5, width: 100 },
//                         }}
//                         noValidate
//                         autoComplete="off"
//                     >
//                         <TextField id="outlined-basic" label="우편번호" name="zip_code" onChange={handleChange} value={patientData.zip_code} variant="outlined" size='small' />
//                         <Button variant="contained">주소 검색</Button>
//                         <TextField id="outlined-basic" label="주소" name="address" onChange={handleChange} value={patientData.address} margin="dense" variant="outlined" size='small' style={{ width: "300px", height: "10px" }} />

//                     </Box>
//                     <Box
//                         component="form"
//                         sx={{
//                             '& > :not(style)': {
//                                 marginTop: 3, width: 100, marginLeft: 0.5
//                             },
//                         }}
//                         noValidate
//                         autoComplete="off"
//                     >
//                         <TextField id="outlined-basic" label="상세주소" name="detail_address" onChange={handleChange} value={patientData.detail_address} variant="outlined" size='small' margin='dense'
//                             style={{ width: 400 }}
//                         />
//                     </Box>
//                     <Button type="submit" variant="contained">등록</Button>
//                     <Button type="reset" variant="contained" color="error" onClick={resetHandler}>취소</Button>
//                 </form>
//             </Paper>


//         </div >
//     );
// };

// export default PatientForm;