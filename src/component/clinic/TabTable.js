import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, status, doctor) {
  return { name, status, doctor };
}

const rows = [
  createData('김진한', '진료중', '김을지'),
  createData('이정주', '진료중', '이더존'),
  createData('이혜빈', '진료대기'),
  createData('김윤지', '진료대기'),
];

export default function TabTable({type}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">이름</TableCell>
            <TableCell align="center">상태</TableCell>
            <TableCell align="center">의사</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.doctor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}