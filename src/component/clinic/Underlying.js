import { Button, TextField } from '@mui/material';
import { margin } from '@mui/system';
import React, { useCallback, useState } from 'react';
import { List } from 'react-virtualized';

const Underlying = ({underlying}) => {
    const [disease_code, setDisease_code] = useState('');
    const [disease_name, setDisease_name] = useState('');

    return (
        <div>
            기저질환
            <TextField label="질병코드" variant="outlined" defaultValue={disease_code} />
            <TextField label="질병명" variant="outlined" defaultValue={disease_name} />
            <Button variant="contained">확인</Button>
            <div>
                {underlying.map((disease, index) => (
                    <div key={index}>
                        {disease.disease_code}{disease.disease_name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Underlying;