import React, { useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { AppBar, Box, Button, getRadioUtilityClass, IconButton, ListItemButton, Paper, TextField, Toolbar } from '@mui/material';
import ChatRoom from './ChatRoom';
import mqtt from 'mqtt';
import { ConstructionOutlined } from '@mui/icons-material';

const Chat_API_BASE_URL = "/api/chat";

const employee_id = "1"; //김더존
const employee_id2 = "2"; //이을지

const mqttOptions = {
    clean: true,
    clientId: employee_id,
    username: "김더존"
}

const ChatList = () => {
    const client = useRef(null);
    useEffect(() => {
        client.current = mqtt.connect("mqtt://localhost:8083/mqtt", mqttOptions);
        client.current.subscribe(`/chat/${employee_id}`);
        client.current.on("message", mqttListener);
    }, []);

    const mqttListener = (topic, payload, packet) => {
        payload = JSON.parse(payload);
        console.log(payload);
        // if (payload.method === "PUT") {

        // }
    }

    const [chatList, setChatList] = useState([]);
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);

    useEffect(() => {
        axios.post(Chat_API_BASE_URL)
            .then((response) => {
                setChatList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const openChatRoom = (chatRoom) => {
        // client.current.on("connect", () => {
        //     console.log(`${chatList.chatroom_id}` + "채팅방입장");
        //     client.current.subscribe(`chat/${chatList.chatroom_id}`);
        // });
        alert("채팅방입장");
        setSelectedChatRoom(chatRoom);
    };

    if (selectedChatRoom) {
        return <ChatRoom chatRoom={selectedChatRoom} />;
    }

    return (
        <div>
            {/* 로그인 시 자기자신 제외한 채팅방목록 조회 */}
            {/* <Paper sx={{ marginBottom: 5 }} elevation={2} style={{ width: "400px", height: "550px" }}> */}
            <Box>
                <AppBar position="static" style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    <Toolbar style={{ width: 400, height: 60, alignItems: 'right' }}>
                    </Toolbar>
                </AppBar>

                <h3>채팅목록</h3>
                {chatList.map((list) => (
                    <List key={list.chatroom_id} sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
                        <ListItem alignItems="flex-start" onClick={() => openChatRoom(list)}>
                            <ListItemButton style={{ padding: 2 }}>
                                <ListItemAvatar>
                                    <Avatar alt={list.chatroom_name} />
                                </ListItemAvatar>
                                <ListItemText primary={list.chatroom_name} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                ))}
            </Box>
            {/* </Paper > */}
        </div >
    );
};

export default ChatList;