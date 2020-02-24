"use strict";

var express = require("express");
var mongoose = require("mongoose");
var taskRouter = require("./router/taskRouter");
var config = require("./config/config");
var path = require("path");
var app = express();
var sassMiddleware = require("node-sass-middleware");

//middleware
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(sassMiddleware({
    src: path.join(__dirname, "scss"),
    dest: path.join(__dirname, "public")
}));

app.use(express.static(path.join(__dirname, "public")));
//router 
app.use(taskRouter);

//listen to port 
var port = process.env.PORT || 8002;
var options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};
mongoose.connect(config.databaseURL, options).then(function () {
    console.log("Check port 8002");
    app.listen(port);
});

module.exports = app;