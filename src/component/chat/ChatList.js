import React, { useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { AppBar, Box, ListItemButton, Toolbar } from '@mui/material';
import ChatRoom from './ChatRoom';
import mqtt from 'mqtt';

const Chat_API_BASE_URL = "/api/chat";


const mqttOptions = {
    clean: true,
    clientId: 1,
    username: "김더존"
}

const ChatList = () => {
    //mqtt 
    const client = useRef(null);
    useEffect(() => {
        client.current = mqtt.connect("mqtt://localhost:8083/mqtt", mqttOptions);
        client.current.subscribe(`/chat/1`); //나를 구독 -> 알림 모두 구독
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

    //아이디에 해당하는 방 조회. 
    useEffect(() => {
        axios.get(Chat_API_BASE_URL + `/1`)
            .then((response) => {
                setChatList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const openChatRoom = (chatRoom) => {
        alert("채팅방입장");
        setSelectedChatRoom(chatRoom);
    };

    const handleBackClick = () => {
        setSelectedChatRoom(null);
    }

    const renderChatList = () => {
        return (
            <div>
                <Box>
                    <AppBar position="static" style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                        <Toolbar style={{ width: 400, height: 60, alignItems: 'right' }}>
                        </Toolbar>
                    </AppBar>

                    <h3>채팅목록</h3>
                    {chatList.map((chatRoom) => (
                        <List key={chatRoom.chatroom_id} sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
                            <ListItem alignItems="flex-start" onClick={() => openChatRoom(chatRoom)}>
                                <ListItemButton style={{ padding: 2 }}>
                                    <ListItemAvatar>
                                        <Avatar alt={chatRoom.employee_name} />
                                    </ListItemAvatar>
                                    <ListItemText primary={chatRoom.employee_name} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    ))}
                </Box>
            </div >
        );
    };

    const renderChatRoom = () => {
        return (
            <>
                <ChatRoom chatRoom={selectedChatRoom} onBackClick={handleBackClick} />
            </>
        );
    };

    return selectedChatRoom ? renderChatRoom() : renderChatList();
};

export default ChatList;