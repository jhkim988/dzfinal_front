import React from 'react';

const ReceptionInformation = () => {
    return (
        <>
         <h2>수납정보</h2>
                접수번호: <input id="reception_id" name="reception_id" placeholder='접수번호'></input>
                환자이름: <input id="patient_name" name="patient_name" placeholder='환자이름'></input><br/>
        </>
    );
};

export default ReceptionInformation;