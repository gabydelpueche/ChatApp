require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const cors = require('cors')
const app = express();
const port =  process.env.PORT || 3000;
const chatUserAuth = require('./models/chatUserAuth');
const user = require('./models/chatUser')

const WebSocket = require('ws');

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

app.get('/getContacts', async (req, res) =>{
    try{
        await user
        .find()
        .then(result => {
            res.json(result)
        })
        .catch(err => console.error(err))
    } catch(error){
        res.status(500).json({ message: 'Failed to load users', error: error.message });
    }
});

app.get('/viewContact/:id', async (req, res) =>{
    try{
        await user
        .findOne({_id: req.params.id})
        .then(contact => {
            res.json(contact)
        })
        .catch(err => console.error(err))
    } catch(error){
        res.status(500).json({ message: 'Failed to load users', error: error.message });
    }
})

app.post('/signup', async (req, res, next) => {
    const add = new user({
        username: req.body.username
    });
    try {
        await add.save();
        res.json({ message: 'User created successfully', data: add });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create User', error: error.message });
    }

    // FOR AUTH SERVER
    // try{
    //     const {fname, email, password, username, createdAt } = req.body;
    //     const salt = bcrypt.genSalt(10, function(err, salt){
    //         if(err){
    //             console.log(err)
    //         }
    //         bcrypt.hash(password, salt, function(err, hash){
    //             if(err){
    //                 console.log(err);
    //             } 

    //             console.log(hash)
    //         });
    //     });

    //     let hashedPassword = bcrypt.hash(password, salt);

    //     if(!email || !password || !username || !fname){
    //         return res.json({ message: 'All fields are required' });
    //     };

    //     const user = new chatUser({fname, email, username, hashedPassword, createdAt });
    //     await user.save();
    //     res.status(201).json({ message: 'User signed up successfully', success: true, user});
    //     next()
    // } catch(err){
    //     res.status(500).json({ message: 'Failed to sign up', error: err.message });
    // };
});

app.get('/login/:username', async (req, res) => {
    const found = await user.findOne({
            username: req.params.username
        });

    if(!found){
        console.log("user not found")
    } else{
        res.json(found)
    }

    // FOR AUTH SERVER
    // try{
    //     const { email, password } = req.body;
    //     const user = await chatUser.findOne({ email });
    //     const auth = await bcrpyt.compare(password, user.hashedPassword);

    //     if(!email || !password){
    //         return res.json({ message: 'All fields are required' });
    //     };

    //     if(!user){
    //         return res.json({ message: 'Incorrect password or email' });
    //     };
        
    //     if(!auth){
    //         return res.json({ message: 'Incorrect password or email' });
    //     };

    //     res.status(200).json({ message: 'User logged successfully', success: true, user});
    //     next();
    // } catch{
    //     res.status(500).json({ message: 'Failed to login', error: error.message });
    // };
})



app.listen(port, () =>{
    console.log('listening')
});