// Configuration of App
const express = require('express');
const cors = require('cors');
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('env', 'develodpment')

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/game', require('../routes/game'));

module.exports = app;