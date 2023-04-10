// import * as React from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import React, { useEffect, useState } from 'react';


const Treatment = ({user}) => {

    const [disease, setDisease] = useState([]);
    useEffect(() => {
        axios.get(`/api/receipt/getDisease/${user.reception_id}`)
            .then(response => {
                setDisease(response.data);
            })
    }, [])

    const [drug, setDrug] = useState([]);
    useEffect(() => {
        axios.get(`/api/receipt/getDrug/${user.reception_id}`)
            .then(response => {
                setDrug(response.data);
            })
    }, [])



    let now = new Date();
    let year = now.getFullYear();
    let todayMonth = now.getMonth();
    let todayDate = now.getDate();

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

                {disease.map((item, index) => (
                    <div key={index}>
                        질병코드: {item.disease_code}<br/>
                        질병명: {item.disease_name}<br/>
                    </div>
                ))}

                {drug.map((item, index) => (
                    <div key={index}>
                        약품코드: {item.drug_code}<br/>
                        약품명: {item.drug_name}<br/>
                    </div>
                ))}

                출력날짜: {year}-{todayMonth+1}-{todayDate}<br/>
                담당의사: {doctor}<br/>

                
            </Box>
        </div>
      );
};

export default Treatment;