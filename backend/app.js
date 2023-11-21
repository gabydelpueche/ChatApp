require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors')
const app = express();
const port =  process.env.PORT || 3000;
const chatUser = require('./models/chatUser');

mongoose.connect(`mongodb+srv://gdelpu720:${process.env.MONGODB_PASSWORD}@cluster0.g7epr1c.mongodb.net/ChatApp`)
    .then( () => {
        console.log('Connected');
    })
    .catch( err => {
        console.error(err);
    });

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.post('/signup', async (req, res, next) => {
    try{
        const {fname, email, password, username, createdAt } = req.body;
        bcrypt.genSalt(10, function(err, salt){
            if(err){
                console.log(err)
            }
            bcrypt.hash(password, salt, function(err, hash){
                if(err){
                    console.log(err);
                } 

                console.log(hash)
            });
        });

        // const existingUser = await chatUser.findOne({ email });
        let hashedPassword = bcrypt.hash(password, salt);

        if(!email || !password || !username || !fname){
            return res.json({ message: 'All fields are required' });
        };
        
        // if(existingUser){
        //     return res.json({ message: 'User already exists' });
        // };

        const user = new chatUser({fname, email, username, hashedPassword, createdAt });
        await user.save();
        res.status(201).json({ message: 'User signed up successfully', success: true, user});
        next()
    } catch(err){
        res.status(500).json({ message: 'Failed to sign up', error: err.message });
    };
});

app.post('/login', async (req, res, next) => {
    try{
        const { email, password } = req.body;
        const user = await chatUser.findOne({ email });
        const auth = await bcrpyt.compare(password, user.hashedPassword);

        if(!email || !password){
            return res.json({ message: 'All fields are required' });
        };

        if(!user){
            return res.json({ message: 'Incorrect password or email' });
        };
        
        if(!auth){
            return res.json({ message: 'Incorrect password or email' });
        };

        res.status(200).json({ message: 'User logged successfully', success: true, user});
        next();
    } catch{
        res.status(500).json({ message: 'Failed to login', error: error.message });
    };
})

app.listen(port, () =>{
    console.log('listening')
});