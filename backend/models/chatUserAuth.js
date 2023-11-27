const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required:[true, 'Your name is required'],
    },
    email: {
        type: String,
        required: [true, 'Your email is required'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Your username is required']
    },
    hashedPassword: {
        type: String,
        required: [true, 'Your password is required']
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
}, { timestamps: true });

module.exports = mongoose.model('ChatUsers', userSchema);