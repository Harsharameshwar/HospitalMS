const express = require("express");
const data = express();
const path = require("path");




data.use(express.json({limit: '200mb'}));
data.use(express.urlencoded({limit: '200mb', extended: true, parameterLimit: 50000}));

data.use(express.json());

module.exports = data;
