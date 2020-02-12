const express = require("express");
const Task = require("../model/task");
const router = express.Router();



router.route("/todolist")
    .get(async (req, res) => {
        const currentPage = req.query.page || 1;
        const items = 3;
        const sort = req.query.sort;
        const findtodos = await Task.find()
        const threeTodos = await Task.find().skip((currentPage - 1) * items).limit(items).sort({ text: sort });
        const pageCount = Math.ceil(findtodos.length / items)

        res.render("todolist", { threeTodos, pageCount, currentPage });
    })
    .post(async (req, res) => {

        const task = new Task({
            text: req.body.text,
        })
        await task.save((error, success) => {
            if (error) {
                console.log(error);
                res.send(error.message)
            }
            else
                res.redirect("/todolist")
        })

    })


//delete task
router.get("/delete/:id", async (req, res) => {
    console.log(req.params.id);
    await Task.deleteOne({ _id: req.params.id });
    res.redirect("/todolist");
})

//Edit task
router.get("/updatetask/:id", async (req, res) => {

    const updateTask = await Task.findById({ _id: req.params.id })

    res.render("updatetask", { updateTask })
})

router.post("/updatetask/:id", async (req, res) => {

    await Task.updateOne({ _id: req.body.id }, { $set: { text: req.body.text } })
    console.log(req.body)
    console.log(req.body.id)

    res.redirect("/todolist");
})

module.exports = router;