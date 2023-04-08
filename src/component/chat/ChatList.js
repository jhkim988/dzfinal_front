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

    const status = {
      chatroom_id: room.chatroom_id,
      participants_id: 1, // 현재 사용자의 participants_id 값으로 대체
    };

    axios.put("/api/chat/lastreadtime", status)
      .then(response => {
        console.log("Last read time updated successfully!");
      })
      .catch(error => {
        console.error("Failed to update last read time:", error);
      });
  };

  const handleBackClick = () => {
    setSelectedRoom(null);
  };

  useEffect(() => {
    axios
      .get(`api/chat/chatlist?participants_id=1`) //수정
      .then((response) => {
        setChatRoom(response.data);
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
                <Badge badgeContent={0} color="error" />
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
