const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const quizRoutes = require('./routes/quizzes');
const connectDB = require("./config/db");
connectDB();
// const {uploading,upload,getImages,getImage} =require('./routes/uploads');
require("dotenv").config();



const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb', parameterLimit:50000}));
app.use(bodyParser.json({limit: '20mb'}));

app.use("/api/users/", userRoutes);
app.use("/api/quizzes/", quizRoutes);




app.listen(PORT, () => {
  console.log(`Now serving port: ${PORT}`);
});
