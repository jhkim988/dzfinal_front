import { AppBar, Box, Button, Grid, TextField, Toolbar } from "@mui/material";
import { IconChevronLeft } from "@tabler/icons";
import React, { useState } from "react";
import { Client } from "./mqtt/ChatMqtt";
import { useContext } from "react";

const ChatRoom = ({ room, onBackClick }) => {
  const [message, setMessage] = useState("");
  const client = useContext(Client);

  const publish = () => {
    if (client) {
      client.publish(
        "chat",
        JSON.stringify({
          mode: "private",
          to: room.chatroom_id,
          from: "employee", // 수정
          message: message,
        }),
        { qos: 1 }
      );
    }
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
            display: "flex",
            height: "100%",
            overflowY: "auto",
          }}
        >
          채팅내역
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            multiline
            rows={4}
            placeholder="내용을 입력해주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
