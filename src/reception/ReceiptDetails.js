import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReceiptPayment from '../reception/ReceiptPayment';


export default function DenseTable({user}) {

  function createData(name, treatment, clinic_price, total_price, ratio, receipt_price) {
    return { name, treatment, clinic_price, total_price, ratio, receipt_price };
  }

  // const { ClinicPrice, TreatmentPrice, InsuranceRatio, insurance } = user;

  const rows = [
    createData('기본진료비', "기본진료", user.ClinicPrice),
    createData('처치내역', "처치", user.TreatmentPrice)
  ];
  const rows2 = [
      createData('총계', null, null, (user.ClinicPrice + user.TreatmentPrice), user.insurance, (user.ClinicPrice + user.TreatmentPrice) * user.InsuranceRatio)
  ]


  return (
    <>
    <h3>수납내역</h3>
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 430 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">구분</TableCell>
            <TableCell align="right">처치내역</TableCell>
            <TableCell align="right">진료비</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.treatment}</TableCell>
              <TableCell align="right">{row.clinic_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <h3>결제내역</h3>
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 430 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">구분</TableCell>
            <TableCell align="right">총진료비</TableCell>
            <TableCell align="right">할인</TableCell>
            <TableCell align="right">수납액</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows2.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right" component="th" scope="row">
                총계
              </TableCell>
              <TableCell align="right">{row.total_price}</TableCell>
              <TableCell align="right">{row.ratio}</TableCell>
              <TableCell align="right">{row.receipt_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {/* 결제방식&처방전,진료의뢰서 */}
    {/* <ReceiptPayment 
      user={user}
    /> */}
    </>
  );
}