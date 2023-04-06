import React, { useEffect, useContext } from "react";
import mqtt from "mqtt";
import { createContext } from "react";
import ChatList from "./ChatList";
import { MqttContext } from "../waiting/MqttContextProvider";

export default function ChatMqtt() {
  const client = useContext(MqttContext);

  useEffect(() => {
    client.current.subscribe(`user_id`, { qos: 1 }, (error) => {
      // 로그인된 유저 아이디로 수정
      if (error) {
        console.log("Subscribe to topics error", error);
        return;
      }
    });
  }, []);

  return <ChatList />;
}
