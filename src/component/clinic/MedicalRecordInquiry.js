import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Stack } from '@mui/system';

const MedicalRecordInquiry = () => {
    // Select
    const [type, setType] = useState('');
    const handleChange = (event) => {
        setType(event.target.value);
    };

    // Table
    function createData(name, doctor, disease_name, drug_name, created_at) {
        return { name, doctor, disease_name, drug_name, created_at };
      }
      
      const rows = [
        createData('이정주', '김을지', '두통', '타이레놀', '2023-03-01'),
        createData('이정주', '이더존', '복통', '물약', '2023-03-02'),
        createData('이정주', '김을지', '두통', '타이레놀', '2023-03-03'),
        createData('이정주', '이더존', '복통', '물약', '2023-03-04'),
        createData('이정주', '이더존', '복통', '물약', '2023-03-05'),
        createData('이정주', '김을지', '두통', '타이레놀', '2023-03-06'),
        createData('이정주', '김을지', '두통', '타이레놀', '2023-03-07'),
        createData('이정주', '김을지', '두통', '타이레놀', '2023-03-08'),
      ];

    return (
        <Paper sx={{marginTop: 2, height: '45vh'}} elevation={3}>
            <Box>
                진료기록조회
            </Box>
            <Box sx={{display: 'flex'}}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel>분류</InputLabel>
                    <Select value={type} onChange={handleChange}>
                        <MenuItem value={'patient_name'}>환자이름</MenuItem>
                        <MenuItem value={'reception_id'}>접수번호</MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateRangePicker']} >
                        <DateRangePicker localeText={{ start: '기간 시작', end: '기간 끝' }}
                            format="YYYY-MM-DD"
                            sx={{ '& .MuiTextField-root': { width: '130px' },
                            '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { paddingLeft: '10px' },
                            '& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': { height: '40px'},
                            '& .css-ctjfle-MuiStack-root-MuiMultiInputDateRangeField-root': { marginLeft: '8px' },
                        }}/>
                    </DemoContainer>
                </LocalizationProvider>
                <TextField label="검색어" size="small" sx={{ alignSelf: 'center' }}/>
                <Button variant="contained" sx={{ height: '40px', alignSelf: 'center'}}>검색</Button>
            </Box>
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">이름</TableCell>
                            <TableCell align="center">담당의</TableCell>
                            <TableCell align="center">진단명</TableCell>
                            <TableCell align="center">처방약</TableCell>
                            <TableCell align="center">진단날짜</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" align="center">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.doctor}</TableCell>
                            <TableCell align="center">{row.disease_name}</TableCell>
                            <TableCell align="center">{row.drug_name}</TableCell>
                            <TableCell align="center">{row.created_at}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Stack spacing={2}>
                    <Pagination count={10} />
                </Stack>
            </Box>
        </Paper>
    );
};

export default MedicalRecordInquiry;