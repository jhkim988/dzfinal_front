import { Button, TextField } from '@mui/material';
import React from 'react';

const Diagnosis = () => {
    return (
        <div>
            진단
            <TextField label="질병코드" variant="outlined" />
            <TextField label="질병명" variant="outlined" />
            <Button variant="contained">확인</Button>
        </div>
    );
};

export default Diagnosis;