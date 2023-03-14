import { Button, Checkbox, FormControlLabel, FormGroup, MenuItem, TextareaAutosize, TextField } from '@mui/material';
import React from 'react';


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

const Reception = () => {
    return (
        <div>
            <div>
                <h2>접수등록</h2>
                <TextField id="outlined-basic" label="이름" variant="outlined" margin="dense" />
                <Button variant="contained">접수</Button>
                <Button variant="outlined">취소</Button>
            </div>

            <div>
                <TextField id="outlined-basic" label="접수번호" variant="outlined" margin="dense" />
                <TextField
                    id="outlined-select-currency"
                    select
                    label="담당의"
                    defaultValue="김더존"
                //helperText="담당의를 입력하세요"
                >
                    {doctors.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <FormControlLabel control={<Checkbox defaultChecked />} label="보험여부" />
            </div>
            <div>
                <TextField id="outlined-basic" label="주민등록번호" variant="outlined" margin="dense" />
                <TextField id="outlined-basic" label="주민등록번호" variant="outlined" margin="dense" />
                <TextField id="outlined-basic" label="환자이름" variant="outlined" margin="dense" />
            </div>
            <div>
                <TextField id="outlined-basic" label="연락처" variant="outlined" margin="dense" />
                <TextField
                    id="outlined-select-currency"
                    select
                    label="성별"
                    defaultValue="M"
                >
                    {gender.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div>
                <TextField id="outlined-basic" label="키" variant="outlined" margin="dense" />cm
                <TextField id="outlined-basic" label="체중" variant="outlined" margin="dense" />kg
                <TextField id="outlined-basic" label="BMI" variant="outlined" margin="dense" />
            </div>
            <div>
                <TextField id="outlined-basic" label="최고혈압" variant="outlined" margin="dense" />
                <TextField id="outlined-basic" label="최저혈압" variant="outlined" margin="dense" />
                <TextField id="outlined-basic" label="혈당" variant="outlined" margin="dense" />
            </div>
            <div>
                {/* <TextField id="outlined-basic" label="진료사유" variant="outlined" margin="dense" /> */}
                <TextareaAutosize
                    maxRows={4}//teatArea 스크롤
                    aria-label="진료사유"
                    minRows={10}
                    placeholder="내용을 입력하세요"
                    style={{ width: 500 }}
                />
            </div>
            <div>
                <TextField id="outlined-basic" label="우편번호" variant="outlined" margin="dense" />
                <TextField id="outlined-basic" label="주소" variant="outlined" margin="dense" />
                <br />
                <TextField id="outlined-basic" label="상세주소" variant="outlined" margin="dense"
                    style={{ width: 500 }}
                />
            </div>
        </div >
    );
};

export default Reception;