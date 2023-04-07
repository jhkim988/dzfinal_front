import {
    Box,
    Button,
    Checkbox,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
    OutlinedInput,
    FormHelperText,
  } from "@mui/material";
  import FormControl, { useFormControl } from '@mui/material/FormControl';
  import { tableCellClasses } from "@mui/material/TableCell";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axiosClient from "../login/AxiosClient";


const DidView = () => {

    const [getDidSubtitle, setGetDidSubtitle] = useState([]);
    const [index, setIndex] = useState(0);


    useEffect(() => {
        axiosClient.get(`/api/view/getDidSubtitle`, {
            headers: {
              "Content-Type": "application/json",
            }
          })
        .then(response => {
            setGetDidSubtitle(response.data);
        })
    }, [])

    //
    useEffect(() => {
        const interval = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % getDidSubtitle.length);
        }, 6000);
        return () => clearInterval(interval);
      }, [getDidSubtitle]);


    
    return (
        <div>
            <Typography style={{fontSize: "4.5rem" , fontWeight: "bold"}}>{getDidSubtitle[index]?.message}</Typography>
           
        </div>
    );
};

export default DidView;