// import { NavLink , useNavigate } from 'react-router-dom'
import React, { useState } from 'react';

export default function Signup(){
    const [user, setUser] = useState({fname: '', email: '', username: '', password: ''});

    const detectChange = e => {
        setUser({...user, [e.target.name]:e.target.value});
    };

    const createUser = e => {
        e.preventDefault();

        try{
            setUser(user)
            console.log(user)
            fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                }, 
                body: JSON.stringify(user) 
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));

                // navigate('/login');
        } catch(err){
            console.error(err);
        };

    };

    return(
        <form onSubmit={createUser}>
            <h1>Sign Up</h1>
            {/* Name */}
            <label for='fname'>First Name:</label>
            <input onChange={detectChange} type="text" id="fname" name="fname" />

            {/* Email */}
            <label for='email'>Email:</label>
            <input onChange={detectChange} type="email" id="email" name="email" />

            {/* Username */}
            <label for='username'>Create Username:</label>
            <input onChange={detectChange} type="text" id="username" name="username" />

            {/* Password */}
            <label for='password'>Create Password:</label>
            <input onChange={detectChange} type="password" id="password" name="password" />

            {/* Submit */}
            <button type="submit">Create User</button>
        </form>
    );
};