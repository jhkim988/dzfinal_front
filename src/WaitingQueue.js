import { useState, useEffect } from 'react';

const WaitingQueue = ({ queId, data }) => {
    const [waiting, setWaiting] = useState([]);
    useEffect(() => {
        if (!data.payload || data.topic !== queId && queId !== 'waiting/+') return;
        setWaiting([...waiting, data.payload.toString() ])
    }, [data])
    return <>
        <h1>{queId}</h1>
        {waiting.map(data => <h5 key={parseInt(Math.random()*100000)}>{JSON.parse(data).message}</h5>)}
    </>;
}

export default WaitingQueue;