const mongoose = require('mongoose');
const { string } = require('zod');

mongoose.connect("mongodb+srv://zidan:Shalinium@cluster0.ss5ig58.mongodb.net/paytm");

const userSchema = mongoose.Schema({
    username: {
        type: string,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: string,
        required: true,
        minLength: 6
    },
    firstName: {
        type: string,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: string,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}

