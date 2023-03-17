import React, { useCallback, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { red } from '@mui/material/colors';

const Underlying = ({underlying}) => {
    const [disease_code, setDisease_code] = useState('');
    const [disease_name, setDisease_name] = useState('');

    function handleKeyUp(event) {
        const searchText = event.target.value;

        if (searchText.size)
        console.log(searchText);
    }

    return (
        <Box>
            <Box>
                기저질환
            </Box>
            <Box sx={{ display: 'flex' }}>
                <TextField size='small' label="질병코드" variant="outlined" defaultValue={disease_code} />
                <TextField size='small' label="질병명" variant="outlined" defaultValue={disease_name} onKeyUp={handleKeyUp} />
                <AddCircleOutlineOutlinedIcon color="primary" sx={{ alignSelf: 'center' }}/>
            </Box>
            <Box>
                <Table>
                    <TableBody>
                        {underlying.map((disease, index) => (
                            <TableRow key={index}>
                                <TableCell align='center'>{disease.disease_code}</TableCell>
                                <TableCell align='center'>{disease.disease_name}</TableCell>
                                <TableCell align='center'><RemoveCircleOutlineIcon sx={{ color: red[500] }}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default Underlying;