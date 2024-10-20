const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send('User already exists with this email');
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }

        const auth_user = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
        };

        res.status(200).send({ auth_user });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};
