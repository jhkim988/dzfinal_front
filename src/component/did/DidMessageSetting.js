import React from "react";
import axiosClient from "../login/AxiosClient";
import { useState, useEffect, useRef, useCallback } from "react";
import DID_MessageModel from "./model/DID_MessageModel";
import { red } from "@mui/material/colors";
import { tableCellClasses } from "@mui/material/TableCell";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const DidMessageSetting = () => {
  const [messages, onInsert, onToggle, onUpdate, onDelete, onAppend] =
    DID_MessageModel();
  const inputEl = useRef(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    axiosClient
      .get("/api/did/did_subtitle")
      .then((response) => {
        const existingData = messages.find(
          (item) => item.id === response.data.id
        );
        if (!existingData) {
          onAppend(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onInsert_click = useCallback(
    (e) => {
      inputEl.current.focus();

      if (value.length === 0) {
        alert("안내 문구를 입력해주세요");
        return;
      }
      onInsert(value);
      setValue("");
    },
    [value]
  );

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Paper sx={{ width: "100%" }}>
        <Typography variant="h3" sx={{ marginTop: 1, marginLeft: 1 }}>
          안내문구 설정
        </Typography>
        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
            },
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell align="left" colSpan={4}>
                <TextField
                  label="안내 문구 설정"
                  variant="outlined"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  ref={inputEl}
                />
              </TableCell>
              <TableCell align="center" sx={{ width: "113px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onInsert_click}
                >
                  추가
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box
          sx={{
            height: "600px",
            overflowY: "auto",
            marginLeft: 2,
            marginRight: 2,
            marginBottom: 2,
            border: "1px solid lightgray",
            borderRadius: 2,
          }}
        >
          <Table
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none",
              },
              "& th": { padding: 0 },
            }}
          >
            <TableBody>
              {messages &&
                messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell align="right">
                      <Checkbox
                        checked={message.active}
                        onClick={() => onToggle(message.id, message.active)}
                      />
                    </TableCell>
                    <TableCell align="left" colSpan={4}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        defaultValue={message.message}
                        onBlur={(e) => {
                          const updatedMessage = e.target.value;
                          if (updatedMessage !== message.message) {
                            onUpdate(message.id, updatedMessage);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <RemoveCircleOutlineIcon
                        sx={{ color: red[500] }}
                        onClick={() => {
                          onDelete(message.id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
};

export default DidMessageSetting;
