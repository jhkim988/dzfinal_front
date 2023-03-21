import React from 'react';
import DaumPostcode from "react-daum-postcode";
import styled from 'styled-components';

const PopupPostCode = (props) => {
    // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let zonecode = data.zonecode;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)
        props.onClose()
        props.setcompany({
            ...props.company,
            address: fullAddress,
            zip_code: zonecode
        })
    }

    const postCodeStyle = {
        // display: "block",
        // position: "absolute",
        // top: "10%",
        // width: "600px",
        // height: "600px",
        // padding: "7px",
    };



    return (
        <div>
            <DaumPostcode className="postModel" style={postCodeStyle} onComplete={handlePostCode} autoClose />
            <button type='button' onClick={() => { props.onClose() }} className='postCode_btn'>닫기</button>
        </div>
    )
}

const postModel = styled.div`
background : white;
    position : fixed;
    left:0;
    top:3;
    height:600px%;
    width:600px%;
`


export default PopupPostCode;

