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
import { IconChevronLeft, IconSend, IconSquarePlus } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { MqttContext } from "../waiting/MqttContextProvider";
import moment from "moment";
import axiosClient from "../login/AxiosClient";
import "./style.css";
import EmojiList from "./EmojiList";
import EmojiPicker from "emoji-picker-react";

const ChatRoom = ({ room, onBackClick }) => {
  const { employ_id: participants_id } = JSON.parse(
    localStorage.getItem("userInfo")
  );
  const [message, setMessage] = useState({
    mode: "private",
    chatroom_id: room.chatroom_id,
    from: participants_id, // 수정
    message: "",
    created_at: new Date().toISOString(),
  });
  const [messages, setMessages] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);
  const { current: client } = useContext(MqttContext);
  const isDisabled = !message.message.trim();
  const [thumbnail, setThumbnail] = useState([]);
  const [showEmojiList, setShowEmojiList] = useState(false);
  const [emojiIsDisabled, setEmojiIsDisabled] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/api/chat/getthumbnaillist")
      .then((response) => {
        setThumbnail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axiosClient
      .get("/api/chat/getchatroommessages", {
        params: {
          chatroom_id: room.chatroom_id,
          last: 0,
        },
      })
      .then((response) => {
        setMessages(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const handleMessage = (topic, message) => {
      if (topic === `chat/${room.chatroom_id}`) {
        const receivedMessage = JSON.parse(message.toString());
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    };

    client.subscribe(`chat/${room.chatroom_id}`, { qos: 1 }, (error) => {
      if (error) {
        console.log("Subscribe to topics error", error);
        return;
      }
    });

    client.on("message", handleMessage);

    return () => {
      client.unsubscribe(`chat/${room.chatroom_id}`);
      const status = {
        chatroom_id: room.chatroom_id,
        participants_id,
      };
      axiosClient.put("/api/chat/exit", status);
    };
  }, []);

  useEffect(() => {
    const messagesBox = document.getElementById("messages-box");
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // 스크롤 탑 위치값 저장
    setScrollTop(messagesBox.scrollTop);
  }, [messages]);

  useEffect(() => {
    const messagesBox = document.getElementById("messages-box");

    // 스크롤 탑 위치 재설정
    messagesBox.scrollTop = scrollTop;
  }, [scrollTop]);

  const publish = () => {
    if (client) {
      const newMessage = {
        mode: "private",
        chatroom_id: room.chatroom_id,
        from: participants_id, // 수정
        message: message.message,
        created_at: new Date().toISOString(),
      };
      client.publish(`chat/${room.chatroom_id}`, JSON.stringify(newMessage), {
        qos: 1,
      });
    }
    setMessage({ message: "" });
  };

  const handleMessagesScroll = (event) => {
    const { scrollTop } = event.target;
    if (scrollTop === 0) {
      axiosClient
        .get("api/chat/getchatroommessages", {
          params: {
            chatroom_id: room.chatroom_id,
            last: messages[0].chat_id
          },
        })
        .then((response) => {
          setMessages((prevMessages) => [
            ...response.data.reverse(),
            ...prevMessages,
          ]);
          setScrollTop(event.target.scrollTop + event.target.scrollHeight);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setScrollTop(scrollTop);
    }
  };

  const handleEmojiClick = (event, emojiObject) => {
    setMessage((prevMessage) => ({
      ...prevMessage,
      message: prevMessage.message + emojiObject.emoji,
    }));
  };

  const handleIconClick = () => {
    setShowEmojiList(!showEmojiList);
  };

  return (
    // <Box>
    //   <Box sx={{ position: "absolute" }}>
    //     {showEmojiList && <EmojiPicker onEmojiClick={handleEmojiClick} />}
    //   </Box>
    <Grid container spacing={1} sx={{ maxWidth: 400, maxHeight: 600 }}>
      <Grid item xs={12}>
        <AppBar
          position="static"
          style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
        >
          <Toolbar>
            <Button color="inherit" onClick={onBackClick}>
              <IconChevronLeft />
              목록 보기{" "}
              {room.chatroom_name
                ? `(${room.chatroom_name})`
                : `(${room.employee_names[0]})`}
            </Button>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        <Box
          id="messages-box"
          sx={{
            display: "block",
            height: "400px",
            overflowY: "auto",
          }}
          onScroll={handleMessagesScroll}
        >
          {messages.map((message, index) =>
            message.from !== participants_id ? ( // 수정
              <Card
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Avatar sx={{ alignSelf: "center", marginRight: 1 }}>
                  <img
                    src={
                      thumbnail.find((t) => t.employ_id === message.from)
                        ? `/api/chat/getthumbnail?thumbnail_image=${
                            thumbnail.find((t) => t.employ_id === message.from)
                              .thumbnail_image
                          }`
                        : ""
                    }
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
                          fontSize: "12px",
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
                    sx={{ marginLeft: 1, backgroundColor: "#ffea00" }}
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
        <Box
          sx={{ display: "flex", justifyContent: "space-between", margin: 1 }}
        >
          {/* <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconSquarePlus
              style={{ color: "#00aaff", width: "40px", height: "40px" }}
              onClick={handleIconClick}
            />
          </Box> */}
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
              if (e.key === "Enter" && !isDisabled) {
                e.preventDefault();
                publish();
              }
            }}
            sx={{ width: "100%", marginLeft: 1, marginRight: 1 }}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button variant="contained" onClick={publish} disabled={isDisabled}>
              <IconSend />
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
    // </Box>
  );
};

export default ChatRoom;
