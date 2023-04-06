import {
  Avatar,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ChatRoom from "./ChatRoom";

const ChatList = () => {
  const [chatRoom, setChatRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRowClick = (room) => {
    setSelectedRoom(room);
  };

  const handleBackClick = () => {
    setSelectedRoom(null);
  };

  useEffect(() => {
    axios
      .get(`api/chat/chatlist?participants_id=1`) //수정
      .then((response) => {
        setChatRoom(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderChatList = () => {
    return (
      <Table>
        <TableBody>
          {chatRoom.map((room) => (
            <TableRow
              key={room.chatroom_id}
              onClick={() => handleRowClick(room)}
              sx={{
                "&:hover": { backgroundColor: "lightgray" },
                borderRadius: "10px",
              }}
            >
              <TableCell>
                <Avatar></Avatar>
              </TableCell>
              <TableCell>
                {room.chatroom_name || room.employee_names[0]}
              </TableCell>
              <TableCell>
                <Badge badgeContent={4} color="error" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderChatRoom = () => {
    return (
      <>
        <ChatRoom room={selectedRoom} onBackClick={handleBackClick} />
      </>
    );
  };

  return selectedRoom ? renderChatRoom() : renderChatList();
};

export default ChatList;
