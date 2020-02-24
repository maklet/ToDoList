"use strict";

var express = require("express");
var Task = require("../model/task");
var router = express.Router();

router.route("/todolist").get(async function (req, res) {
    var currentPage = req.query.page || 1;
    var items = 3;
    var sort = req.query.sort;
    var findtodos = await Task.find();
    var threeTodos = await Task.find().skip((currentPage - 1) * items).limit(items).sort({ text: sort });
    var pageCount = Math.ceil(findtodos.length / items);

    res.render("todolist", { threeTodos: threeTodos, pageCount: pageCount, currentPage: currentPage });
}).post(async function (req, res) {

    var task = new Task({
        text: req.body.text
    });
    await task.save(function (error, success) {
        if (error) {
            console.log(error);
            res.send(error.message);
        } else res.redirect("/todolist");
    });
});

//delete task
router.get("/delete/:id", async function (req, res) {
    console.log(req.params.id);
    await Task.deleteOne({ _id: req.params.id });
    res.redirect("/todolist");
});

//Edit task
router.get("/updatetask/:id", async function (req, res) {

    var updateTask = await Task.findById({ _id: req.params.id });

    res.render("updatetask", { updateTask: updateTask });
});

router.post("/updatetask/:id", async function (req, res) {

    await Task.updateOne({ _id: req.body.id }, { $set: { text: req.body.text } });
    console.log(req.body);
    console.log(req.body.id);

    res.redirect("/todolist");
});

module.exports = router;