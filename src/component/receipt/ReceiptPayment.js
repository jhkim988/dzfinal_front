import React, { useState } from 'react';
import ReactToPrint from "react-to-print";
import axiosClient from './../login/AxiosClient';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Treatment from "./modal/Treatment";
import ClinicRequest from "./modal/ClinicRequest";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  OutlinedInput,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";


export default function BasicSelect({user}) {
  const { ClinicPrice, TreatmentPrice, InsuranceRatio, insurance} = user;
  const [showCardForm, setShowCardForm] = useState(false); // 카드 결제 폼을 보여줄지 여부를 저장할 상태 값을 추가합니다.
  const [isCashPayment, setIsCashPayment] = useState(false); // 현금결제 상태 값을 추가합니다.
  const [isCardPayment, setIsCardPayment] = useState(false);
  const [modifyReceipt, setModifyReceipt] = useState(false);

  const handleModifyReceipt = () => {
    setModifyReceipt(true);
  };

  const handleCardPayment = () => {
    setIsCashPayment(false); // 카드결제 버튼을 클릭하면 현금결제 상태 값을 false로 변경합니다.
    setShowCardForm(true);
    // setShowCardForm(true); // 카드결제 버튼을 클릭하면 카드결제 폼을 보여주도록 상태 값을 변경합니다.
  };

  const [isReceipt, setIsReceipt] = useState(false);

  const handleReceipt = () => {
    setIsReceipt(true);
  };

  // 현금결제
  const handleCashPayment = async () => {
    try {
      let url = "/api/receipt/insertReceipt";
      if (modifyReceipt && user.mode !== "현금") {
        url = "/api/receipt/updateReceipt";
      }
      const response = await axiosClient.post(
        url,
        {
          receipt_id: user.receipt_id,
          reception_id: user.reception_id,
          ratio: InsuranceRatio,
          total_amount: (ClinicPrice + TreatmentPrice) * InsuranceRatio,
          card_name: "",
          card_number: "",
          mode: "현금",
          creator: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (modifyReceipt) {
        alert("수납정보가 변경되었습니다.");
        console.log("Modify Payment successful", response.data);
        modifyReceipt(false);
      } else {
        alert("현금결제가 완료되었습니다.");
        console.log("Payment successful", response.data);
      }
      setIsCardPayment(true);
      setIsReceipt(true);
    } catch (error) {
      console.log(error);
    }
  };

  // select 값 받아오기
  const [card_name, setCard_name] = React.useState("");
  const handleCardNameChange = (event) => {
    setCard_name(event.target.value);
  };

  // const handleChange = (event) => {
  //   if (modifyReceipt) {
  //     setCard_name(editCardValue);
  //     setEditCardValue(event.target.value);
  //   } else {
  //     setCard_name(event.target.value);
  //   }
  // };
  const ariaLabel = { "aria-label": "description" };

  const [card_number, setCard_number] = useState("");
  const handleCardNumber = (event) => {
    setCard_number(event.target.value);
    const { id, value } = event.target;
    const max = parseInt(event.target.getAttribute("max"), 10) || 4;

    if (value.length <= max) {
      // 하나의 문자열로 결합하기
      const joinedValue = [1, 2, 3, 4]
        .map((i) => {
          const currentVal =
            id === `card_number${i}`
              ? value
              : document.getElementById(`card_number${i}`).value;
          return currentVal || "";
        })
        .join("");
      setCard_number(joinedValue);
    }
  };

  function CardNumberInput() {
    const [card_number, setCard_number] = useState({
      card_number1: "",
      card_number2: "",
      card_number3: "",
      card_number4: "",
    });

    const handleCardNumberChange = (e) => {
      const { name, value } = e.target;
      setCard_number((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const formatCardNumber = (card) => {
      const { card_number1, card_number2, card_number3, card_number4 } = card;
      return `${card_number1}-${card_number2}-${card_number3}-${card_number4}`;
    };

    const handleCardNumberSubmit = (e) => {
      e.preventDefault();
      const cardNumber = formatCardNumber(card_number);
      console.log(cardNumber);
    };
  }

  // 카드번호 가리기
  const [hidePassword, setHidePassword] = useState(true);
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  // 카드결제
  // axios로 데이터 삽입하기
  const handleReceiptInsert = async () => {
    try {
      const insertUrl = "/api/receipt/insertReceipt";
      const updateUrl = "/api/receipt/updateReceipt";
  
      if (modifyReceipt) {
        const response = await axiosClient.post(
          updateUrl,
          {
            receipt_id: user.receipt_id,
            reception_id: user.reception_id,
            ratio: InsuranceRatio,
            total_amount: (ClinicPrice + TreatmentPrice) * InsuranceRatio,
            card_name: card_name,
            card_number: card_number,
            mode: "카드",
            creator: 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("수납정보가 변경되었습니다.");
        console.log("Modify Payment successful", response.data);
        modifyReceipt(false);
      } else {
        const response = await axiosClient.post(
          insertUrl,
          {
            receipt_id: user.receipt_id,
            reception_id: user.reception_id,
            ratio: InsuranceRatio,
            total_amount: (ClinicPrice + TreatmentPrice) * InsuranceRatio,
            card_name: card_name,
            card_number: card_number,
            mode: "카드",
            creator: 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("카드결제가 완료되었습니다.");
        console.log("Payment successful", response.data);
      }
      setIsCardPayment(true);
      setIsReceipt(true);
    } catch (error) {
      console.log(error);
    }
  };


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    overflow: "scroll",
    p: 4,
  };
  const [treatmentModalOpen, setTreatmentModalOpen] = React.useState(false);
  const [clinicRequestModalOpen, setClinicRequestModalOpen] =
    React.useState(false);

  // 처방전 모달
  const handleTreatmentModalOpen = () => {
    setTreatmentModalOpen(true);
  };
  const handleTreatmentModalClose = () => {
    setTreatmentModalOpen(false);
  };

  // 진료의뢰서 모달
  const handleClinicRequestModalOpen = () => {
    setClinicRequestModalOpen(true);
  };
  const handleClinicRequestModalClose = () => {
    setClinicRequestModalOpen(false);
  };


  // 프린트 기능
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //초기화
  const resetHandler = (event) => {
    setCard_number({
      card_number1: "",
      card_number2: "",
      card_number3: "",
      card_number4: "",
    });
    setCard_name({
      card_name: "",
    });
};

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Button
          sx={{ fontSize: "12px" }}
          variant="contained"
          disabled={            
             user.state === "진료중" || user.state === "진료대기"
          }
          onClick={handleCardPayment}
        >
          카드결제
        </Button>
        <Button
          sx={{ fontSize: "12px" }}
          variant="contained"
          onClick={handleCashPayment}
          disabled={
             user.state === "진료중" || user.state === "진료대기"
          }
        >
          현금결제
        </Button>

        <Button
          sx={{
            backgroundColor: "green",
            fontSize: "12px",
          }}
          variant="contained"
          disabled={user.treatment !== 0 && !isReceipt}
          onClick={handleTreatmentModalOpen}
        >
          처방전
        </Button>
        <Modal open={treatmentModalOpen} onClose={handleTreatmentModalClose}>
          <Box sx={style}>
            <Treatment user={user} ref={componentRef}/>
            <Button onClick={() => {
              handleTreatmentModalClose();
              handlePrint();
            }}> 
            확인 
            </Button>
          </Box>
        </Modal>

        <Button
          sx={{ backgroundColor: "green", fontSize: "12px" }}
          variant="contained"
          disabled={user.clinic_request !== 0 && !isReceipt}
          onClick={handleClinicRequestModalOpen}
        >
          진료의뢰서
        </Button>
        <Modal
          open={clinicRequestModalOpen}
          onClose={handleClinicRequestModalClose}
        >
          <Box sx={style}>
            <ClinicRequest user={user} ref={componentRef} />
            <Button onClick={handleClinicRequestModalClose}> 확인 </Button>
          </Box>
        </Modal>
      </Stack>

      <br />
      <br />

      <div style={{ height: 180 }}>
        <Box disabled>
          <Box sx={{ height: 50, maxWidth: 150 }}>
          <FormControl fullWidth>
            <InputLabel id="cardName-label">카드사</InputLabel>
              <Select
                labelId="cardName-label"
                id="card_name"
                value={ card_name || user.card_name || "" }
                label="카드사"
                size="small"
                margin="dense"
                onChange={handleCardNameChange}
                disabled={!showCardForm}
              >
                <MenuItem value={"현대카드"}>현대카드</MenuItem>
                <MenuItem value={"삼성카드"}>삼성카드</MenuItem>
                <MenuItem value={"신한카드"}>신한카드</MenuItem>
                <MenuItem value={"국민카드"}>국민카드</MenuItem>
                <MenuItem value={"농협카드"}>농협카드</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { marginRight: 1, width: "22.5%" },
              ".css-1qb9p1k-MuiInputBase-input-MuiOutlinedInput-input": { marginLeft: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl>
              <InputLabel shrink={true} variant="outlined" sx={{ backgroundColor: "white" }}>카드번호</InputLabel>
              <OutlinedInput
                onChange={handleCardNumber}
                disabled={!showCardForm}
                type="number"
                id="card_number1"
                name="card_number1"
                placeholder={user.card_number ? user.card_number.substring(0, 4) : "" }
                inputProps={ariaLabel}
              />
            </FormControl>
            <FormControl>
              <InputLabel></InputLabel>
              <OutlinedInput
                onChange={handleCardNumber}
                disabled={!showCardForm}
                type={hidePassword ? "password" : "text"}
                id="card_number2"
                name="card_number2"
                placeholder={ user.card_number ? user.card_number.substring(4, 8) : ""}
                inputProps={ariaLabel}
              />
            </FormControl>
            <FormControl>
              <InputLabel></InputLabel>
              <OutlinedInput
                onChange={handleCardNumber}
                disabled={!showCardForm}
                type={hidePassword ? "password" : "text"}
                id="card_number3"
                name="card_number3"
                placeholder={user.card_number ? user.card_number.substring(8, 12) : ""}
                inputProps={ariaLabel}
              />
            </FormControl>
            <FormControl>
              <InputLabel></InputLabel>
              <OutlinedInput
                onChange={handleCardNumber}
                disabled={!showCardForm}
                type="number"
                id="card_number4"
                name="card_number4"
                placeholder={user.card_number ? user.card_number.substring(12, 16) : ""}
                inputProps={ariaLabel}
              />
            </FormControl>
          </Box>
          <br />
          <Stack spacing={2} direction="row" sx={{ display: "flex" }}>
            <Button
              disabled={!showCardForm}
              variant="contained"
              onClick={handleReceiptInsert}
            >
              {user.receipt_id > 0 ? "수정" : "확인"}
            </Button>
            
            <Button
              disabled={!showCardForm}
              type="reset"
              variant="outlined"
              onClick={resetHandler}
            >
              취소
            </Button>

            <Button
              sx={{
                backgroundColor: "green",
                fontSize: "12px",
                marginLeft: "auto",
              }}
              variant="contained"
              disabled={user.state !== "수납완료"}
              onClick={handleModifyReceipt}
            >
              수정
            </Button>

          </Stack>
        </Box>
        
      </div>
    </>
  );
}
