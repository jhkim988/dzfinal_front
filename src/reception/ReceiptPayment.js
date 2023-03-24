import React, { useRef, useEffect, useState } from 'react';
import ReactToPrint from "react-to-print";
import axios from "axios";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CardPaymentForm from './Card';
import Treatment from '../modal/Treatment';
import ClinicRequest from '../modal/ClinicRequest';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';



export default function BasicSelect({user}) {
  const { ClinicPrice, TreatmentPrice, InsuranceRatio, insurance} = user;
  const [showCardForm, setShowCardForm] = useState(false); // 카드 결제 폼을 보여줄지 여부를 저장할 상태 값을 추가합니다.
  const [isCashPayment, setIsCashPayment] = useState(false); // 현금결제 상태 값을 추가합니다.
  const [isCardPayment, setIsCardPayment] = useState(false);
  
  // const handleCashPayment = () => {
  //   setIsCashPayment(false); // 현금결제 버튼을 클릭하면 현금결제 상태 값을 true로 변경합니다.
  //   setShowCardForm(true); // 카드결제 폼이 보이는 상태에서는 현금결제 버튼을 눌러도 카드결제 폼이 보이게끔 합니다.
  // };

  const handleCardPayment = () => {
    setIsCashPayment(false); // 카드결제 버튼을 클릭하면 현금결제 상태 값을 false로 변경합니다.
    setShowCardForm(true); // 카드결제 버튼을 클릭하면 카드결제 폼을 보여주도록 상태 값을 변경합니다.
  };

  const handleCashPayment = async () => {
    try {
      const response = await axios.post('/api/receipt/insertReceipt', {
        reception_id: user.reception_id,
        ratio: InsuranceRatio,
        total_amount: (ClinicPrice+TreatmentPrice)*InsuranceRatio,
        card_name: '-',
        card_number: '-',
        mode: '현금',
        creator: 1
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert("현금결제가 완료되었습니다.");
      console.log('Payment successful', response.data);
      setIsCardPayment(true);
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
      height: 800,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      overflow: "scroll",
      p: 4,
  };
  const [treatmentModalOpen, setTreatmentModalOpen] = React.useState(false);
  const [clinicRequestModalOpen, setClinicRequestModalOpen] = React.useState(false);
  
  // 처방전 모달
  const handleTreatmentModalOpen = () => {
    setTreatmentModalOpen(true);
  };
  const handleTreatmentModalClose = () => {
    setTreatmentModalOpen(false);
  };

  // 진료의뢰서 모달
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
          disabled={!showCardForm}
          onClick={handleTreatmentModalOpen}
        >
          처방전
        </Button>
        <Modal open={treatmentModalOpen} 
               onClose={handleTreatmentModalClose}
               >
          <Box sx={style}>
            <Treatment user={user}/>
            <Button onClick={handleTreatmentModalClose}> 확인 </Button>
          </Box>
        </Modal>

        <Button
          sx={{backgroundColor: 'green'}}
          variant="contained"
          href="#contained-buttons"
          disabled={ user.insurance === 1 || !showCardForm }
          onClick={handleClinicRequestModalOpen}
        >
          진료의뢰서
        </Button>
        <Modal open={clinicRequestModalOpen} 
               onClose={handleClinicRequestModalClose}
               >
          <Box sx={style}>
            <ClinicRequest user={user} />
            <Button onClick={handleClinicRequestModalClose}> 확인 </Button>
          </Box>
        </Modal>
        <Button variant="contained" onClick={handleCashPayment} > 현금결제 </Button>
        <Button variant="contained" onClick={handleCardPayment} > 카드결제 </Button>
      </Stack>
      <br/>
      {showCardForm && <CardPaymentForm user={user}/>} {/* 카드 결제 폼을 보여줍니다. */}
    </>
  );
};