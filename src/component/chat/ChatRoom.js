import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, IconButton, Paper, TextareaAutosize, TextField, Toolbar } from '@mui/material';
import React from 'react';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
const ChatRoom = () => {
    return (
        <div>
            <Paper sx={{ marginBottom: 5, marginTop: 2 }} elevation={2} style={{ width: "300px", height: "450px" }}>
                <Box>
                    <div>
                        <AppBar position="static" style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                            <Toolbar style={{ width: 300, height: 60 }}>
                                <Button color="inherit">목록 보기</Button>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <h4 style={{ textAlign: 'center' }}>()님과 채팅 중 입니다.</h4>

                    {/* <BottomNavigation
                        //showLabels
                        //value={value}
                        // onChange={(event, newValue) => {
                        //     setValue(newValue);
                        // }}
                        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}
                        style={{ width: "300px", height: "40" }}
                    >
                        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                        <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
                    </BottomNavigation> */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* <TextField id="outlined-basic" variant="outlined" size='small' style={{ marginTop: "290px", width: "230px" }} /> */}
                        <TextField
                            multiline
                            rows={1}
                            defaultValue="내용을 입력해주세요."
                            style={{ marginTop: "280px", width: "230px" }}
                        />
                        {/* <TextareaAutosize
                            maxRows={4}//teatArea 스크롤
                            aria-label="minimum height"
                            minRows={10}
                            placeholder="내용을 입력하세요"
                            style={{ marginTop: "290px", width: "230px" }}
                        /> */}
                        <Button variant="contained" style={{ marginTop: "290px" }}>전송</Button>
                    </Box>

                </Box>
            </Paper>
        </div>
    );
};

export default ChatRoom;
