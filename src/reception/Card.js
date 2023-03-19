import * as React from 'react';
import ReceiptService from '../service/ReceiptService';
import { useState, useEffect } from "react";
import axios from "axios";
import {Box, InputLabel, MenuItem, FormControl, Select, Input, Button, Stack} from '@mui/material';

const Card = (props) => {

  // select 값 받아오기
  const [card_name, setCard_name] = React.useState('');
  const handleChange = (event) => {
    setCard_name(event.target.value);
  };
  const ariaLabel = { 'aria-label': 'description' };

  const [card_number, setCard_number] = useState('');
  const handleCardNumber = (event) => {
    setCard_number(event.target.value);
  }

  // 카드번호 가리기
  const [hidePassword, setHidePassword] = useState(true);
  const toggleHidePassword =()=>{
    setHidePassword(!hidePassword);
  }

  // axios로 데이터 삽입하기
  const [receiptInsert, setReceiptInsert] = useState([]);

  const handleReceiptInsert = async () => {
    if (card_name && card_number) {
      try {
        const response = await axios.post('/api/receipt/insertReceipt', {
          reception_id: 1,
          ratio: 1.1,
          total_amount: 13500,
          card_name: card_name,
          card_number: card_number,
          mode: '카드',
          creator: 1
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Payment successful', response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
        <div style={{ height: 180}}>
          카드사
          <br/>
          <form onSubmit={handleReceiptInsert}>
            <Box sx={{ height: 50, maxWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="cardName-label">카드사</InputLabel>
                <Select
                  labelId="cardName-label"
                  id="card_name"
                  value={card_name}
                  label="카드사"
                  size='small'
                  margin='dense'
                  onChange={handleChange}
                >
                  <MenuItem value={'현대카드'}>현대카드</MenuItem>
                  <MenuItem value={'삼성카드'}>삼성카드</MenuItem>
                  <MenuItem value={'신한카드'}>신한카드</MenuItem>
                  <MenuItem value={'국민카드'}>국민카드</MenuItem>
                  <MenuItem value={'농협카드'}>농협카드</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </form>
          카드번호
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 0.5, width:70},
            }}
            noValidate
            autoComplete="off"
            onChange={handleCardNumber}
          >
            <Input type="number" id="card_number" name="card_number" value={card_number} max={4} placeholder="카드번호1" inputProps={ariaLabel} />
            <Input type={hidePassword ? "password":"text"} id="card_number2" name="card_number2" placeholder="카드번호2" inputProps={ariaLabel} />
            <Input type={hidePassword ? "password":"text"} id="card_number3" name="card_number3" placeholder="카드번호3" inputProps={ariaLabel} />
            <Input type="number" id="card_number4" name="card_number4" placeholder="카드번호4" inputProps={ariaLabel} />
          </Box>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={handleReceiptInsert}>확인</Button>
            <Button type="reset" variant="outlined">취소</Button>
          </Stack>
    
          <div>
            
          </div>
        </div>
      );
}

export default Card;