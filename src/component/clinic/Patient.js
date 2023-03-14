import { TextField } from '@material-ui/core';
import React from 'react';

const Patient = (props) => {
    const { reception, patient } = props;

    return (
        <div>
            접수번호
            <TextField disabled value={reception}/>
            환자이름
            <TextField disabled value={patient.patient_name}/>
            주민등록번호
            <TextField disabled value={patient.front_registration_number}/>
            -
            <TextField disabled value={patient.back_registration_number}/>
        </div>
    );
};

export default Patient;