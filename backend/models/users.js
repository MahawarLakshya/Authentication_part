const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const userschema = new mongoose.Schema({
    username: { type: String, required: true,unique:true },
    pwd: { type: String, required: true, minlength: 6 },
});

const user = mongoose.model('user', userschema);
module.exports = user;
