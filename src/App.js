import './App.css';
import * as React from 'react';
import ReceptionInformation from './reception/ReceptionInformation';
import ReceiptPayment from './reception/ReceiptPayment';
import ReceiptDetails from './reception/ReceiptDetails';
import Reservation from './reception/Reservation';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

// axios를 이 곳에..??
// 부모컴포넌트를 만들어서 자식 컴포넌트

function App() {
  const [reception_id, setReception_id] = useState('');


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