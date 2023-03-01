const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
let server;


mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log('Mongoose DB is connected'))
    .catch(error => console.log('Error bankai did not connect to the Mongoose DB: ', error));


server = app.listen(PORT, () => {
    console.log(`Now serving port: ${PORT}`);
});