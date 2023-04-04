import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import { createContext } from "react";
import ChatList from "../ChatList";

export const Client = createContext([]);
export default function ChatMqtt() {
  const mqttOptions = {
    clean: true,
    connectTimeout: 30 * 1000,
    username: `user_id`, // security 후 수정
  };

  const [client, setClient] = useState(
    mqtt.connect(`mqtt://localhost:8083/mqtt`, mqttOptions)
  );

  const mqttSub = () => {
    if (client) {
      client.subscribe(`user_id`, { qos: 1 }, (error) => {
        // 로그인된 유저 아이디로 수정
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
      });
    }
  };

  useEffect(() => {
    client.on("connect", () => {
      mqttSub();
    });
  }, []);

  return (
    <Client.Provider value={client}>
      {/* 채팅방목록 */}
      <ChatList />
    </Client.Provider>
  );
}
