const mongoose = require('mongoose');
const bycrypt = require("bvrypt");

try {
    async () => await mongoose.connect("mongodb+srv://zidan:Shalinium@cluster0.ss5ig58.mongodb.net/paytm");
} catch (err) {
    console.log(err);
}




// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});


UserSchema.methods.createHash = async (plainTextPassword) => {
    // Hashing user's salt and password with 12 iterations,
    const saltRounds = 12;
    // First method to generate a salt and then create hash
    const salt = await bycrypt.genSalt(saltRounds);
    //generates the hashPassword
    return await bycrypt.hash(plainTextPassword, salt);
};

//For validation, get the password from DB (this.password --> hashPassword) and compare it to the input Password provided by the client
//note: we dont implement this method
UserSchema.methods.validatePassword = async (candidatePassword) => {
    return await bycrypt.compare(candidatePassword, this.password);
};


const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    Account
};