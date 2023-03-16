import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import ReceptionInformation from './Reception/ReceptionInformation';
import ReceiptPayment from './Reception/ReceiptPayment';
import ReceiptDetails from './Reception/ReceiptDetails';
import Reservation from './Reception/Reservation';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

function App() {
  return (
    <div style={{width: "395px", height: "400px"}}>
    <Paper elevation={3} style={{padding: "20px"}}>
        {/* <h2>수납하기</h2> */}
          {/* 접수정보 */}
          <ReceptionInformation />
          {/* 다음진료예약 */}
          <Reservation />
          {/* 결제내역정보 */}
          <ReceiptDetails />
          <br/>
          {/* 결제방식&처방전,진료의뢰서 */}
          <ReceiptPayment/>
      </Paper>
    </div>
  );
}

export default App;