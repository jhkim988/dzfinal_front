import { Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material";

const WaitingTabPanel = ({ data, selected, onRowClick }) => {

  const dummyData = new Array(Math.max(20 - data.length, 0)).fill({});

  return (
    <Paper>
      <TableContainer sx={{
        ".MuiTableCell-root": { fontSize: 11, padding: 1, textAlign: "center" },
        maxHeight: "70vh",
        overflowY: "auto"
        }}
      >
        <Table stickyHeader>
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
          data.map((el, idx) =>
            <TableRow
              key={`waitingQueue#${el.reception_id}`}
              data-reception_id={el.reception_id}
              onClick={onRowClick}
              sx={{ backgroundColor: `${selected?.reception_id}` === `${el.reception_id}` ? 'rgba(33, 150, 243, 0.1)' : undefined }}
            >
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
        {
          dummyData.map((el, idx) => <TableRow key={`waitingQueueDummy#${idx}`}>
            <TableCell>&nbsp;</TableCell>
            <TableCell>&nbsp;</TableCell>
            <TableCell>&nbsp;</TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>)
        }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )

}

export default WaitingTabPanel;