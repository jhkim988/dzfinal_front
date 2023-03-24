import { TextField } from '@mui/material';
import React, { useState } from 'react';
import PopupPostCode from './PopupPostCode';

const Test = () => {
    // 팝업창 상태 관리
    const [popup, setPopup] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({
        zip_code: '',
        address: ''
    });

    const handleComplete = (data) => {
        setPopup(!popup);
    }
    // 팝업창 닫기
    const closePostCode = () => {
        setPopup(false);
    }

    const handleInput = (e) => {
        setSelectedAddress({
            ...selectedAddress,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div>
            <TextField id="outlined-basic" label="우편번호" name="zip_code" variant="outlined" inputProps={{ readOnly: true }} size='small' onChange={handleInput} value={selectedAddress.zip_code} />
            <button type='button' onClick={handleComplete}>우편번호 검색</button><br></br>
            <TextField id="outlined-basic" label="주소" name="address" margin="dense" variant="outlined" size='small' value={selectedAddress.address} style={{ width: "300px", height: "10px" }} />
            {popup && <PopupPostCode company={selectedAddress} setcompany={setSelectedAddress} onClose={closePostCode}></PopupPostCode>}

            {/* <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode onClose={closePostCode} />
                    </PopupDom>
                )}
            </div> */}
        </div>
    )
}

export default Test;