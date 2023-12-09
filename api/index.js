var express = require('express');
const path = require("path");
var indexRouter = require('../src/routes/index');
const dataInlet = require("../src/config/data.config");
const connectDB = require('../src/config/database.config');


var app = express();


app.use(dataInlet);
app.use("/", indexRouter);

connectDB();

const whitelist = [
  '*'
];

app.use((req, res, next) => {
  const origin = req.get('referer');
  const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
  if (isWhitelisted) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
  }
  // Pass to next layer of middleware
  if (req.method === 'OPTIONS') res.sendStatus(200);
  else next();
});

const setContext = (req, res, next) => {
  if (!req.context) req.context = {};
  next();
};
app.use(setContext);

app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, "../src/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/build/index.html"));
});

// app.listen(process.env.PORT,(req,res)=>{
//   console.log(`Server is running at port ${process.env.PORT}`);
// })


module.exports = app;