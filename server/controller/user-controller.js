
import bcrypt from 'bcrypt';
import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import token from '../model/token.js';
import dotenv from 'dotenv';
import { request } from 'express';
// import { name } from 'body-parser';

export const signupUser = async (req, res) => {
    try {
        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        
        
        
        // const User = req.body; // Retrieve user data from request body
        const user = { username: req.body.username, name: req.body.name,password: hashedPassword };
        // console.log('User data received:', user); // Log received user data

        const newUser = new User(user);
        await newUser.save(); // Save the user in the database

        return res.status(200).json({ msg: 'Signup successful' });
    } catch (error) {
        console.error('Error during signup:', error); // Log detailed error
        return res.status(500).json({ msg: 'Error while signing up the user', error: error.message });
    }
}

export const loginUser = async (req, res) => {
    let user = await User.findOne({ username: req.body.username});
    if (!user){
        return res.status(401).json({ msg: 'Invalid username' });
    }
    try {
        let match = await bcrypt.compare(req.body.password);
        if (match) {

            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken =jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({ token: refreshToken })
            await newToken.save();

            return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name:user.name, username: user.username })

        }
        else {
            res.status(400).json({msg: 'Password does not match'});
        }
    }
    catch{
        return res.status(500).json({ msg: 'Error while login in user:'})

    }
}

