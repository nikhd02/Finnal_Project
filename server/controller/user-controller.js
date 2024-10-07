
import bcrypt from 'bcrypt';
import User from '../model/user.js';
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
};

