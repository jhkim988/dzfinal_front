import React from 'react';
import { Box, Button, TextField } from '@mui/material';

const Diagnosis = () => {
    return (
        <Box>
            <Box>
                진단
            </Box>
            <Box sx={{ display: 'flex' }}>
                <TextField size='small' label="질병코드" variant="outlined" />
                <TextField size='small' label="질병명" variant="outlined" />
                <Button variant="contained">확인</Button>
            </Box>
        </Box>
    );
};

export default Diagnosis;