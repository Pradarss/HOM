require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const urlRoutes = require('./urlroutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const username = encodeURIComponent(process.env.USER);
const password = encodeURIComponent(process.env.PASSWORD);

app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

app.use('/', urlRoutes);

mongoose.connect(`mongodb+srv://${username}:${password}@myatlasclusteredu.tkmvwoe.mongodb.net/qviq_db?retryWrites=true&w=majority&appName=myAtlasClusterEDU`)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
