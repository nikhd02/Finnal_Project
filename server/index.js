// import express from 'express';
// import Connection from './database/db.js';
// import dotenv from 'dotenv';
// import Router from './route/route.js';

// // app.use(cors());
// // app.use(cors());  // Sabhi origins ko allow karne ke liye

// const app = express();

// app.use('/', Router);

// dotenv.config();

// const PORT = 8000;

// app.listen(PORT, () => console.log(`Hello Server is running on PORT ${PORT}`));
// const username = process.env.DB_username;
// const password = process.env.DB_password;


// Connection(username, password);

import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './route/route.js';
import cors from 'cors'; // Import cors middleware

dotenv.config(); // Load environment variables from .env file

const app = express();

// Use CORS middleware to allow all origins (for development only)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json()); 

// Use your routes
app.use('/', Router);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Hello Server is running on PORT ${PORT}`));

const username = process.env.DB_username;
const password = process.env.DB_password;

Connection(username, password);
