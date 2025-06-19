const express = require('express');
const db = require('./db/config')
const route = require('./controllers/route');
const bodyParser = require('body-parser');
const cors = require('cors');


const port = 5001
require('dotenv').config()

const fs = require('fs');
const path = require('path');

//Setup Express App
const app = express();
// Middleware
app.use(bodyParser.json());
// Set up CORS  
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST'], // Allow only GET method
    allowedHeaders: ['Authorization'], // Allow Authorization header
    optionsSuccessStatus: 200 // Ensure preflight response status is 200
}))
//API Routes
app.use('/api', route);


app.get('/', async (req, res) => {
    res.send('Welcome to my world...')
});

// Get port from environment and store in Express.

const server = app.listen(port, () => {
    const protocol = (process.env.HTTPS === true || process.env.NODE_ENV === 'production') ? 'https' : 'http';
    const { address, port } = server.address();
    const host = address === '::' ? '127.0.0.1' : address;
    console.log(`Server listening at ${protocol}://${host}:${port}/`);
});


// Connect to MongoDB
const DATABASE_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017'
const DATABASE = process.env.DB || 'Prolink'

db(DATABASE_URL, DATABASE);
