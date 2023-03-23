import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { red } from "@mui/material/colors";

const Drug_Taking = ({ drug_taking }) => {
  const [drug_code, setDrug_code] = useState("");
  const [drug_name, setDrug_name] = useState("");

  return (
    <Box>
      <Box>복용중인 약</Box>
      <Box sx={{ display: "flex" }}>
        <TextField
          size="small"
          label="약품코드"
          variant="outlined"
          defaultValue={drug_code}
        />
        <TextField
          size="small"
          label="약품명"
          variant="outlined"
          defaultValue={drug_name}
        />
        <AddCircleOutlineOutlinedIcon
          color="primary"
          sx={{ alignSelf: "center" }}
        />
      </Box>
      <Box>
        <Table>
          <TableBody>
            {drug_taking.map((drug, index) => (
              <TableRow key={index}>
                <TableCell align="center">{drug.drug_code}</TableCell>
                <TableCell align="center">{drug.drug_name}</TableCell>
                <TableCell align="center">
                  <RemoveCircleOutlineIcon sx={{ color: red[500] }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Drug_Taking;
