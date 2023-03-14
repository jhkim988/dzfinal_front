import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



export default function BasicSelect() {
  const [cardName, setCardName] = React.useState('');

  const handleChange = (event) => {
    setCardName(event.target.value);
  };

  const ariaLabel = { 'aria-label': 'description' };

  return (
    <>
    카드사
    <Box sx={{ maxWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">카드사</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cardName}
          label="카드사"
          onChange={handleChange}
        >
          <MenuItem value={10}>현대카드</MenuItem>
          <MenuItem value={20}>삼성카드</MenuItem>
          <MenuItem value={30}>신한카드</MenuItem>
          <MenuItem value={40}>국민카드</MenuItem>
          <MenuItem value={50}>농협카드</MenuItem>
        </Select>
      </FormControl>
    </Box>
    카드번호
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 0.5, width:70},
      }}
      noValidate
      autoComplete="off"
    >
      <Input placeholder="카드번호1" inputProps={ariaLabel} />
      <Input placeholder="카드번호2" inputProps={ariaLabel} />
      <Input placeholder="카드번호3" inputProps={ariaLabel} />
      <Input placeholder="카드번호4" inputProps={ariaLabel} />
    </Box>
    <Stack spacing={2} direction="row">
      <Button variant="contained">확인</Button>
      <Button variant="outlined">취소</Button>
    </Stack>
    </>
  );
}