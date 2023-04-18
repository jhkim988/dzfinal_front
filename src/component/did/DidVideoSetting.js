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
  tableCellClasses,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import axiosClient from "../login/AxiosClient";
import { red } from "@mui/material/colors";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useEffect } from "react";
import DID_VideoModel from "./model/DID_VideoModel";
import "./css/style.css";

const DidVideoSetting = () => {
  const [videos, onInsert, onToggle, onDelete, onAppend] = DID_VideoModel();
  const [file, setFile] = useState(null);

  useEffect(() => {
    axiosClient
      .get("/api/did/did_video")
      .then((response) => {
        onAppend(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

  const onUpload = () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    onInsert(formData);
    setFile(null);
  };

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
          동영상 설정
        </Typography>
        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
            },
            "& th": { padding: 0 },
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell align="left">
                <label htmlFor="file-upload">
                  <TextField
                    variant="outlined"
                    fullWidth
                    InputProps={{ readOnly: true }}
                    value={file ? file.name : ""}
                    placeholder="동영상을 선택해주세요"
                    onClick={() =>
                      document.getElementById("file-upload").click()
                    }
                  />
                </label>
                <input
                  accept="video/*"
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileSelect}
                />
              </TableCell>
              <TableCell align="center" sx={{ width: "113px" }}>
                <Button
                  variant="contained"
                  color="success"
                  disabled={!file}
                  onClick={onUpload}
                >
                  업로드
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
              {videos &&
                videos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell align="right">
                      <Checkbox
                        checked={video.active}
                        onClick={() => onToggle(video.id, video.active)}
                      />
                    </TableCell>
                    <TableCell align="left" colSpan={4}>
                      <TextField
                        variant="outlined"
                        disabled
                        fullWidth
                        defaultValue={video.video_name}
                        InputProps={{ style: { color: "black" } }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <RemoveCircleOutlineIcon
                        sx={{ color: red[500] }}
                        onClick={() => {
                          onDelete(video.id);
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

export default DidVideoSetting;
