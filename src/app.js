const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const indexRouter = require("../src/routes/index");
const corsOptions = require("./config/cors.config");
const dataInlet = require("./config/data.config");
const connectDB = require("./config/database.config");

app.use(cors(corsOptions));
app.use(dataInlet);
app.use("/", indexRouter);

app.use(express.static(path.join(__dirname, "./build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

connectDB();

module.exports = app;