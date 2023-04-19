import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { red } from "@mui/material/colors";
import axiosClient from "../login/AxiosClient";

const Diagnosis = ({
  handleDiagnosisAdd,
  handleDiagnosisRemove,
  diagnosis,
  medicalInfo,
  mode,
}) => {
  const [disease_code, setDisease_code] = useState("");
  const [disease_name, setDisease_name] = useState("");
  const [searchList, setSearchList] = useState([]);
  const searchListRef = useRef();
  const [selectedIndex, setSelectedIndex] = useState(0);

  function handleKeyUp(e) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Enter") {
      if (e.target.value.length >= 2) {
        axiosClient
          .get(
            `/api/clinic/disease/${e.target.name}/${encodeURIComponent(
              e.target.value
            )}`
          )
          .then((response) => {
            setSearchList(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setSearchList([]);
      }
    }
  }

  function hideSearchList() {
    setSearchList([]);
  }

  function resetInputValue() {
    setDisease_code("");
    setDisease_name("");
  }

  const handleKeyDown = (e) => {
    const scrollRef = searchListRef.current;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < searchList.length - 1 ? prevIndex + 1 : prevIndex
      );
      const selectedRow = scrollRef.querySelector(
        `tr:nth-of-type(${selectedIndex + 3})`
      );
      if (selectedRow) {
        selectedRow.scrollIntoView({
          block: "nearest",
          inline: "nearest",
          behavior: "smooth",
        });
      }
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
      const selectedRow = scrollRef.querySelector(
        `tr:nth-of-type(${selectedIndex - 1})`
      );
      if (selectedRow) {
        selectedRow.scrollIntoView({
          block: "nearest",
          inline: "nearest",
          behavior: "smooth",
        });
      }
    } else if (e.key === "Enter") {
      console.log(selectedIndex);
      handleDiagnosisAdd(searchList[selectedIndex]);
      setSelectedIndex(-1);
      scrollRef.scrollTop = 0;
      hideSearchList();
      resetInputValue();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchListRef.current && !searchListRef.current.contains(e.target)) {
        setSearchList([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchList]);

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ marginLeft: 2 }}>
        진단
      </Typography>
      <Box sx={{ marginLeft: 1 }}>
        <Box sx={{ display: "flex" }}>
          <TextField
            size="small"
            name="1"
            label="질병코드"
            variant="outlined"
            value={disease_code}
            autoComplete="off"
            onChange={(e) => setDisease_code(e.target.value)}
            onKeyUp={handleKeyUp}
            onFocus={handleKeyUp}
            onKeyDown={handleKeyDown}
            sx={{ marginRight: 1 }}
          />
          <TextField
            size="small"
            name="2"
            label="질병명"
            variant="outlined"
            value={disease_name}
            autoComplete="off"
            onChange={(e) => setDisease_name(e.target.value)}
            onKeyUp={handleKeyUp}
            onFocus={handleKeyUp}
            onKeyDown={handleKeyDown}
            sx={{ marginLeft: 1 }}
          />
        </Box>
        <Box
          ref={searchListRef}
          sx={{
            width: 340,
            position: "absolute",
            backgroundColor: "white",
            zIndex: 10,
            border: "1px solid black",
            borderRadius: 5,
            display: searchList.length === 0 ? "none" : "block",
            maxHeight: "30vh",
            overflowY: "auto",
          }}
        >
          <Table>
            <TableBody>
              {searchList.map((disease, index) => (
                <TableRow
                  key={disease.disease_id}
                  hover
                  selected={selectedIndex === index}
                  onClick={() => {
                    handleDiagnosisAdd(disease);
                    setSelectedIndex(-1);
                    hideSearchList();
                    resetInputValue();
                  }}
                >
                  <TableCell align="center">{disease.disease_code}</TableCell>
                  <TableCell align="center">{disease.disease_name}</TableCell>
                  <TableCell align="center">
                    <AddCircleOutlineOutlinedIcon
                      color="primary"
                      sx={{ alignSelf: "center" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box
          sx={{
            marginTop: 1,
            height: "160px",
            overflowY: "auto",
            border: "1px solid lightgray",
            borderRadius: 2,
          }}
        >
          <Table>
            <TableBody>
              {diagnosis &&
                diagnosis.map((disease) => (
                  <TableRow key={disease.disease_id}>
                    <TableCell align="center">{disease.disease_code}</TableCell>
                    <TableCell align="center">{disease.disease_name}</TableCell>
                    <TableCell align="center">
                      <RemoveCircleOutlineIcon
                        sx={{ color: red[500] }}
                        onClick={() => {
                          handleDiagnosisRemove(disease.disease_id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default Diagnosis;
