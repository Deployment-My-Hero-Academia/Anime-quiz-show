const mongoose = require('mongoose')
require("dotenv").config();
//mongodb connection
const connectDB = async() =>{
    mongoose
    .connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("Mongoose DB is connected"))
    .catch((error) =>
      console.log("Error bankai did not connect to the Mongoose DB: ", error)
    );
}
//bring it to index.js and run it!!!
module.exports = connectDB