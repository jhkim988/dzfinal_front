import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import axios from "axios";
import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const ClinicRequest = ({user, ref} ) => {

    const [disease, setDisease] = useState([]);
    useEffect(() => {
        axios.get(`/api/receipt/getDisease/${user.reception_id}`)
            .then(response => {
                setDisease(response.data);
            })
    }, [])


    
    let now = new Date();
    let year = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();


    // 프린트 기능
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

    return (
        
        <div>

            <Button onClick={handlePrint} style={{alignContent:"right"}}>인쇄하기</Button>
            <br/>
                <Box
                ref={componentRef}
                sx={{
                    width: 740,
                    height: 950,
                    backgroundColor: "white",
                    alignItems:"center",
                }} >

                <table style={{ borderCollapse: "collapse", width: "100%" }}
                                componentRef={ref}>
                            <thead>
                            <tr>
                                <th
                                style={{
                                    border: "1px solid black",
                                    fontSize: "40px",
                                    height: "60px",
                                    backgroundColor:"#e3f2fd",
                                }}
                                colSpan="7"
                                >
                                진&nbsp;&nbsp;료&nbsp;&nbsp;의
                                &nbsp;&nbsp;뢰&nbsp;&nbsp;서
                                </th>
                            </tr>
                            <tr>
                                <th style={{ border: "1px solid black" }} colSpan="1">
                                보험자기호
                                </th>
                                <td style={{ border: "1px solid black" }} colSpan="1">
                                362000
                                </td>
                                <th style={{ border: "1px solid black" }} colSpan="1">
                                보험자명칭
                                </th>
                                <td style={{ border: "1px solid black" }} colSpan="2">
                                &nbsp;
                                </td>
                                <th style={{ border: "1px solid black" }} colSpan="2">
                                의료보험증명
                                </th>
                            </tr>

                            {/* <tr>
                                <th style={{ border: "1px solid black" }}>교부번호</th>
                                <th
                                style={{ border: "1px solid black", textAlign: "left" }}
                                colSpan="4"
                                >
                                {year} 년 {todayMonth + 1} 월 {todayDate} 일 &nbsp; - &nbsp;
                                {user.reception_id}
                                </th>
                            </tr> */}
                            {/* <tr>
                                <th style={{ border: "1px solid black", backgroundColor:"#e3f2fd" }} colSpan="2">
                                환자 정보
                                </th>
                                <th style={{ border: "1px solid black", backgroundColor:"#e3f2fd" }} colSpan="3">
                                의료기관 정보
                                </th>
                            </tr> */}

                            <tr>
                                <th style={{ border: "1px solid black" }}>보험자성명</th>
                                <td style={{ border: "1px solid black" }} colSpan="1">
                                {user.patient_name}
                                </td>
                                <th style={{ border: "1px solid black" }}>주민등록번호</th>
                                <td style={{ border: "1px solid black" }} colSpan="3">
                                {user.front_registration_number}-
                                {user.back_registration_number}
                                </td>
                            </tr>

                            <tr>
                                <th style={{ border: "1px solid black" }}>수신자성명</th>
                                <td style={{ border: "1px solid black" }} colSpan="1">
                                {user.patient_name}
                                </td>
                                <th style={{ border: "1px solid black" }}>주민등록번호</th>
                                <td style={{ border: "1px solid black" }} colSpan="3">
                                {user.front_registration_number}-
                                {user.back_registration_number}
                                </td>
                            </tr>

                            <tr>
                                <th style={{ border: "1px solid black" }}>수신자 주소</th>
                                <td style={{ border: "1px solid black" }} colSpan="1">
                                {user.address}&nbsp;
                                {user.detail_address}
                                </td>
                                <th style={{ border: "1px solid black" }}>전화번호</th>
                                <td style={{ border: "1px solid black" }} colSpan="3">
                                02-123-8282
                                </td>
                            </tr>

                            </thead>

                            <tbody>
                            <tr>
                                <th style={{ border: "1px solid black", backgroundColor:"#e3f2fd" }} colSpan="1" rowSpan={5}>
                                상병명
                                </th>
                                <th style={{ border: "1px solid black", backgroundColor:"white" }} colSpan="1">
                                {[...Array(7)].map((_, i) => {
                                    if (disease.length > i) {
                                        const item = disease[i];
                                        return (
                                            <tr key={i}>
                                                <td
                                                    style={{
                                                        textAlign: "left",
                                                    }}
                                                    colSpan={1}
                                                >
                                                    {item.disease_name}
                                                </td>
                                            </tr>
                                        );
                                    } else {
                                        return (
                                            <tr key={i}>
                                                <td colSpan={1}>&nbsp;</td>
                                            </tr>
                                        );
                                    }
                                })}
                                </th>
                                <th style={{ border: "1px solid black", backgroundColor:"#e3f2fd" }} colSpan="1" rowSpan={5}>
                                분류기호
                                </th>
                                <th style={{ border: "1px solid black", backgroundColor:"white" }} colSpan="3">
                                {[...Array(7)].map((_, i) => {
                                    if (disease.length > i) {
                                        const item = disease[i];
                                        return (
                                            <tr key={i}>
                                                <td
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                    colSpan={1}
                                                >
                                                    {item.disease_code}
                                                </td>
                                            </tr>
                                        );
                                    } else {
                                        return (
                                            <tr key={i}>
                                                <td colSpan={1}>&nbsp;</td>
                                            </tr>
                                        );
                                    }
                                })}
                                </th>
                            </tr>
                            
                            </tbody>

                            <tr>
                                <th style={{ border: "1px solid black" }}>진료기간</th>
                                <td style={{ border: "1px solid black" }} colSpan="1">
                                {year}-0{todayMonth}-{todayDate} ~ {year}-0{todayMonth}-{todayDate}
                                </td>
                                <th style={{ border: "1px solid black" }}>진료구분</th>
                                <td style={{ border: "1px solid black" }} colSpan="3">
                                외래(입원)
                                </td>
                            </tr>
                            <tbody>
                                <tr>
                                <th style={{ border: "1px solid black", backgroundColor:"#e3f2fd" }} colSpan="1" rowSpan={5}>
                                상병명
                                </th>
                                <th style={{ border: "1px solid black", backgroundColor:"white" }} colSpan="5">
                                {[...Array(25)].map((_, i) => {
                                    if (disease.length > i) {
                                        const item = disease[i];
                                        return (
                                            <tr key={i}>
                                                <td
                                                    style={{
                                                        // border: "1px solid black",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {i === 0 ? `상기환자분은 내원 직전 "${item.disease_name}" 외 ${disease.length - 1} 건으로 내원하신 분으로 고진선처 바랍니다.` : ''}
                                                </td>
                                            </tr>
                                        );
                                    } else {
                                        return (
                                            <tr key={i}>
                                                <td>&nbsp;</td>
                                            </tr>
                                        );
                                    }
                                })}
                                </th>  
                                </tr>

                            
                            </tbody>


                            <tbody>
                            <tr>
                                <td style={{ border: "1px solid black" }} colSpan={6}>발급일: 
                                &nbsp;{year}-0{todayMonth}-{todayDate}
                                </td>
                            </tr>

                            <tr>
                                <td style={{ border: "1px solid black" }} colSpan={6}>의료기관: 
                                &nbsp;드림을지병원 (1234567)
                                </td>
                            </tr>

                            <tr>
                                <td style={{ border: "1px solid black" }} colSpan={6}>의료기관주소: 
                                &nbsp;서울특별시 혜화동 더존 4기 교실 401호
                                </td>
                            </tr>

                            <tr>
                                <td style={{ border: "1px solid black" }} colSpan={6}>전화 및 FAX: 
                                &nbsp;02-111-2222
                                </td>
                            </tr>

                            <tr>
                                <td style={{ border: "1px solid black" }} colSpan={3}>담당의사: 
                                &nbsp;{user.doctor === 1 ? "김더존" : "이을지"}
                                </td>

                                <td style={{ border: "1px solid black" }} colSpan={1}>(서명 또는 날인) 
                                </td>

                                <td style={{ border: "1px solid black" }} colSpan={3}>면허번호: 
                                &nbsp;12345
                                </td>
                            </tr>

                            
                            </tbody>
                        </table>
                    {/* <h2>진료의뢰서</h2>
                    
                    병원번호: 000000<br/>
                    연번호: 2023-000<br/>
                    의료기관: 드림을지병원(12345)<br/>
                    의료기관주소: 서울특별시 종로구 더존1길 1가<br/>
                    전화 및 FAX: 02-111-2222<br/>
                    <br/>
                    내원날짜: ~ <br/>

                    환자이름: {user.patient_name}<br/>
                    환자번호: {user.patient_id}<br/>
                    성별: {user.gender === "F" ? "여자" : "남자"}<br/>
                    주민등록번호(앞/뒤): {user.front_registration_number}-{user.back_registration_number}<br/>
                    주소: {user.address}&nbsp;{user.detail_address}<br/>
                    
                    {disease.map((item, index) => (
                        <div key={index}>
                            질병코드: {item.disease_code}<br/>
                            질병명: {item.disease_name}<br/>
                        </div>
                    ))}


                    내용: 상기 환자 분은 내원 직전  로 본원 내원하신 분으로 고진선처 바랍니다.<br/>
    
                    주 : 1. 이 진료의뢰서는 1차진료후 2차진료를 받고자 하는 경우 1차 진료담당의사로부터 요양급여 기준에 따라 무상 교부됩니다.<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 의사의 발급일부터 7일(공휴일 제외)이내에 사용하여야 합니다. */}
                </Box>
            
        </div>
    );
};

export default ClinicRequest;