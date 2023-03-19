import React, { useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CardPaymentForm from './Card';
import Treatment from '../modal/Treatment';
import ClinicRequest from '../modal/ClinicRequest';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';



export default function BasicSelect() {
  const [showCardForm, setShowCardForm] = useState(false); // 카드 결제 폼을 보여줄지 여부를 저장할 상태 값을 추가합니다.
  const [isCashPayment, setIsCashPayment] = useState(true); // 현금결제 상태 값을 추가합니다.
  
  const handleCashPayment = () => {
    setIsCashPayment(true); // 현금결제 버튼을 클릭하면 현금결제 상태 값을 true로 변경합니다.
    setShowCardForm(false); // 카드결제 폼이 보이는 상태에서는 현금결제 버튼을 눌러도 카드결제 폼이 보이게끔 합니다.
  };

  const handleCardPayment = () => {
    setIsCashPayment(false); // 카드결제 버튼을 클릭하면 현금결제 상태 값을 false로 변경합니다.
    setShowCardForm(true); // 카드결제 버튼을 클릭하면 카드결제 폼을 보여주도록 상태 값을 변경합니다.
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post('/api/receipt/insertReceipt', {
        reception_id: 1,
        ratio: 1.1,
        total_amount: 13500,
        mode: '현금',
        creator: 1
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Payment successful', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      height: 700,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
  };
  const [treatmentModalOpen, setTreatmentModalOpen] = React.useState(false);
  const [clinicRequestModalOpen, setClinicRequestModalOpen] = React.useState(false);
  
  const handleTreatmentModalOpen = () => {
    setTreatmentModalOpen(true);
  };
  const handleTreatmentModalClose = () => {
    setTreatmentModalOpen(false);
  };

  const handleClinicRequestModalOpen = () => {
    setClinicRequestModalOpen(true);
  };
  const handleClinicRequestModalClose = () => {
    setClinicRequestModalOpen(false);
  };


  return (
    <>
      <Stack direction="row" spacing={1}>
        <Button
          sx={{backgroundColor: 'green'}}
          variant="contained"
          href="#contained-buttons"
          disabled={isCashPayment || !showCardForm}
          onClick={handleTreatmentModalOpen}
        >
          처방전
        </Button>
        <Modal open={treatmentModalOpen} onClose={handleTreatmentModalClose}>
          <Box sx={style}>
            <Treatment />
            <Button onClick={handleTreatmentModalClose}> 확인 </Button>
          </Box>
        </Modal>

        <Button
          sx={{backgroundColor: 'green'}}
          variant="contained"
          href="#contained-buttons"
          disabled={isCashPayment || !showCardForm}
          onClick={handleClinicRequestModalOpen}
        >
          진료의뢰서
        </Button>
        <Modal open={clinicRequestModalOpen} onClose={handleClinicRequestModalClose}>
          <Box sx={style}>
            <ClinicRequest />
            <Button onClick={handleClinicRequestModalClose}> 확인 </Button>
          </Box>
        </Modal>
        <Button variant="contained" onClick={handleCashPayment} > 현금결제 </Button>
        <Button variant="contained" onClick={handleCardPayment} > 카드결제 </Button>
      </Stack>
      <br/>
      {showCardForm && <CardPaymentForm />} {/* 카드 결제 폼을 보여줍니다. */}
      <>
          <button onClick={handlePayment}>결제하기</button>
      </>
    </>
  );
};