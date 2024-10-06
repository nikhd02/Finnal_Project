// import mongoose from "mongoose";

// const userSchema = mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     username:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// })


// mongoose.model('user', userSchema);

// export default userSchema;


import mongoose from "mongoose";

// Define the user schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true // Ensure usernames are unique
    },
    password: {
        type: String,
        required: true
    }
});

// Create the User model
const User = mongoose.model('User', userSchema); // Model name should be capitalized

// Export the User model
export default User;
