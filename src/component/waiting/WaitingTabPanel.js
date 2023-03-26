import { Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material";

const WaitingTabPanel = ({ data }) => {
  return (
    <Paper>
      <TableContainer sx={{
        minWidth: 260,
        ".MuiTableCell-root": { fontSize: 14, padding: 1, textAlign: "center" }
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>환자 이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>담당의</TableCell>
              <TableCell>상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
          data.map(el =>
            <TableRow id={`waitingQueue#${el.reception_id}`}>
                <TableCell>
                  {el.patient_name}
                </TableCell>
                <TableCell>
                  {el.front_registration_number}
                </TableCell>
                <TableCell>
                  {el.doctor_name}
                </TableCell>
                <TableCell>
                  {el.state}
                </TableCell>
            </TableRow>
          )
        }  
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )

}

export default WaitingTabPanel;