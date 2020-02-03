require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');

const PORT = process.env.PORT;

connectDB();

const app = express();
app.use(express.json());

app.use('/api/user', require('./api/user'));

app.listen(PORT, () => console.log(`The server is running on ${PORT}`));
