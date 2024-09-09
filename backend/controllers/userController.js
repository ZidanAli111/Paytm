const { User, Account } = require('../models');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const zod = require('zod');

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6, { message: 'Minimum of 6 characters in length' }),
    firstName: zod.string().min(3).max(20),
    lastName: zod.string().min(3).max(20)
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
});

const updateBody = zod.object({
    password: zod.string().min(6).optional(),
    firstName: zod.string().min(3).max(20).optional(),
    lastName: zod.string().min(3).max(20).optional(),
});

const signup = async (req, res) => {
    const { success, error } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: 'Incorrect inputs' });
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already taken' });
    }

    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    const userId = newUser._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 3600000 // 1 hour
    });

    res.status(200).json({ message: 'User created successfully' });
};

const signin = async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: 'Incorrect inputs' });
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (!existingUser || !(await existingUser.validatePassword(req.body.password))) {
        return res.status(400).json({ message: 'Error while logging in' });
    }

    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 3600000 // 1 hour
    });

    res.json({ message: 'User logged in successfully' });
};

const updateUser = async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: 'Error while updating information' });
    }

    const updatedBody = await User.updateOne({ _id: req.userId }, req.body);
    return res.json({ message: 'Updated successfully', updatedBody });
};

const getUsers = async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter, "$options": "i" } },
            { lastName: { "$regex": filter, "$options": "i" } }
        ]
    });

    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
};

const logout = (req, res) => {
    res.clearCookie('authToken');
    res.json({ message: 'Logged out successfully' });
};

module.exports = {
    signup,
    signin,
    updateUser,
    getUsers,
    logout
};
