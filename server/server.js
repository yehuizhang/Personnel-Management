const connectDB = require('./config/db');
const express = require('express');
const { PORT } = require('./config/');

connectDB();
const app = express();
app.use(express.json());

// app.use('/api/auth', require('./api/auth'));

app.listen(PORT, () => console.log(`The server is running on ${PORT}`));
