const express = require("express");
const Task = require("../model/task");
const router = express.Router();



router.post("/newtask", async (req, res) => {

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


router.get("/todolist", async (req, res) => {
    const findtodos = await Task.find();
    console.log(findtodos)

    res.render("todolist", { findtodos });
}
)

//delete task
router.get("/delete/:id", async (req, res) => {
    console.log(req.params.id);
    await Tasks.deleteOne({ _id: req.params.id });
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