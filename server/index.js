const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 4000;
let server;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use('/api/users/', userRoutes);

mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log('Mongoose DB is connected'))
    .catch(error => console.log('Error bankai did not connect to the Mongoose DB: ', error));


server = app.listen(PORT, () => {
    console.log(`Now serving port: ${PORT}`);
});