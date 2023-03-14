import axios from 'axios'; 
import { Component } from 'react';


// url 주소 변경 필요
const RECEIPT_API_BASE_URL = "http://localhost:8090/api/receipt";

class ReceiptService extends Component {

    getReceipt() {
        return axios.get(RECEIPT_API_BASE_URL);
    }

    createReceipt(Receipt) {
        return axios.post(RECEIPT_API_BASE_URL, Receipt);
    }

    getOneReceipt(receipt_id) {
        return axios.get(RECEIPT_API_BASE_URL + "/" + receipt_id);
    }

    updateReceipt(receipt_id, Receipt) {
        return axios.put(RECEIPT_API_BASE_URL + "/" + receipt_id, Receipt);
    }

    deleteReceipt(receipt_id) {
        return axios.delete(RECEIPT_API_BASE_URL + "/" + receipt_id);
    }

}

export default new ReceiptService();