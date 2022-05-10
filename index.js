const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hello from Sasho</h1?")
})

app.listen(5000, () => {
    console.log("server is running at port 5000");
})