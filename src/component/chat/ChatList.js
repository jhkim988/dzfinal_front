import {
  Avatar,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ChatRoom from "./ChatRoom";
import axiosClient from './../login/AxiosClient';

const ChatList = ({ messageCount, setMessageCount }) => {
  const [chatRoom, setChatRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRowClick = (room) => {
    setSelectedRoom(room);

    const status = {
      chatroom_id: room.chatroom_id,
      participants_id: 1, // 현재 사용자의 participants_id 값으로 대체
    };

    axios
      .put("/api/chat/lastreadtime", status)
      .then((response) => {})
      .catch((error) => {
        console.error("Failed to update last read time:", error);
      });

    const messageCountIndex = messageCount.findIndex(
      (count) => count.chatroom_id === room.chatroom_id
    );
    if (messageCountIndex !== -1) {
      const updatedMessageCount = [...messageCount];
      const chatroomMessageCount =
        updatedMessageCount[messageCountIndex].message_count;
      if (chatroomMessageCount !== 0) {
        updatedMessageCount[messageCountIndex].message_count = 0;
        setMessageCount(updatedMessageCount);
      }
    }
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
                {room.chatroom_name ? (
                  <Avatar />
                ) : (
                  <Avatar>
                    <img
                      src={`/api/chat/getthumbnail?thumbnail_image=${room.thumbnail_images[0]}`}
                      alt="사진"
                      style={{ width: "100%" }}
                    />
                  </Avatar>
                )}
              </TableCell>
              <TableCell>
                {room.chatroom_name || room.employee_names[0]}
              </TableCell>
              <TableCell>
                <Badge
                  badgeContent={
                    messageCount.find(
                      (count) => count.chatroom_id === room.chatroom_id
                    )?.message_count || 0
                  }
                  color="error"
                />
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
