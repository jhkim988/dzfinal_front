import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import axios from "axios";
import { red } from "@mui/material/colors";

const Diagnosis = ({
  handleDiagnosisAdd,
  diagnosis,
  handleDiagnosisRemove,
}) => {
  const [disease_code, setDisease_code] = useState("");
  const [disease_name, setDisease_name] = useState("");
  const [searchList, setSearchList] = useState([]);
  const searchListRef = useRef();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  function handleKeyUp(e) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Enter") {
      if (e.target.value.length >= 2) {
        axios
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

  // const handleAdd = (disease) => {
  //   if (underlying.some((item) => item.disease_id === disease.disease_id)) {
  //     // 이미 추가된 질병일 경우
  //     alert("이미 추가된 질병입니다.");
  //   } else {
  //     setUnderlying((prev) => [...prev, disease]);
  //   }
  // };

  // function handleRemove(disease_id) {
  //   axios
  //     .post("/api/clinic/deleteUnderlying", {
  //       patient_id: 1,
  //       disease_id: disease_id,
  //     })
  //     .then((response) => {})
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   const newUnderlying = underlying.filter(
  //     (disease) => disease.disease_id !== disease_id
  //   );
  //   setUnderlying(newUnderlying);
  // }

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
      <Box>진단</Box>
      <Box>
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
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
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
            height: "30vh",
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
        <Box sx={{ minHeight: "220px", overflowY: "auto" }}>
          <Table>
            <TableBody>
              {diagnosis.map((disease) => (
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
