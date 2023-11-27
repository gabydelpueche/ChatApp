const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Your username is required']
    }
})

module.exports = mongoose.model('ChatAppUsers', userSchema);