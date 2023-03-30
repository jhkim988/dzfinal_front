import * as React from 'react';
import axios from "axios";
import ReceptionInformation from './ReceptionInformation';
import ReceiptPayment from './ReceiptPayment';
import ReceiptDetails from './ReceiptDetails';
import Reservation from './Reservation';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import ReceiptList from './ReceiptList';


function Receipt({ receiptData, selectedInformation }) {

  const [user, setUser] = useState({
    reception_id: 0,
    patient_name: "",
    insurance: 0,
    treatment: 0,
    doctor: 0,
    gender: 0,
    front_registration_number: "",
    back_registration_number: "",
    address: "",
    detail_address: "",
    clinic_request: 0,
    has_prescription: 0,
  });

  useEffect(() => {
    setUser(prev => {
      const ret = ({
        reception_id: receiptData.reception.reception_id,
        patient_name: receiptData.patient.patient_name,
        insurance: receiptData.patient.insuarance,
        treatment: receiptData.clinic.treatment,
        doctor: receiptData.reception.doctor,
        gender: receiptData.patient.gender,
        front_registration_number: receiptData.patient.front_registration_number,
        back_registration_number: receiptData.patient.back_registration_number,
        address: receiptData.patient.address,
        detail_address: receiptData.patient.detail_address,
        clinic_request: receiptData.clinic.clinic_request,
        has_prescription: receiptData.clinic.has_prescription,
      });

      let insurance = '';         // 보험여부
      let InsuranceRatio = 0;    // 보험할인율
      if(!Boolean(receiptData.patient.insuarance)) {
        insurance = '-%';
        InsuranceRatio = 1.0;
      } else {
        insurance = '10%';
        InsuranceRatio = 0.9;
      }
    
      let ClinicPrice = 5000;     // 기본진료비
    
      let TreatmentPrice = 0;     // 처치비
      if(Boolean(receiptData.clinic.treatment)) {
        TreatmentPrice = 10000;
      } else {
        TreatmentPrice = 0;
      }

      return {...ret, insurance, InsuranceRatio, TreatmentPrice, ClinicPrice }
    });
  }, [receiptData]);


  // useEffect(() => {
  //   axios.get(`/api/receipt/selectReceiptDetail?reception_id=${reception_id}`)
  //     .then(response => {
  //       setUser({ ...response.data, InsuranceRatio, TreatmentPrice, ClinicPrice, insurance });
  //     });
  // }, [reception_id]);

  


  return (
    <div style={{ height: "480px" }}>
      {/* <div style={{ width: "950px", padding: 2, height: "400px", float: "left"}}>
         <Paper elevation={3} style={{padding: "20px"}}>
             <ReceiptList user={user}/>
         </Paper>
       </div>  */}
      {/* <div style={{width: "395px", height: "400px", float: "left"}}>
        <Paper elevation={3} style={{padding: "20px"}}>
            <ReceiptList user={user}/>
        </Paper>
      </div> */}
      <div style={{height: "400px"}}>
        <Paper elevation={3} style={{padding: "5px", height: "82vh"}}>
          {/* <h2>수납하기</h2> */}
            <br/>
            {/* 접수정보 */}
            <ReceptionInformation user={user}/>
            <br/>
            {/* 다음진료예약 */}
            <Reservation />
            {/* 결제내역정보 */}
            <ReceiptDetails user={user}/>
            <br/>
            {/* 결제방식&처방전,진료의뢰서 */}
            <ReceiptPayment user={user}/>

        </Paper>
     </div>
    </div>
  );
}

export default Receipt;