const express = require("express");
const mongoose = require("mongoose");
const taskRouter = require("./router/taskRouter");
let dbUrl = process.env.MONGO_ATLAS_URL  //|| require('./config/config').databaseURL
const path = require("path");
const app = express();
const sassMiddleware = require("node-sass-middleware");

if (dbUrl == undefined) {
    try {
        dbUrl = require('./config/config').databaseURL //(process.env.NODE_ENV == 'production') {
    } catch (exception) {
        console.log("Could not load local config file", exception.message)
    }
}


//     const dbUrl = process.env.MONGO_ATLAS_URL
// } else {
//     const dbUrl = require('./config/config').databaseURL
// }

//middleware
app.use(express.urlencoded({ extended: true }))

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
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
mongoose.connect(dbUrl, options).then(() => {
    console.log("Check port 8002")
    app.listen(port);
})

module.exports = app