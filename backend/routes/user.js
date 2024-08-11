const express = require('express');
const zod = require('zod');
const { User } = require("../db");
const jwt = require('jsonwebtoken');
const JWT_SECRET = require("../config"); x
const router = express.Router();


const signUpSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = signUpSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email is already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const dbUser = await User.create(body);
    const token = jwt.sign({
        userId: dbUser._id,
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

module.exports = router;


