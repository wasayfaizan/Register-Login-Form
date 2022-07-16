const express = require("express");
const app = express();
const path = require("path");
require("./db/connection");

const port = process.env.PORT || 3000;

const stattic_path = path.join(__dirname, "../public");

app.use(express.static(stattic_path))

app.get('/', (req,res) => {
    res.send("Hello")
})

app.listen(3000, () => {
    console.log(`Server is Running at port no ${port}`)
})