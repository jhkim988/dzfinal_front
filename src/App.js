import './App.css';
import * as React from 'react';
import axios from "axios";
import ReceptionInformation from './reception/ReceptionInformation';
import ReceiptPayment from './reception/ReceiptPayment';
import ReceiptDetails from './reception/ReceiptDetails';
import Reservation from './reception/Reservation';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

// axios를 이 곳에..??
// 부모컴포넌트를 만들어서 자식 컴포넌트

function App() {
  const [user, setUser] = useState({});

  let insurance = '';         // 보험여부
  let InsuranceRatio = 0;    // 보험할인율
  if(user.insuarance === 1) {
    insurance = '-%';
    InsuranceRatio = 1.0;
  } else if ( user.insuarance !== 1) {
    insurance = '10%';
    InsuranceRatio = 0.9;
  }

  let ClinicPrice = 5000;     // 기본진료비

  let TreatmentPrice = 0;     // 처치비
  if(user.treatment !== 0) {
    TreatmentPrice = 10000;
  } else {
    TreatmentPrice = 0;
  }

  useEffect(() => {
    axios.get('/api/receipt/selectReceiptDetail')
      .then(response => {
        setUser({ ...response.data, InsuranceRatio, TreatmentPrice, ClinicPrice, insurance });
      });
  }, []);


  return (
    <div style={{width: "395px", height: "400px"}}>
    <Paper elevation={3} style={{padding: "20px"}}>
        {/* <h2>수납하기</h2> */}
          {/* 접수정보 */}
          <ReceptionInformation user={user}/>
          {/* 다음진료예약 */}
          <Reservation />
          {/* 결제내역정보 */}
          <ReceiptDetails user={user}/>
          <br/>
          {/* 결제방식&처방전,진료의뢰서 */}
          <ReceiptPayment user={user}/>

      </Paper>
    </div>
  );
}

export default App;