import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Paper,
  TextField,
  Toolbar,
} from "@mui/material";
import { IconChevronLeft } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { MqttContext } from "../waiting/MqttContextProvider";
import moment from "moment";

const ChatRoom = ({ room, onBackClick }) => {
  const [message, setMessage] = useState({
    mode: "private",
    chatroom_id: room.chatroom_id,
    from: 1, // 수정
    message: "",
    created_at: new Date().toISOString(),
  });
  const [messages, setMessages] = useState([]);
  const { current: client } = useContext(MqttContext);

  useEffect(() => {
    axios
      .get(`api/chat/getchatroommessages?chatroom_id=${room.chatroom_id}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const messagesBox = document.getElementById("messages-box");
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }, [messages]);

  const publish = () => {
    if (client) {
      const newMessage = {
        mode: "private",
        chatroom_id: room.chatroom_id,
        from: 1, // 수정
        message: message.message,
        created_at: new Date().toISOString(),
      };
      client.publish("chat", JSON.stringify(newMessage), { qos: 1 });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
    setMessage({ message: "" });
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
          id="messages-box"
          sx={{
            display: "block",
            height: "250px",
            overflowY: "auto",
          }}
        >
          {/* 목록 출력 */}
          {messages.map((message, index) =>
            message.from !== 1 ? ( // 수정
              <Card
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Avatar sx={{ alignSelf: "center", marginRight: 1 }}>
                  <img
                    src={`/api/chat/getthumbnail?thumbnail_image=${message.thumbnail_image}`}
                    alt="사진"
                    style={{ width: "100%" }}
                  />
                </Avatar>
                <Box sx={{ display: "flex", marginTop: 1, marginBottom: 1 }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box>{message.employee_name}</Box>
                    <Box sx={{ display: "flex" }}>
                      <Paper elevation={2}>
                        <Box sx={{ padding: 1 }}>{message.message}</Box>
                      </Paper>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-end",
                          marginLeft: 1,
                        }}
                      >
                        {moment(message.created_at).format("a hh:mm")}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Card>
            ) : (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Box sx={{ display: "flex", marginTop: 1, marginBottom: 1 }}>
                  <Box
                    sx={{
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    {moment(message.created_at).format("a hh:mm")}
                  </Box>
                  <Paper
                    elevation={2}
                    sx={{ marginLeft: 1, backgroundColor: "yellow" }}
                  >
                    <Box sx={{ padding: 1 }}>{message.message}</Box>
                  </Paper>
                </Box>
              </Card>
            )
          )}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            multiline
            maxRows={4}
            placeholder="내용을 입력해주세요."
            value={message.message}
            onChange={(e) =>
              setMessage((prevMessage) => ({
                ...prevMessage,
                message: e.target.value,
                created_at: new Date().toISOString(),
              }))
            }
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
