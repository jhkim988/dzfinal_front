import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const Drug_Taking = ({drug_taking}) => {
    const [drug_code, setDrug_code] = useState('');
    const [drug_name, setDrug_name] = useState('');

    return (
        <div>
            복용중인 약
            <TextField label="약품코드" variant="outlined" defaultValue={drug_code} />
            <TextField label="약품명" variant="outlined" defaultValue={drug_name} />
            <Button variant="contained">확인</Button>
            <div>
                {drug_taking.map((drug, index) => (
                    <div key={index}>
                        {drug.drug_code}{drug.drug_name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Drug_Taking;