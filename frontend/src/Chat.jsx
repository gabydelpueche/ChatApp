import { React, useState } from "react"
import { useParams } from "react-router-dom";

export default function Chat() {
    let [msgId, setMsgId] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/viewContact/${id}`)
            .then(res => res.json())
            .then(data => {
                setMsgId(msgId => msgId = data);
            })
            .catch(err => console.error(err))
    }, []);

    const socket = new WebSocket('ws://localhost:3000');

    const sendMsg = () => {
        const msg = {
            type: message,
            text: document.getElementById('typedMsg').value,
            id: msgId.id,
            date: Date.now()
        };

        socket.send(JSON.stringify(msg));

        document.getElementById('typedMsg').value = '';
    }



    return (
        <>
            {/* Displayed messages */}
            <div id="sentMsg"></div>
            <div id="reply"></div>

            {/* Text box */}
            <div>
                <p>{msgId.username}</p>
                <input type="text" id="typedMsg" name="msg" />
                <button onClick={sendMsg}>Send</button>
            </div>
        </>
    )
}