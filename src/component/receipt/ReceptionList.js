import * as React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';

const ReceptionList = () => {
    const [receiptList, setReceiptList] = useState({});

    useEffect(() => {
        axios.get('/api/receipt/getReceipt')
          .then(response => {
            setReceiptList(response.data);
          });
      }, []);

    return (
        <div>
            <h3></h3>
        </div>
    );
};

export default ReceptionList;