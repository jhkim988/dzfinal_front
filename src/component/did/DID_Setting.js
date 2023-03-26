import { Box, Button, Checkbox, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { tableCellClasses } from "@mui/material/TableCell";
import axios from 'axios';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import DID_MessageModel from './model/DID_MessageModel';

const DID_Setting = () => {
    const [messages, onInsert, onAppend] = DID_MessageModel();
    const inputEl = useRef(null);
    const [value, setValue] = useState("");
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    };
    
    useEffect(() => {
        axios.get("/api/did/did_subtitle")
          .then((response) => {
            if(response.data !== null) {
                onAppend(response.data);
                console.log(messages);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }, [])
    
    const onInsert_click = useCallback(e => {
        inputEl.current.focus();
        
        if (value.length === 0) {
            alert("안내 문구를 입력해주세요");
            return;
        }
        onInsert(value);
        setValue("");
    }, [value]);

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    const [file, setFile] = useState(null);

    const handleFileSelect = (e) => {
        setFile(e.target.files[0]);
    };

    const onClick = () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", selectedValue);

        axios.post("/api/did/did_setting",
            formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then((response) => {
          console.log(response.data);
        });
      };

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <Paper>
                <Table sx={{
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none"
                    }
                }}>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        <TableRow>
                            <TableCell align="left">DID 타입</TableCell>
                            <TableCell align="left">
                                <FormControl fullWidth>
                                    <InputLabel>타입</InputLabel>
                                    <Select
                                      value={selectedValue}
                                        label="타입"
                                      onChange={handleChange}
                                    >
                                    <MenuItem value={'video'}>동영상</MenuItem>
                                    <MenuItem value={'screen'}>큰화면</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">동영상</TableCell>
                            <TableCell align="left">
                                <TextField label={selectedValue === 'video' ? "파일을 선택해주세요" : "" } variant="outlined" InputProps={{readOnly: true,}} value={file ? file.name : ''} />
                            </TableCell>
                            <TableCell align="left">
                                <label htmlFor="file-upload">
                                        <Button variant="contained" color='success' component="span" disabled={selectedValue !== 'video'}>
                                        업로드
                                        </Button>
                                    </label>
                                <input accept="video/*" id="file-upload" type="file" style={{ display: "none" }} onChange={handleFileSelect} disabled={selectedValue !== 'video'} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                                <TableCell align="left">안내 문구 설정</TableCell>
                                <TableCell align="left" colSpan={4}>
                                    <TextField label="안내 문구 설정" variant="outlined" fullWidth value={value} onChange={onChange} ref={inputEl}/>
                                </TableCell>
                                <TableCell align="left">
                                    <Button variant="contained" color='primary' onClick={onInsert_click}>추가</Button>
                                </TableCell>
                        </TableRow>
                        {messages.map((message) => (
                            <TableRow key={message.id}>
                                <TableCell align="right">
                                    <Checkbox checked={message.active} />
                                </TableCell>
                            <TableCell align="left" colSpan={4}><TextField variant="outlined" InputProps={{readOnly: true,}} fullWidth value={message.message} placeholder='할 일을 입력하세요' onChange={onChange} ref={inputEl}/></TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box sx={{display: 'flex', justifyContent: 'space-around', marginBottom: 2}}>
                    <Button variant="contained" onClick={onClick}>적용</Button>
                    <Button variant="contained" color='error'>취소</Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default React.memo(DID_Setting);