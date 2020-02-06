const express = require("express");
const mongoose = require("mongoose");
const taskRouter = require("./router/taskRouter");
const config = require("./config/config")
const path = require("path");
const app = express();
const sassMiddleware = require("node-sass-middleware");

//middleware
app.use(express.urlencoded({extended:true}))

app.set("view engine", "ejs");
app.use(sassMiddleware({
    src: path.join(__dirname, "scss"),
    dest: path.join(__dirname, "public")
}))

app.use(express.static(path.join(__dirname, "public")));
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