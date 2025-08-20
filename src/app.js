const express = require('express');
const cors = require('cors');   
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes.js');
const courseRoutes = require('./routes/course.routes.js');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const asyncHandler = require("./middlewares/asyncHandler");

app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
const {errorHandler} = require("./middlewares/errorHandler");
app.use(errorHandler);

module.exports = app;



