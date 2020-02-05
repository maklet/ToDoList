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

    //new Comment({text:"testdata", author:"authorname"}).save();
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
    res.redirect("/task");
})

//change task
router.get("/update/:id", async (req, res) => {

    //Vill hämta bara en data från databas
    const response = await Task.findById({ _id: req.params.id })
    console.log(response);
    //sen skicka den till edit sidan
    res.render("edit", { response })
})

router.post("/update/:id", async (req, res) => {
    //använd updateOne metoden för att kunnda redigera comment
    await Task.updateOne({ _id: req.body._id },
        { $set: { text: req.body.text } })

    console.log(req.body);
    res.redirect("/todolist");
})

module.exports = router;