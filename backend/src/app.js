const express = require("express");
const app = express();
const path = require("path");
const Registration = require("./models/userRegistration");

require("./db/connection");
const Register = require("./models/userRegistration")

const port = process.env.PORT || 3000;

const stattic_path = path.join(__dirname, "../public");

app.use(express.static(stattic_path))

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', (req,res) => {
    res.send("Hello")
})

app.post("/register", async (req,res) => {
    try{
        const user = new Registration({
            username : req.body.username,
            email : req.body.email,
            password : req.body.password
        })

      const userRegistered =  await user.save();
      
      res.redirect("login.html")
      
      } catch (error){
        res.status(400).send(error);
    }
})

app.post("/login", async(req,res) => {
    try {

        const username = req.body.username;
        const password = req.body.password;

        const userName = await Register.findOne({username});
        
        if(userName.password === password){
            res.send("login sucessful")
        } else {
            res.send("invalid login details")
        }

    } catch (error){
        res.status(400).send("invalid login details")
    }
})



app.listen(3000, () => {
    console.log(`Server is Running at port no ${port}`)
})
