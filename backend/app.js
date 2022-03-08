const express = require("express");
const app = express();
require('dotenv').config();
const path = require('path');
const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:8080"
};

// synchronise tous les modèles avec la base de données
const db = require("./app/models");
db.sequelize.sync({ force: false });

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//routes
const userRoutes = require('./app/routes/user');
const postRoutes = require('./app/routes/post');

app.use('/images', express.static(path.join(__dirname, 'images'))); // static images folder

app.use('/api', userRoutes); // User
app.use('/api', postRoutes); // Post


module.exports = app;