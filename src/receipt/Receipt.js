import * as React from 'react';
import axios from "axios";
import ReceptionInformation from '../receipt/ReceptionInformation';
import ReceiptPayment from '../receipt/ReceiptPayment';
import ReceiptDetails from '../receipt/ReceiptDetails';
import Reservation from '../receipt/Reservation';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import ReceptionList from './ReceptionList';


function Receipt() {
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
    <>
    <div style={{marginTop: "350px", width: "600px", padding: 2, height: "400px", float: "left"}}>
      <Paper elevation={3} style={{padding: "20px"}}>
          <h3>수납내역목록들</h3>
          <ReceptionList />
      </Paper>
    </div>
    <div style={{width: "395px", height: "400px", float: "right"}}>
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
    </>
  );
}

export default Receipt;