import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import { AppBar, Box, ListItemButton, Paper, Toolbar } from '@mui/material';
import axiosClient from './../login/AxiosClient';

const Chat_API_BASE_URL = "/api/chat";

const ChatList = () => {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        axiosClient.post(Chat_API_BASE_URL)
            .then((response) => {
                setChatList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            {/* 로그인 시 자기자신 제외한 채팅방목록 조회 */}
            <Paper sx={{ marginBottom: 5 }} elevation={2} style={{ width: "300px", height: "550px" }}>
                <Box>
                    <AppBar position="static" style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                        <Toolbar style={{ width: 300, height: 60, alignItems: 'right' }}>
                            {/* <AccountCircleRoundedIcon style={{ height: 50 }}></AccountCircleRoundedIcon>
                            <TextField id="outlined-basic"
                                abel="프로필"
                                name="profile"
                                variant="outlined"
                                style={{}}
                            /> */}
                        </Toolbar>
                    </AppBar>

                    <h3>채팅목록</h3>
                    {
                        chatList.map((list) => (
                            <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
                                <ListItem alignItems="flex-start" key={list.chatroom_id}>
                                    <ListItemButton style={{ padding: 2 }}>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={list.chatroom_name}
                                            //src={`/static/images/avatar/${value + 1}.jpg`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText primary={list.chatroom_name} />
                                    </ListItemButton>
                                </ListItem>
                                {/* <Divider variant="inset" component="li" /> */}
                            </List>
                        ))
                    }
                </Box>
            </Paper >
        </div >
    );
};

export default ChatList;