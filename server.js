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

// Middleware
app.use(bodyParser.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Max requests
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

// Routes
app.use('/', urlRoutes);

// MongoDB Connection
mongoose.connect(`mongodb+srv://${username}:${password}@myatlasclusteredu.tkmvwoe.mongodb.net/qviq_db?retryWrites=true&w=majority&appName=myAtlasClusterEDU`)
// mongoose.connect('mongodb://127.0.0.1:27017/HOMdb', { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }\
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
