import React, { useEffect, useState, useRef } from "react";
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

const Underlying = ({ props, onInsert }) => {
  const [disease_code, setDisease_code] = useState("");
  const [disease_name, setDisease_name] = useState("");
  const [searchList, setSearchList] = useState([]);
  const searchListRef = useRef();
  const [underlying, setUnderlying] = useState(props);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  function handleKeyUp(e) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Enter") {
      if (e.target.value.length >= 2) {
        console.log(e.target.name + e.target.value);
        axios
          .get(
            `/api/clinic/disease/${e.target.name}/${encodeURIComponent(
              e.target.value
            )}`
          )
          .then((response) => {
            console.log(response.data);
            setSearchList(response.data);
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

  const handleAdd = (disease) => {
    if (underlying.some((item) => item.disease_id === disease.disease_id)) {
      // 이미 추가된 질병일 경우
      alert("이미 추가된 질병입니다.");
    } else {
      axios
        .post("/api/clinic/disease", {
          patient_id: 1,
          disease_id: disease.disease_id,
        })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
      setUnderlying((prev) => [...prev, disease]);
    }
  };

  function handleRemove(disease_id) {
    axios
      .delete("/api/clinic/disease", {
        params: {
          patient_id: 1,
          disease_id: disease_id,
        }
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });

    const newUnderlying = underlying.filter(
      (disease) => disease.disease_id !== disease_id
    );
    setUnderlying(newUnderlying);
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
      onInsert(searchList[selectedIndex]);
      hideSearchList();
      resetInputValue();
    }
  };

  useEffect(() => {
    setUnderlying(props);
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
      <Box>기저질환</Box>
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
                    onInsert(disease);
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
      </Box>
      <Box sx={{ maxHeight: "250px", overflowY: "auto" }}>
        <Table>
          <TableBody>
            {underlying.map((disease) => (
              <TableRow key={disease.disease_id}>
                <TableCell align="center">{disease.disease_code}</TableCell>
                <TableCell align="center">{disease.disease_name}</TableCell>
                <TableCell align="center">
                  <RemoveCircleOutlineIcon
                    sx={{ color: red[500] }}
                    onClick={() => {
                      handleRemove(disease.disease_id);
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

export default Underlying;