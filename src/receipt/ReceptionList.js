import * as React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, InputLabel, makeStyles, MenuItem, Paper, TextareaAutosize, TextField } from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";


const ReceptionList = ({user}) => {
  const [receiptList, setReceiptList] = useState([]);

  useEffect(() => {
    axios.get("/api/receipt/getReceipt")
     .then((response) => {
        setReceiptList(response.data);
     })
     .catch((error) => {
        console.log(error);
     })
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>접수번호</TableCell>
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>의사</TableCell>
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>환자이름</TableCell>
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>주민등록번호</TableCell>
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>질병명</TableCell>
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>처방명</TableCell>
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>수납액</TableCell>
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>결제방식</TableCell>
          <TableCell align="center" style={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>수납일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {receiptList.map((list) => (
          <TableRow key={list.receipt_id}>
              <TableCell align="right">{list.reception_id}</TableCell>
              <TableCell align="right">{list.doctor}</TableCell>
              <TableCell align="right">{list.patient_name}({list.phone_number3})</TableCell>
              <TableCell align="right">{list.front_registration_number}</TableCell>
              <TableCell align="right">{list.disease_name}</TableCell>
              <TableCell align="right">{list.drug_name}</TableCell>
              <TableCell align="right">{list.total_amount}</TableCell>
              <TableCell align="right">{list.mode}</TableCell>
              <TableCell align="right">{list.created_at}</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReceptionList;