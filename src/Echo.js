import { useState } from 'react';

const Echo = () => {
    const [inputText, setInputText] = useState('');
    const [responseText, setResponseText] = useState('');
    const echoPost = async () => {
        const response = await fetch("/api/echo", {
            method: 'POST'
            , headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
            , body: JSON.stringify({
                message: inputText
            })
        });
        if (response.ok) {
            const json = await response.json();
            setResponseText(json.message);
        }
    }
    return (
        <>
            <input onChange={e => setInputText(e.target.value)}/>
            <button onClick={echoPost}>Echo</button>
            <h1>result: {responseText}</h1>
        </>
    )
}

export default Echo;