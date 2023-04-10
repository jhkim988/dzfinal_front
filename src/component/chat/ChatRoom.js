import {AppBar, Box, Button, Grid, TextField, Toolbar} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { MqttContext } from '../waiting/MqttContextProvider';

//서로 채팅방 접속 시 서로의 채팅방을 구독.
const ChatRoom = (chatRoom, onBackClick) => {
    
    //message 가 일종의 payload 
    const [message, setMessage] = useState({
        mode: "private",
        chatroom_id: chatRoom.chatroom_id,
        from: 1,
        message: "",
        created_at: new Date()
    });
    const [messages, setMessages] = useState([]);
    //mqtt(대기열,did,chat)이라서 app.js에서 한번에 사용하려고 context로 묶어준다 .. ?
    //client.current.publish 선언 대신 바로 client.publish 선언 가능.
    const {current: client } = useContext(MqttContext); 


    //메세지 발행
    const sendMessage = () => {
        //alert("메세지");
        if(client){
            const newMsg = {
                mode: "private",
                chatroom_id: chatRoom.chatroom_id,
                from: 1,
                message: message.message,
                created_at: new Date()
            };
            //publish(topic, payload, qos);
            client.publish(`chat/${chatRoom.chatroom_id}`, 
                            JSON.stringify(newMsg), 
                            { qos: 1 }
            );
        }
        setMessage({message:""});
    }


    useEffect(() => {
        const handleMessage = (topic, message)=>{
            const receivedMsg = JSON.parse(message.toString());
            if(topic === `chat/${chatRoom.chatroom_id}`){
                setMessages((prevMessages) => [...prevMessages, receivedMsg]);
            }
        };

        client.subscribe(`chat/${chatRoom.chatroom_id}`,{qos:1},(error)=>{
            if(error){
                console.log("토픽 구독 에러");
                return;
            }
        });



        return () => {
            client.current.end();
        }
    }, [])


    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <AppBar position="static" style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                        <Toolbar style={{ height: 60 }}>
                            <div>
                                <Button color="inherit" onClick={onBackClick}>목록 보기</Button>
                            </div>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item xs={12}>
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
            </Grid>
        </div>
    );
};

export default ChatRoom;


// import {
//     AppBar, Box, Button, Grid, TextField, Toolbar
// } from '@mui/material';
// import React from 'react';
// import ChatList from './ChatList';
// import { useState } from 'react';
// import { useRef } from 'react';
// import mqtt from 'mqtt';
// import { useEffect } from 'react';

// const employee_id = 1;
// const employee_id2 = 2;

// const ChatRoom = (chatRoom, onBackClick) => {
//     const [message, setMessage] = useState({
//         mode: "private",
//         chatroom_id: chatRoom.chatroom_id,
//         from: 1,
//         message: "",
//         created_at: new Date()
//     });
//     const [messages, setMessages] = useState([]);
    
//     const client = useRef(null);

//     const connectToMqttBroker = () => {
//         const mqttBroker = 'mqtt://localhost:8083/mqtt';
//         const mqttClient = mqtt.connect(mqttBroker);

//         mqttClient.on('message', (topic, payload) => {
//             setMessages([...messages, payload.toString()]);
//         });

//         client.current = mqttClient;
//     }

//     const sendMessage = () => {
//         alert("메세지");
//         console.log(message);
//         client.current.publish("chat", JSON.stringify(message), { qos: 1 });
//         setMessages((prevMessages) => [...prevMessages, message]);
//         setMessage('');
//     }

//     useEffect(() => {
//         connectToMqttBroker();

//         return () => {
//             client.current.end();
//         }
//     }, [])


//     return (
//         <div>
//             <Grid container spacing={1}>
//                 <Grid item xs={12}>
//                     <AppBar position="static" style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
//                         <Toolbar style={{ height: 60 }}>
//                             <div>
//                                 <Button color="inherit" onClick={onBackClick}>목록 보기</Button>
//                             </div>
//                         </Toolbar>
//                     </AppBar>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <ul>
//                         {messages && messages.map((message, index) => (<li key={index}>{message}</li>))}
//                     </ul>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//                         <Grid container spacing={2}>
//                             <Grid item xs={10}>
//                                 <TextField
//                                     multiline
//                                     rows={1}
//                                     placeholder="내용을 입력해주세요."
//                                     style={{ marginTop: "400px", width: "100%" }}
//                                     value={message}
//                                     onChange={(e) => setMessage(e.target.value)}
//                                 />
//                             </Grid>
//                             <Grid item xs={2}>
//                                 <Button variant="contained"
//                                     onClick={sendMessage}
//                                     style={{ marginTop: "400px", width: "100%" }}>전송</Button>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 </Grid>
//             </Grid>
//         </div>
//     );
// };

// export default ChatRoom;
