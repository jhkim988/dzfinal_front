// import * as React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import axiosClient from './../../login/AxiosClient';


const Treatment = ({user, ref}) => {

    const [disease, setDisease] = useState([]);
    useEffect(() => {
        axiosClient.get(`/api/receipt/getDisease/${user.reception_id}`)
            .then(response => {
                setDisease(response.data);
            })
    }, [])

    const [drug, setDrug] = useState([]);
    useEffect(() => {
        axiosClient.get(`/api/receipt/getDrug/${user.reception_id}`)
            .then(response => {
                setDrug(response.data);
            })
    }, [])

    let now = new Date();
    let year = now.getFullYear();
    let todayMonth = now.getMonth();
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
          }}
        >
          [별지 제10호서식]
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
                  처&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;방&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;전
                </th>
              </tr>
              <tr>
                <th style={{ border: "1px solid black" }} colSpan="1">
                  보험구분
                </th>
                <td style={{ border: "1px solid black" }} colSpan="1">
                  의료보험
                </td>
                <th style={{ border: "1px solid black" }} colSpan="1">
                  요양기관번호
                </th>
                <td style={{ border: "1px solid black" }} colSpan="2">
                  123456789
                </td>
              </tr>

              <tr>
                <th style={{ border: "1px solid black" }}>교부번호</th>
                <th
                  style={{ border: "1px solid black", textAlign: "left" }}
                  colSpan="4"
                >
                  {year} 년 {todayMonth + 1} 월 {todayDate} 일 &nbsp; - &nbsp;
                  {user.reception_id}
                </th>
              </tr>
              <tr>
                <th style={{ border: "1px solid black", backgroundColor:"#e3f2fd" }} colSpan="2">
                  환자 정보
                </th>
                <th style={{ border: "1px solid black", backgroundColor:"#e3f2fd" }} colSpan="3">
                  의료기관 정보
                </th>
              </tr>
              <tr>
                <th style={{ border: "1px solid black" }}>성명</th>
                <td style={{ border: "1px solid black" }} colSpan="1">
                  {user.patient_name}
                </td>
                <th style={{ border: "1px solid black" }}>기관명</th>
                <td style={{ border: "1px solid black" }} colSpan="2">
                  드림을지병원
                </td>
              </tr>
              <tr>
                <th style={{ border: "1px solid black" }}>생년월일</th>
                <td style={{ border: "1px solid black" }} colSpan="1">
                  {user.front_registration_number}-
                  {user.back_registration_number}
                </td>
                <th style={{ border: "1px solid black" }}>전화번호</th>
                <td style={{ border: "1px solid black" }} colSpan="2">
                  02-123-8282
                </td>
              </tr>
              <tr>
                <th style={{ border: "1px solid black" }}>성별</th>
                <td style={{ border: "1px solid black" }} colSpan="1">
                  {user.gender === "F" ? "여자" : "남자"}
                </td>
                <th style={{ border: "1px solid black" }}>주소</th>
                <td style={{ border: "1px solid black" }} colSpan="2">
                  {user.address}
                </td>
              </tr>
              <tr>
                <th style={{ border: "1px solid black" }}>질병분류기호</th>
                <td style={{ border: "1px solid black" }} colSpan="1">
                  {disease.map((item, index) => (
                    <div key={index}>
                      {item.disease_code}
                      <br />
                    </div>
                  ))}
                </td>
                <th style={{ border: "1px solid black" }}>면허종별</th>
                <td style={{ border: "1px solid black" }} colSpan="2">
                  {user.license_type}
                </td>
              </tr>
              <tr>
                <th style={{ border: "1px solid black" }}>처방의료인의 서명</th>
                <td style={{ border: "1px solid black" }} colSpan="1">
                  {user.doctor === 1 ? "김더존" : "이을지"}
                </td>
                <th style={{ border: "1px solid black" }}>면허번호</th>
                <td style={{ border: "1px solid black" }} colSpan="2">
                  {user.doctor === "김더존" ? "111111" : "222222"}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{ border: "1px solid black", backgroundColor:"#e3f2fd" }} rowSpan="2">
                  약품코드
                </th>
                <th style={{ border: "1px solid black", backgroundColor:"#e3f2fd" }} rowSpan="2">
                  약품명
                </th>
                <th style={{ border: "1px solid black", backgroundColor:"#e3f2fd" }} colSpan="4">
                  복용 정보
                </th>
              </tr>
              <tr>
                <th style={{ border: "1px solid black", backgroundColor:"#e3f2fd" }}>복용량</th>
                <th style={{ border: "1px solid black", backgroundColor:"#e3f2fd" }}>투약일</th>
                <th style={{ border: "1px solid black", backgroundColor:"#e3f2fd" }}>비고</th>
              </tr>
              {[...Array(15)].map((_, i) => {
                if (drug.length > i) {
                  const item = drug[i];
                  return (
                    <tr key={i}>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        {item.drug_code}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        {item.drug_name}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        {item.drug_standard}
                        {item.drug_unit}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        3일
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        식후 30분 하루 3번 아침,점심,저녁
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={i}>
                      <td style={{ border: "1px solid black" }}>&nbsp;</td>
                      <td style={{ border: "1px solid black" }}>&nbsp;</td>
                      <td style={{ border: "1px solid black" }}>&nbsp;</td>
                      <td style={{ border: "1px solid black" }}>&nbsp;</td>
                      <td style={{ border: "1px solid black" }}>&nbsp;</td>
                    </tr>
                  );
                }
              })}
            </tbody>

            <tbody>
              <tr>
                <th
                  style={{
                    border: "1px solid black",
                    borderRight: "none",
                    textAlign: "right",
                     backgroundColor:"#e3f2fd",
                  }}
                  rowSpan="1"
                >
                  주사제
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    borderLeft: "none",
                    textAlign: "left",
                    backgroundColor:"#e3f2fd",
                  }}
                  rowSpan="1"
                >
                  처방내역 (원내조제□, 원외조제□)
                </th>
                <th style={{ border: "1px solid black",  backgroundColor:"#e3f2fd", }} colSpan="4">
                  조제시 참고사항
                </th>
              </tr>
              {[...Array(8)].map((_, i) => (
                <tr key={i}>
                  <td style={{ border: "1px solid black" }}>&nbsp;</td>
                  <td style={{ border: "1px solid black" }}>&nbsp;</td>
                  <td
                    style={{
                      border: "1px solid black",
                      borderRight: "none",
                      borderTop: "none",
                      borderBottom: "none",
                    }}
                  ></td>
                  <td
                    style={{
                      border: "1px solid black",
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      borderBottom: "none",
                    }}
                  ></td>
                  <td
                    style={{
                      border: "1px solid black",
                      borderLeft: "none",
                      borderTop: "none",
                      borderBottom: "none",
                    }}
                  ></td>
                </tr>
              ))}
            </tbody>

            <tbody>
              <tr>
                <th style={{ border: "1px solid black",  backgroundColor:"#e3f2fd", }} rowSpan="2">
                  사용기간
                </th>
                <th style={{ border: "1px solid black",  backgroundColor:"#e3f2fd", }} rowSpan="2">
                  교부일로부터 ( 3 ) 일간
                </th>
                <th style={{ border: "1px solid black",  backgroundColor:"#e3f2fd", }} colSpan="4">
                  ※사용기간내에 약국에 제출하여야 합니다.
                </th>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <th
                  style={{ border: "1px solid black", borderRight: "none", backgroundColor:"#e3f2fd", }}
                  rowSpan="2"
                >
                  &nbsp;
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    borderLeft: "none",
                    borderRight: "none",
                    textAlign: "right",
                    backgroundColor:"#e3f2fd",
                  }}
                  rowSpan="2"
                >
                  의 약 품 조 제
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    borderLeft: "none",
                    textAlign: "left", 
                    backgroundColor:"#e3f2fd",
                  }}
                  colSpan="4"
                >
                  내 역
                </th>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <th
                  style={{ border: "1px solid black", backgroundColor:"#e3f2fd", }}
                  rowSpan="4"
                  colSpan={1}
                >
                  조재내역
                </th>
                <td style={{ border: "1px solid black" }} colSpan={1}>
                  조재기관의명칭:
                </td>
                <th style={{ border: "1px solid black", backgroundColor:"#e3f2fd", }} colSpan="4">
                  처방의 변경·수정·확인·대체시 그 내용 등
                </th>
              </tr>

              <tr>
                <td style={{ border: "1px solid black" }}>조제약사:</td>
                <td
                  style={{
                    border: "1px solid black",
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    borderLeft: "none",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                ></td>
              </tr>

              <tr>
                <td style={{ border: "1px solid black" }}>조제량:</td>
                <td
                  style={{
                    border: "1px solid black",
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                >
                  &nbsp;
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                >
                  &nbsp;
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    borderLeft: "none",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                >
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>조제연월일:</td>
                <td
                  style={{
                    border: "1px solid black",
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "none",
                  }}
                >
                  &nbsp;
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "none",
                  }}
                >
                  &nbsp;
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    borderLeft: "none",
                    borderTop: "none",
                  }}
                >
                  &nbsp;
                </td>
              </tr>
            </tbody>
          </table>
        </Box>

        
      </div>
    );
};

export default Treatment;