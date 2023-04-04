import {
    AppBar, BottomNavigation, BottomNavigationAction,
    Box, Button, Grid, IconButton, Paper, TextField, Toolbar
} from '@mui/material';
import React from 'react';
import ChatList from './ChatList';
import { useState } from 'react';
import { useRef } from 'react';
import mqtt from 'mqtt';
import { useEffect } from 'react';

const employee_id = 1;
const employee_id2 = 2;

const ChatRoom = (selectedChatRoom) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);
    const client = useRef(null);

    const connectToMqttBroker = () => {
        const mqttBroker = 'mqtt://localhost:8083/mqtt';
        const mqttClient = mqtt.connect(mqttBroker);

        mqttClient.on('message', (topic, payload) => {
            setMessages([...messages, payload.toString()]);
        });

        client.current = mqttClient;
    }
    const sendMessage = () => {
        alert("메세지");
        console.log(message);
        client.current.publish(`chat/${employee_id}`, JSON.stringify(message));
        setMessages((prevMessages) => [...prevMessages, message]);
    }

    useEffect(() => {
        connectToMqttBroker();

        return () => {
            client.current.end();
        }
    }, [])


    const showChatList = () => {
        return <ChatList />;
    };

    return (
        <div>
            <Grid container spacing={1}>
                {/* <Paper sx={{ marginBottom: 5, marginTop: 2 }} elevation={2} style={{ width: "400px", height: "550px" }}> */}
                <Grid item xs={12}>
                    <AppBar position="static" style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                        <Toolbar style={{ height: 60 }}>
                            <div>
                                <Button color="inherit" onClick={showChatList}>목록 보기</Button>
                            </div>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item xs={12}>
                    <Box>
                        <h4 style={{ textAlign: 'center' }}>()님과 채팅 중 입니다.</h4>
                    </Box>
                    <ul>
                        {messages && messages.map((message, index) => (<li key={index}>{message}</li>))}
                    </ul>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <TextField
                                    multiline
                                    rows={1}
                                    placeholder="내용을 입력해주세요."
                                    style={{ marginTop: "400px", width: "100%" }}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="contained"
                                    onClick={sendMessage}
                                    style={{ marginTop: "400px", width: "100%" }}>전송</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                {/* </Paper> */}
            </Grid>
        </div>
    );
};

export default ChatRoom;
