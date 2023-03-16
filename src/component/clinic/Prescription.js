import React from 'react';
import { Box, Button, TextField } from '@mui/material';

const Prescription = () => {
    return (
        <Box>
            <Box>
                처방
            </Box>
            <Box sx={{ display: 'flex' }}>
                <TextField size='small' label="약품코드" variant="outlined" />
                <TextField size='small' label="약품명" variant="outlined" />
                <Button variant="contained">확인</Button>
            </Box>
        </Box>
    );
};

export default Prescription;