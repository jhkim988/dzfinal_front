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
import { red } from "@mui/material/colors";
import axios from "axios";

const DrugTaking = ({ props }) => {
  const [drug_code, setDrug_code] = useState("");
  const [drug_name, setDrug_name] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const searchListRef = useRef();
  const [drugTaking, setDrugTaking] = useState(props);
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

  const handleAdd = (drug) => {
    if (drugTaking.some((item) => item.drug_id === drug.drug_id)) {
      // 이미 추가된 질병일 경우
      alert("이미 추가된 약품입니다.");
    } else {
      axios
        .post("/api/clinic/insertDrugTaking", {
          patient_id: 1,
          drug_id: drug.drug_id,
        })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
      setDrugTaking((prev) => [...prev, drug]);
    }
  };

  function handleRemove(drug_id) {
    axios
      .post("/api/clinic/deleteDrugTaking", {
        patient_id: 1,
        drug_id: drug_id,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });

    const newDrugTaking = drugTaking.filter((drug) => drug.drug_id !== drug_id);
    setDrugTaking(newDrugTaking);
  }

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < searchList.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter") {
      handleAdd(searchList[selectedIndex]);
      hideSearchList();
      resetInputValue();
    }
  };

  useEffect(() => {
    setDrugTaking(props);
  }, [props]);

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
      <Box>복용중인 약</Box>
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
                    handleAdd(drug);
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
      </Box>
      <Box sx={{ maxHeight: "250px", overflowY: "auto" }}>
        <Table>
          <TableBody>
            {drugTaking.map((drug) => (
              <TableRow key={drug.drug_id}>
                <TableCell align="center">{drug.drug_code}</TableCell>
                <TableCell align="center">{drug.drug_name}</TableCell>
                <TableCell align="center">
                  <RemoveCircleOutlineIcon
                    sx={{ color: red[500] }}
                    onClick={() => {
                      handleRemove(drug.drug_id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default DrugTaking;
