const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require("cors");
const morgan = require('morgan')
const mongoose = require('mongoose');
const fileUpload  = require('express-fileupload');



const project = require('./api/routes/projectRoutes')
const skills = require('./api/routes/skills.Routers')

const frontend = require('./api/routes/frontendRoutes')

mongoose
  .connect(
    "mongodb+srv://buzz:QERzYDgM85byxjX8@cluster0.pjq7ibn.mongodb.net/porfolio"
  )
  .then(() => {
    console.log("Connect Mongo atlas successfuly");
  })
  .catch(() => {
    console.log("Not Connect Mongo atlas");
  });


app.use(helmet())

// ✅ Allow requests from Angular frontend (http://localhost:4200)
app.use(cors({
  origin: "*",   // Allow Angular dev server
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// middleware for file uploads
app.use(fileUpload({
  useTempFiles: true,   // stores files temporarily so cloudinary can read
  tempFileDir: "/tmp/"  // temp folder
}));

app.use(morgan("dev"))
// app.use("/uploads", express.static('public'))

app.use('/projects' , project )
app.use('/skills' , skills )

app.use('/frontend' , frontend )


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});



app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app
