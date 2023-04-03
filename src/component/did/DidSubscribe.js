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
import axios from "axios";


const DidView = () => {

    const [getDidSubtitle, setGetDidSubtitle] = useState([]);
    const [index, setIndex] = useState(0);


    useEffect(() => {
        axios.get(`/api/view/getDidSubtitle`, {
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
        }, 5000);
        return () => clearInterval(interval);
      }, [getDidSubtitle]);


    
    return (
        <div>
            <Typography variant="h1" gutterBottom>{getDidSubtitle[index]?.message}</Typography>
           
        </div>
    );
};

export default DidView;