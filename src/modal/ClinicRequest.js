import Box from '@mui/material/Box';
import axios from "axios";
import React, { useRef, useEffect, useState } from 'react';

const ClinicRequest = ({user}, ref) => {
    let now = new Date();
    let year = now.getFullYear();
    let todayMonth = now.getMonth();
    let todayDate = now.getDate();

    const [clinicRequest, setClinicRequest] = useState({});

    useEffect(() => {
        axios.get('/api/receipt/getClinicRequest')
            .then(response => {
                setClinicRequest(response.data);
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
                    <h2>진료의뢰서</h2>
                    
                    병원번호: 000000<br/>
                    연번호: 2023-000<br/>
                    의료기관: 더존내과(12345)<br/>
                    의료기관주소: 서울특별시 종로구 더존1길 1가<br/>
                    전화 및 FAX: 02-111-2222<br/>
                    <br/>
                    내원날짜: ~ <br/>

                    환자이름: {user.patient_name}<br/>
                    성별: {gender}<br/>
                    주민등록번호(앞/뒤): {user.front_registration_number}-{user.back_registration_number}<br/>
                    주소: {user.address}&nbsp;{user.detail_address}<br/>
                    
                    <div>
                        <ul>
                            {clinicRequest.map((list) => (
                                <li key={list.disease_code}>{list.disease_name}</li>
                            ))}
                        </ul>
                    </div>


                    출력날짜: {year}-{todayMonth+1}-{todayDate}<br/>
                    담당의사: {doctor}<br/>

                    내용: 상기 환자 분은 내원 직전 {clinicRequest.disease_name}로 본원 내원하신 분으로 고진선처 바랍니다.<br/>
    
                    주 : 1. 이 진료의뢰서는 1차진료후 2차진료를 받고자 하는 경우 1차 진료담당의사로부터 요양급여 기준에 따라 무상 교부됩니다.<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 의사의 발급일부터 7일(공휴일 제외)이내에 사용하여야 합니다.
                </Box>
            
        </div>
    );
};

export default ClinicRequest;