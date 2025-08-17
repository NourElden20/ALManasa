const express = require('express');
const cors = require('cors');   
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes.js');


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ربط المسارات
app.use('/auth', authRoutes);


module.exports = app;



