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
// app.use("/api/images",require('./routes/Uploads'));

// //accessing the router defined in routes folder
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/posts", require("./routes/Posts"));
// app.use("/api/users", require("./routes/Users"));
// app.use("/api/images",require('./routes/Uploads'));




app.listen(PORT, () => {
  console.log(`Now serving port: ${PORT}`);
});
