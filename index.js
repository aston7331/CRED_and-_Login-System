const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./src/routes/index");

// Configuration for the env variable uses
require("dotenv").config();
require("./src/config/db.config");
require("./src/models/index");

// Initialise express app
const app = express();

// Initialise required dependency
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Globle Route
app.use("/api", routes)

// Starting the Server
app.listen(process.env.PORT);