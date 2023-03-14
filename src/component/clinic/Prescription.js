import { Button, TextField } from '@mui/material';
import React from 'react';

const Prescription = () => {
    return (
        <div>
            처방
            <TextField label="약품코드" variant="outlined" />
            <TextField label="약품명" variant="outlined" />
            <Button variant="contained">확인</Button>
        </div>
    );
};

export default Prescription;