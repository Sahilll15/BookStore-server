const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const jwtSecret_super = process.env.JWT_SECRET_SUPER;


module.exports.register = async (req, res) => {
    const { name, email, password, role, createdAt } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" })
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedpassword, role, createdAt });


        const token = jwt.sign({ UserId: newUser._id }, jwtSecret);
        res.status(200).json({ msg: "User created successfully", user: newUser, token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server Error" })
    }
}

module.exports.login = async (req, res) => {
    console.log(jwtSecret)
    console.log(jwtSecret_super)
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        let token = ""

        if (!user) {
            return res.status(400).json({ msg: "User does not exist" })
        }
        const comparepassword = await bcrypt.compare(password, user.password);
        if (!comparepassword) {
            return res.status(400).json({ msg: "Incorrect Credentials" })
        } if (user.role === "buyer") {
            token = jwt.sign({ UserId: user._id }, jwtSecret)

        } else {
            token = jwt.sign({ UserId: user._id }, jwtSecret_super)
        }
        res.status(200).json({ msg: "User logged in successfully", user: user, userId: user._id, token: token })
    } catch (error) {
        console.log(error)
        res.status(400).json({ mssg: "Login failed" })


    }
}

module.exports.createSuperUser = async (req, res, next) => {
    const { name, email, password, role } = req.body;
    try {
        const existingSuperUser = await User.findOne({ email });
        if (existingSuperUser) {
            return res.status(400).json({ error: 'Superuser already exists' });
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        const superUser = new User({
            name,
            email,
            password: hashedpassword,
            role: "superuser"
        });
        await superUser.save();
        const token = jwt.sign({ userId: superUser._id }, jwtSecret_super);
        req.user = superUser;
        next();

        res.status(200).json({ msg: "SuperUser created  successfully", user: superUser, supersecretkey: token })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};
