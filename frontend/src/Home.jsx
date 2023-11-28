import { React, useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()
    const [chatUsers, setChatUsers] = useState([{}])
    const [selectedId, setSelectedId] = useState('')

    useEffect(() => {
        fetch('http://localhost:3000/getContacts')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setChatUsers(data)
            })
            .catch(err => console.error(err))
    }, []);

    const userDetails = (userId) => {
        setSelectedId(userId);
        console.log(userId)

        fetch(`http://localhost:3000/viewContact/${userId}`)
            .then(res => res.json())
            .then(data => {
                navigate(`/chat/${data._id}`)
            })
    };

    return (
        <>
            {/* Header */}
            <div>
                <button>Create Room</button>
                <button>Logout</button>
            </div>
            {/* Side Nav */}
            <div>
                <h1>Contacts</h1>
                {chatUsers.map(chatUser => (
                    <>
                        <div key={chatUser._id}>
                            <button type="button" onClick={() => userDetails(chatUser._id)}>
                                <p name='username' id="username">{chatUser.username}</p>
                            </button>
                        </div>
                    </>
                ))}
            </div>
        </>
    );
};