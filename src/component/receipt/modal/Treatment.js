// import * as React from 'react';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import axiosClient from './../../login/AxiosClient';

const Treatment = ({user}) => {
    let now = new Date();
    let year = now.getFullYear();
    let todayMonth = now.getMonth();
    let todayDate = now.getDate();

    const [treatmentInfo, setTreatmentInfo] = useState({});

    useEffect(() => {
        axiosClient.get('/api/receipt/getTreatment') // 시험용(map으로 받아오는 중)
            .then(response => {
                setTreatmentInfo(response.data);
            })
    }, {})

    let doctor = "";
    if (user.doctor === 1) {
        doctor = "김더존";
    } else if (user.doctor === 2) {
        doctor = "이을지";
    }

    let gender = "";
    if (user.gender === 'm' || user.gender === 'M') {
        gender = "남자";
    } else if (user.gender === 'f' || user.gender === 'F') {
        gender = "여자";
    }

    return (
        <div>
            
            <Box
            sx={{
                width: 800,
                height: 900,
                backgroundColor: 'white',
            }} >
                <h2>처방전출력</h2>
                병원번호: 000000<br/>
                연번호: 2023-000<br/>
                의료기관: 더존내과(12345)<br/>
                의료기관주소: 서울특별시 종로구 더존1길 1가<br/>
                전화 및 FAX: 02-111-2222<br/>
                <br/>
                
                환자이름: {user.patient_name}<br/>
                성별: {gender}<br/>
                주민등록번호(앞/뒤): {user.front_registration_number}-{user.back_registration_number}<br/>
                질병코드: {treatmentInfo.disease_code}<br/>
                질병명: {treatmentInfo.disease_name}<br/>
                약품코드: {treatmentInfo.drug_code}<br/>
                약품명: {treatmentInfo.drug_name}<br/>
                출력날짜: {year}-{todayMonth+1}-{todayDate}<br/>
                담당의사: {doctor}<br/>

                
            </Box>
        </div>
      );
};

export default Treatment;