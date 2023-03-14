import React, { Component } from 'react';
import ReceiptService from '../Service/ReceiptService';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



// const options = [
//     '현대카드', '삼성카드', '신한카드', '국민카드', '농협카드', ''
// ];

// const defaultOption = "카드사를 선택하세요.";



class Receipt extends Component {

    constructor(props) {
        super(props)

        this.state = {
            receipt: []
        }
        this.createReceipt = this.createReceipt.bind(this);
    }

    componentDidMount() {
        ReceiptService.getReceipt().then((res) => {
            this.setState({ board: res.data });
        });
    }

    createReceipt() {
        alert("카드결제 완료");
        document.location.href="/createReceipt/_create";
    }

    render() {
        return (
            <div>
                <Stack direction="row" spacing={1}>
                    <Button variant="contained" href="#contained-buttons" disabled>처방전</Button>
                    <Button variant="contained" href="#contained-buttons" disabled>진료의뢰서</Button>
                    <Button variant="contained" href="#contained-buttons" disabled>현금결제</Button>
                    <Button variant="contained" href="#contained-buttons" disabled>카드결제</Button>
                </Stack>
                {/* <div>
                    카드사
                    <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
                    <br/>
                    카드번호<br/>
                    <button>확인</button>
                    <button>취소</button>
                </div> */}
            </div>
        );
    }
}

export default Receipt;