const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const dotenv = require("dotenv").config();
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const cors = require('cors');

const app = express();
app.use(compression());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello I'm Nadun");
});

app.use("/api", userRoutes);

connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server started on", port);
});
