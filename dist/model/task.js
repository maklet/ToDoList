"use strict";

var mongoose = require("mongoose");

var schemaTask = new mongoose.Schema({
    text: { type: String, required: true }
});

var Task = mongoose.model("Task", schemaTask);

module.exports = Task;