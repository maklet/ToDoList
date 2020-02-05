const mongoose = require("mongoose");

const schemaTask = new mongoose.Schema(
    {
        text: {type: String, required: true },
        date: { type: Date, default: Date.now}
    }
)

const Task = mongoose.model("Task", schemaTask);

module.exports = Task;