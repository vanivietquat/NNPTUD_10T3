const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/user_role_db")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use("/api", routes); 

app.get("/", (req, res) => {
    res.send("Server running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});