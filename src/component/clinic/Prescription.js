import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { red } from "@mui/material/colors";

const Prescription = ({
  handlePrescriptionAdd,
  prescription,
  handlePrescriptionRemove,
}) => {
  const [drug_code, setDrug_code] = useState("");
  const [drug_name, setDrug_name] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const searchListRef = useRef();
  const [drugTaking, setDrugTaking] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  function handleKeyUp(e) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Enter") {
      setSearchText(e.target.value);

      if (e.target.value.length >= 2) {
        axios
          .get(
            `/api/clinic/drugtaking/${e.target.name}/${encodeURIComponent(
              searchText
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
    setDrug_code("");
    setDrug_name("");
  }

  // const handleAdd = (drug) => {
  //   if (drugTaking.some((item) => item.drug_id === drug.drug_id)) {
  //     // 이미 추가된 질병일 경우
  //     alert("이미 추가된 약품입니다.");
  //   } else {
  //     setDrugTaking((prev) => [...prev, drug]);
  //   }
  // };

  // function handleRemove(drug_id) {
  //   const newDrugTaking = drugTaking.filter((drug) => drug.drug_id !== drug_id);
  //   setDrugTaking(newDrugTaking);
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
      handlePrescriptionAdd(searchList[selectedIndex]);
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
      <Box>처방</Box>
      <Box>
        <Box sx={{ display: "flex" }}>
          <TextField
            size="small"
            name="1"
            label="약품코드"
            variant="outlined"
            value={drug_code}
            autoComplete="off"
            onChange={(e) => setDrug_code(e.target.value)}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
          />
          <TextField
            size="small"
            name="2"
            label="약품명"
            variant="outlined"
            value={drug_name}
            autoComplete="off"
            onChange={(e) => setDrug_name(e.target.value)}
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
              {searchList.map((drug, index) => (
                <TableRow
                  key={drug.drug_id}
                  hover
                  selected={selectedIndex === index}
                  onClick={() => {
                    handlePrescriptionAdd(drug);
                    setSelectedIndex(-1);
                    hideSearchList();
                    resetInputValue();
                  }}
                >
                  <TableCell align="center">{drug.drug_code}</TableCell>
                  <TableCell align="center">{drug.drug_name}</TableCell>
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
              {prescription.map((drug) => (
                <TableRow key={drug.drug_id}>
                  <TableCell align="center">{drug.drug_code}</TableCell>
                  <TableCell align="center">{drug.drug_name}</TableCell>
                  <TableCell align="center">
                    <RemoveCircleOutlineIcon
                      sx={{ color: red[500] }}
                      onClick={() => {
                        handlePrescriptionRemove(drug.drug_id);
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

export default Prescription;
