import React, { useRef } from 'react';
import mqtt from 'mqtt';

const genRanHex = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
const mqttURL = `mqtt://192.168.0.132:8083/mqtt`;
// const mqttURL = `mqtt://localhost:8083/mqtt`;
const mqttOptions = {
    clean: true,
    connectTimeout: 30 * 1000,
    clientId: `React${genRanHex(6)}`,
    username: `React${genRanHex(6)}`,
    password: "emqx_test",
}

const MqttContext = React.createContext();
const MqttContextProvider = ({ children }) => {
    const client = useRef(null);
    if (!client.current) {
        client.current = mqtt.connect(mqttURL, mqttOptions);
    }
    return <MqttContext.Provider value={client}>
        { children }
    </MqttContext.Provider> 
}

export default MqttContextProvider;
export { MqttContext };