const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/user.route');
app.use('/api/users', userRoutes);

module.exports = app;
