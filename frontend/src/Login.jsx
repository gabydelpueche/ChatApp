import { NavLink , useNavigate } from 'react-router-dom'
import React, { useState } from 'react';

export default function Login(){
    const [log, setLog] = useState({username:""})
    const navigate = useNavigate()

    const detectChange = e =>{
        setLog({...log, [e.target.name]:e.target.value});
    }

    const findUser = (e) =>{
        e.preventDefault()

        try {
            fetch(`http://localhost:3000/login/${log.username}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    navigate('/home')
                })
                .catch(err => {
                    console.error(err);
                });
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <>
            <form onSubmit={findUser}>
                <label for="username">Username</label>
                <input onChange={detectChange} type='text' id='username' name='username'></input>
                <button type='submit'>Login</button>
            </form>
        </>
    )
}