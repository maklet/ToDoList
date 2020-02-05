const express = require("express");
const mongoose = require("mongoose");
const taskRouter = require("./router/taskRouter");
const config = require("./config/config")
const path = require("path");
const app = express();

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


//router 
app.use(taskRouter);


//listen to port 
const port = process.env.PORT || 8002;
const options ={
    useUnifiedTopology: true, 
    useNewUrlParser: true
}
mongoose.connect(config.databaseURL,options ).then(()=> {
    console.log("Kolla localhost!")
    app.listen(port);
})