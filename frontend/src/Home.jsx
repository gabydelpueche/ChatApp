import { React, useState, useEffect } from "react"

export default function Home() {
    const [chatUsers, setChatUsers] = useState([{}])
    const [user, setUser] = useState({username: ''})

    useEffect(() => {
        fetch('http://localhost:3000/getContacts')
            .then(res => res.json())
            .then(data => {
                setChatUsers(data)
            })
            .catch(err => console.error(err))
    }, []);

    // const viewId = (e) => {
    //     e.preventDefault();
    //     setUser({id: e.target.id.value});
    //     console.log(user);
    // };

    // useEffect(() => {
    //     console.log("View changed");
    //     fetch(`http://localhost:3000/viewContact/${user.id}`)
    //         .then(res => res.json())
    //         .then(data => console.log(data)
    //         );
    // }, [user])

    return (
        <>
            {/* Header */}
            <div>
                <p>{user.username}</p>
                <p>Create Room</p>
                <p>Logout</p>
            </div>
            {/* Side Nav */}
            <div>
                <h1>Contacts</h1>
                {chatUsers.map(chatUser => {
                    <>
                        <form name="id">
                            <input type="hidden" name="id" value={chatUser._id}/>
                            <button type="submit">
                                <p name='username' id="username">{chatUser.username}</p>
                            </button> 
                        </form>
                    </>
                })}
            </div>
        </>
    );
};