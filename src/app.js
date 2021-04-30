const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const User = require("./models/usermsg");
// now all the methods in express is accesible to app variable
const port = process.env.PORT || 3000;
//setting the path
const staticpath = path.join(__dirname,"../public");
const templatepath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname,"../templates/partials");


//middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))
app.set("views",templatepath);
hbs.registerPartials(partialpath);

// set handle bars for view engine
app.set("view engine", "hbs");


//routing
//forward slash means home page and then we will use the call back function
app.get("/",(req,res)=>{
     res.render("index");
})
app.post("/contact",async(req,res)=>{
    try{
//res.send(req.body);
const userData = new User(req.body);
await userData.save();
res.status(201).render("index");
    }
    catch(error)
    {
        res.status(500).send(error);
    }
})
//app.get("/contact",(req,res)=>{
  //  res.render("contact");
//})
app.listen(port,()=>{
    console.log('server is running on port ${port}');
})
