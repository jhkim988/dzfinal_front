import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useContext, useState, useRef } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { red } from "@mui/material/colors";
import AxiosClientContext from './../login/AxiosClient';

const Prescription = ({
  handlePrescriptionAdd,
  handlePrescriptionRemove,
  prescription,
  medicalInfo,
  mode,
}) => {
  const { axiosClient } = useContext(AxiosClientContext);
  const [drug_code, setDrug_code] = useState("");
  const [drug_name, setDrug_name] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const searchListRef = useRef();
  const [selectedIndex, setSelectedIndex] = useState(0);

  function handleKeyUp(e) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Enter") {
      setSearchText(e.target.value);

      if (e.target.value.length >= 2) {
        axiosClient
          .get(
            `/api/clinic/drug/${e.target.name}/${encodeURIComponent(
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
      <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
        처방
      </Typography>
      <Box sx={{ marginRight: 1 }}>
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
            onFocus={handleKeyUp}
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
            onFocus={handleKeyUp}
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
              {prescription &&
                prescription.map((drug) => (
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
