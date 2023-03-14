import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function createData(name, treatment, clinic_price, total_price, ratio, receipt_price) {
  return { name, treatment, clinic_price, total_price, ratio, receipt_price};
}
const rows = [
  createData('기본진료비', "기본진료", 5000, "10%"),
  createData('처치내역', "주사", 10000, "10%")
];
const rows2 = [
    createData('총계', null, null, 15000, "10%", 13500)
]



export default function DenseTable() {
  return (
    <>
    <h2>수납내역</h2>
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
    <h2>결제내역</h2>
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
    </>
  );
}