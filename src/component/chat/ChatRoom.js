import { AppBar, Box, Button, Grid, TextField, Toolbar } from "@mui/material";
import { IconChevronLeft } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { Client } from "./ChatMqtt";
import { useContext } from "react";
import axios from "axios";

const ChatRoom = ({ room, onBackClick }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const client = useContext(Client);

  useEffect(() => {
    axios
      .get(`api/chat/getchatroommessages?chatroom_id=${room.chatroom_id}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const publish = () => {
    if (client) {
      client.publish(
        "chat",
        JSON.stringify({
          mode: "private",
          to: room.chatroom_id,
          from: 3, // 수정
          message: message,
        }),
        { qos: 1 }
      );
    }
    setMessage("");
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <Grid container spacing={1} sx={{ height: 400 }}>
      <Grid item xs={12}>
        <AppBar
          position="static"
          style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
        >
          <Toolbar>
            <Button color="inherit" onClick={onBackClick}>
              <IconChevronLeft /> 목록 보기
            </Button>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "block",
            height: "250px",
            overflowY: "auto",
          }}
        >
          {messages.map((message, index) => (
            <Box key={index}>{message}</Box>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            multiline
            maxRows={4}
            placeholder="내용을 입력해주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                publish();
              }
            }}
            sx={{ width: "100%" }}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button variant="contained" onClick={publish}>
              전송
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChatRoom;
