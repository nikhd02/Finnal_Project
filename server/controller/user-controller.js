

import User from '../model/user.js';

export const signupUser = async (req, res) => {
    try {
        const user = req.body; // Retrieve user data from request body
        console.log('User data received:', user); // Log received user data

        const newUser = new User(user);
        await newUser.save(); // Save the user in the database

        return res.status(200).json({ msg: 'Signup successful' });
    } catch (error) {
        console.error('Error during signup:', error); // Log detailed error
        return res.status(500).json({ msg: 'Error while signing up the user', error: error.message });
    }
};

