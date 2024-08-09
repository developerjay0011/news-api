const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Configure CORS options
const corsOptions = {
    origin: '*', // Allow all origins (for specific origin, replace '*' with the origin URL)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use('/api', routes);

module.exports = app;
